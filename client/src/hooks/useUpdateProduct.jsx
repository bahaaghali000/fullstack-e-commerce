import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editProduct = async (productId, product) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");

    try {
      const { data } = await axios.patch(`/products/${productId}`, product);

      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries("categories");
      queryClient.invalidateQueries(["product-details", productId]);

      navigate("/dashboard/all-products");
      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, editProduct };
};

export default useUpdateProduct;
