import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

const useAuthRedirect = (redirectTo: string) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate a loading state when determining authentication
    if (isAuthenticated !== undefined) {
      setLoading(false); // Set loading to false once the authentication state is determined
      if (isAuthenticated) {
        navigate(redirectTo); // Redirect if authenticated
      }
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return loading; // Return the loading state
};

export default useAuthRedirect;
