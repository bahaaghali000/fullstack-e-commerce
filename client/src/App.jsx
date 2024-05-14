import axios from "axios";
import Layout from "./Components/Layout/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "./redux/slices/authSlice";
import { fetchCart } from "./redux/slices/cartSlice";
import { fetchFav } from "./redux/slices/favSlice";
import "react-loading-skeleton/dist/skeleton.css";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // for Google Auth
    const getUser = async () => {
      try {
        const { data } = await axios.get("/auth/login/success", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });

        dispatch(setLogin({ token: data.data._id, user: data.data }));
      } catch (error) {
        console.log(error);
      }
    };
    const getProfile = async () => {
      try {
        const { data } = await axios.get("api/user/profile");

        dispatch(setLogin({ token: data.data._id, user: data.data }));
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      dispatch(fetchCart());
      dispatch(fetchFav());
    }
    getUser();
    getProfile();
  }, [token]);

  return <Layout />;
};

export default App;
