import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const SERVER_URL = "https://192.168.212.126:4000"; // Update with your backend URL

export default function AudioCall() {
  interface SignalData {
    type: "offer" | "answer";
    sdp: string;
  }
  const [, setStream] = useState<MediaStream | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [caller, setCaller] = useState<string | null>(null);
  const [signalData, setSignalData] = useState<SignalData | null>(null);
  const [calling, setCalling] = useState(false);
  const [users, setUsers] = useState<string[]>([]);

  const userVideo = useRef<HTMLVideoElement>(null);
  const partnerVideo = useRef<HTMLVideoElement>(null);

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const iceCandidateQueue = useRef<RTCIceCandidate[]>([]);

  useEffect(() => {
    console.log("Starting server connection...");
    socketRef.current = io(SERVER_URL, {
      transports: ["websocket"],
      secure: true,
      rejectUnauthorized: false,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to server with ID:", socketRef.current?.id);
      socketRef.current?.emit("register", socketRef.current?.id);
    });

    socketRef.current.on("userList", (userList: string[]) => {
      console.log("Connected users:", userList);
      setUsers(userList);
    });

    socketRef.current.on(
      "callIncoming",
      (data: { from: string; signal: SignalData }) => {
        console.log("Incoming call from:", data.from);
        setCaller(data.from);
        setSignalData(data.signal);
      }
    );

    socketRef.current.on(
      "callAccepted",
      async (data: { signal: SignalData }) => {
        console.log("Call accepted by the receiver");
        setCallAccepted(true);
        await peerConnection.current?.setRemoteDescription(
          new RTCSessionDescription(data.signal)
        );

        // Process queued ICE candidates if any
        iceCandidateQueue.current.forEach((candidate) =>
          peerConnection.current?.addIceCandidate(candidate)
        );
        iceCandidateQueue.current = [];
      }
    );

    socketRef.current.on(
      "newICECandidate",
      (candidate: RTCIceCandidateInit) => {
        console.log("Received new ICE candidate:", candidate);
        if (
          peerConnection.current &&
          peerConnection.current.remoteDescription
        ) {
          peerConnection.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
        } else {
          iceCandidateQueue.current.push(new RTCIceCandidate(candidate));
        }
      }
    );

    return () => {
      console.log("Disconnecting from server...");
      socketRef.current?.disconnect();
    };
  }, []);

  const startCall = (targetId: string) => {
    console.log("Initiating call to:", targetId);
    setCalling(true);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((userStream) => {
        console.log("Local media stream obtained");
        setStream(userStream);
        if (userVideo.current) userVideo.current.srcObject = userStream;

        peerConnection.current = new RTCPeerConnection();
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("Sending ICE candidate to:", targetId);
            socketRef.current?.emit("sendCandidate", targetId, event.candidate);
          }
        };

        peerConnection.current.ontrack = (event) => {
          console.log("Received remote stream");
          if (partnerVideo.current)
            partnerVideo.current.srcObject = event.streams[0];
        };

        userStream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, userStream);
        });

        peerConnection.current.createOffer().then((offer) => {
          peerConnection.current?.setLocalDescription(offer);
          console.log("Sending call offer to:", targetId);
          socketRef.current?.emit("callUser", targetId, offer);
        });
      });
  };

  const answerCall = () => {
    if (!signalData) return;
    console.log("Answering call from:", caller);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(async (userStream) => {
        console.log("Local media stream obtained for answering");
        setStream(userStream);
        if (userVideo.current) userVideo.current.srcObject = userStream;

        peerConnection.current = new RTCPeerConnection();
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("Sending ICE candidate to caller:", caller);
            socketRef.current?.emit("sendCandidate", caller!, event.candidate);
          }
        };

        peerConnection.current.ontrack = (event) => {
          console.log("Received remote stream from caller");
          if (partnerVideo.current)
            partnerVideo.current.srcObject = event.streams[0];
        };

        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(signalData)
        );

        // Add any queued ICE candidates after setting the remote description
        iceCandidateQueue.current.forEach((candidate) =>
          peerConnection.current?.addIceCandidate(candidate)
        );
        iceCandidateQueue.current = [];

        userStream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, userStream);
        });

        peerConnection.current.createAnswer().then((answer) => {
          peerConnection.current?.setLocalDescription(answer);
          console.log("Sending call answer to caller:", caller);
          socketRef.current?.emit("answerCall", caller!, answer);
        });
      });
  };

  return (
    <div>
      <h2>WebRTC Video Call</h2>
      <div>
        <video
          ref={userVideo}
          autoPlay
          muted
          style={{ width: "300px", height: "200px" }}
        />
        <video
          ref={partnerVideo}
          autoPlay
          style={{ width: "300px", height: "200px" }}
        />
      </div>
      <div>
        {!callAccepted && !calling && (
          <div>
            <h3>Available Users</h3>
            {users.map((user) => (
              <button key={user} onClick={() => startCall(user)}>
                Call {user}
              </button>
            ))}
          </div>
        )}
        {calling && <p>Calling...</p>}
        {caller && !callAccepted && !calling && (
          <div>
            <h3>Incoming call from {caller}</h3>
            <button onClick={answerCall}>Answer</button>
          </div>
        )}
      </div>
    </div>
  );
}
