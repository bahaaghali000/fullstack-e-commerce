import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAddProduct = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const addProduct = async (formData) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");
    try {
      await axios.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries("total-products");
      queryClient.invalidateQueries("categories");

      navigate("/dashboard/all-products");
      toast.success("Product is Added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, addProduct };
};

export default useAddProduct;
