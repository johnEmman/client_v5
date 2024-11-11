// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import UserList from "./UserList";

import MainLayout from "./MainLayout";

const MainPage = () => {
  // const { isAuthenticated, username, isGuest } = useSelector(
  //   (state: RootState) => state.auth
  // );
  return (
    <div>
      <MainLayout />
    </div>
    // <div className="bg-">
    //   {isAuthenticated ? (
    //     <div>
    //       mainpage
    //       <h2>Welcome, {isGuest ? "Guest" : username}</h2>
    //       <UserList />
    //     </div>
    //   ) : (
    //     <div>helo</div>
    //   )}
    // </div>
  );
};

export default MainPage;
