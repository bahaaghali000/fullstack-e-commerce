import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLogin } from "../redux/slices/authSlice";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const signup = async (username, email, password) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/user/register`, {
        username,
        email,
        password,
      });
      if (data.status === "fail") {
        return toast.warning(data.msg);
      }
      dispatch(setLogin({ token: data.data._id, user: data.data }));
      toast.success("Logged in successfully");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return { loading, signup };
};

export default useSignup;
