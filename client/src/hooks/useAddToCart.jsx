import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useAddToCart = () => {
  const [loading, setLoading] = useState(false);

  const addToCart = async (productId) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");

    try {
      await axios.get(`/cart/add/${productId}`);
      toast.success("Product is added to cart successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, addToCart };
};

export default useAddToCart;
