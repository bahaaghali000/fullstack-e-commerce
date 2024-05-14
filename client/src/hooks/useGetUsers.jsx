import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (search) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/user/all-users/?search=${search}`);
      return data.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, fetchUsers };
};

export default useGetUsers;
