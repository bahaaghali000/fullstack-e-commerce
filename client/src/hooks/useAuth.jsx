import { useEffect, useState } from "react";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("multiUser"));
    setCurrentUser(user);
    setLoading(false);
  }, []);

  return { currentUser, loading };
};
export default useAuth;
