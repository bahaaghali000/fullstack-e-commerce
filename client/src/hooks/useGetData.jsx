import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useGetData = (url) => {
  const { currentUser, loading: isLoading } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: currentUser ? "Bearer " + currentUser.token : null,
        },
      });
      setData(data.data);
      setLoading(false);
    };

    fetchAllProducts();
  }, [currentUser, isLoading]);

  return { data, loading };
};

export default useGetData;
