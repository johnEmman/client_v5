import React from "react";
import Login from "./Login";
import useAuthRedirect from "../hooks/useAuthRedirect"; // Import your custom hook

export default function Auth() {
  const loading = useAuthRedirect("/mainpage"); // Get loading state from the hook

  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Display loading message or spinner while authentication is being processed
      ) : (
        <Login /> // Display Login component once authentication state is determined
      )}
    </div>
  );
}
