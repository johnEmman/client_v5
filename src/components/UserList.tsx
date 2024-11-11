import axios from "axios";
import { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://192.168.212.126:4000/auth/users");
      setUsers(response.data.users);
    } catch (error) {
      setError("Error fetching users");
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
