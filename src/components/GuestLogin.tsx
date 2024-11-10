import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { guestLogin as guestLoginApi } from "../api/auth";

const GuestLogin = () => {
  const dispatch = useDispatch();

  const handleGuestLogin = async () => {
    try {
      const data = await guestLoginApi();
      dispatch(login({ username: "guest", isGuest: true }));
    } catch (error) {
      console.error("Guest login failed", error);
    }
  };

  return <button onClick={handleGuestLogin}>Login as Guest</button>;
};

export default GuestLogin;
