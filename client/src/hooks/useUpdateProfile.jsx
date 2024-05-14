import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const updateProfile = async (profile) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");

    try {
      const { data } = await axios.put(`/api/user/${user._id}`, profile);
      dispatch(setLogin({ token: data.data, user: data.data }));
      toast.success("Profile is updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };
  return { loading, updateProfile };
};

export default useUpdateProfile;
