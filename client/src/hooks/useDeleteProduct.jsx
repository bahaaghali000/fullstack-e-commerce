import axios from "axios";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    const loadingToast = toast.loading("Loading...");

    try {
      await axios.delete(`/products/${id}`);

      toast.success("Product is deleted successfully");

      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries("total-products");

      navigate("/dashboard/all-products");
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      toast.dismiss(loadingToast);
    }
  };
  return { deleteProduct };
};

export default useDeleteProduct;
