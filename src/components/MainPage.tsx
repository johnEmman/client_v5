import { useSelector } from "react-redux";
import { RootState } from "../redux/index";
import UserList from "./UserList";

const MainPage = () => {
  const { isAuthenticated, username, isGuest } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <div>
      {isAuthenticated ? (
        <div>
          mainpage
          <h2>Welcome, {isGuest ? "Guest" : username}</h2>
          <UserList />
        </div>
      ) : (
        <div>helo</div>
      )}
    </div>
  );
};

export default MainPage;
