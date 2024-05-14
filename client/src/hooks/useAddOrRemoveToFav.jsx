import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useAddOrRemoveToFav = () => {
  const [loading, setLoading] = useState(false);

  const addOrRemoveToFav = async (productId) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");

    try {
      const { data } = await axios.get(`/api/favorite/${productId}`);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, addOrRemoveToFav };
};

export default useAddOrRemoveToFav;
