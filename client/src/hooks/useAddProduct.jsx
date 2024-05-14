import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAddProduct = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (product) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");
    try {
      await axios.post("/api/products/create-product", product);
      navigate("/dashboard/all-products");
      toast.success("Product is Added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, addProduct };
};

export default useAddProduct;
