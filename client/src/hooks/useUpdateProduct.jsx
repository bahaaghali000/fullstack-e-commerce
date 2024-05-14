import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const editProduct = async (productId, product) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");
    try {
      await axios.patch(`/api/products/${productId}`, product);
      navigate("/dashboard/all-products");
      toast.success("Product is Updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, editProduct };
};

export default useUpdateProduct;
