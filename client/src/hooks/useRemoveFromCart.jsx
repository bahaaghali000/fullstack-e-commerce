import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useRemoveFromCart = () => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async (productId) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");
    try {
      await axios.delete(`/api/cart/remove/${productId}`);
      toast.success("Product is removed from cart successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, handleRemove };
};

export default useRemoveFromCart;
