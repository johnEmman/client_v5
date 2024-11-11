import React from "react";
import Login from "./Login";
import useAuthRedirect from "../hooks/useAuthRedirect"; // Import your custom hook
import { Outlet } from "react-router-dom";

export default function Auth() {
  // const loading = useAuthRedirect("/mainpage"); // Get loading state from the hook

  return (
    <div>
      <Outlet />
    </div>
  );
}
