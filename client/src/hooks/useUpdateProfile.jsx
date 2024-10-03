import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const updateProfile = async (formData) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");

    try {
      const { data } = await axios.patch(`/user/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setLogin({ user: data.data }));
      toast.success("Profile is updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };
  return { loading, updateProfile };
};

export default useUpdateProfile;
