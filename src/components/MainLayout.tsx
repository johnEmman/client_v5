import React from "react";

const activeRooms = [
  { id: 1, name: "General Chat" },
  { id: 2, name: "Tech Talk" },
  { id: 3, name: "Music Lovers" },
  { id: 4, name: "Book Club" },
];

const users = [
  { id: 1, name: "Alice", status: "online" },
  { id: 2, name: "Bob", status: "away" },
  { id: 3, name: "Charlie", status: "offline" },
  { id: 4, name: "Diana", status: "online" },
];

export default function MainLayout() {
  const [activeRoom, setActiveRoom] = React.useState(activeRooms[0]);

  const handleCreateRoom = () => {
    console.log("Create new room");
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-100">
      {/* Active Room Header */}
      <header className="bg-neutral-800 text-neutral-100 p-4 shadow-md">
        <h1 className="text-xl font-bold">
          Your Active Room: {activeRoom.name}
        </h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area with Create Room button */}
        <main className="flex-1 p-4 overflow-y-auto flex flex-col items-center justify-center">
          <button
            onClick={handleCreateRoom}
            className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Create Room
          </button>
          <p className="text-neutral-600 mt-4 text-center">
            Select a room to start chatting or create a new one
          </p>
        </main>

        {/* Right Sidebar: Active Rooms and Users Lists */}
        <aside className="w-80 bg-neutral-200 flex flex-col overflow-hidden shadow-inner">
          {/* Active Rooms List */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-neutral-800">
              Active Rooms
            </h2>
            <ul className="space-y-2">
              {activeRooms.map((room) => (
                <li
                  key={room.id}
                  className={`cursor-pointer p-3 rounded-lg transition duration-200 ease-in-out ${
                    activeRoom.id === room.id
                      ? "bg-neutral-700 text-neutral-100"
                      : "text-neutral-800 hover:bg-neutral-300"
                  }`}
                  onClick={() => setActiveRoom(room)}
                >
                  {room.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Separator */}
          <div className="border-t border-neutral-300"></div>

          {/* Users List */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-neutral-800">
              Online
            </h2>
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center p-2 rounded-lg hover:bg-neutral-300"
                >
                  <span
                    className={`w-3 h-3 rounded-full mr-3 ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user.status === "away"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  <span className="text-neutral-800">{user.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
