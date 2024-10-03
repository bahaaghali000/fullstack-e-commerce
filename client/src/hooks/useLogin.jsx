import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLogin } from "../redux/slices/authSlice";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const login = async (formData) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const { data } = await axios.post(`/user/login`, formData);

      if (data.status === "fail") {
        return toast.warning(data.msg);
      }
      dispatch(setLogin({ user: data.data.user }));
      toast.success("Logged in successfully");
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return { loading, login };
};

export default useLogin;
