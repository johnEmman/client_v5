import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* {isAuthenticated ? (
        <div>
          <h2>Welcome, {isGuest ? "Guest" : username}</h2>
        </div>
      ) : (
      )} */}
      <div>
        <Outlet />{" "}
      </div>
    </div>
  );
};

export default Home;
