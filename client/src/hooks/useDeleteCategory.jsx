import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const deleteCategory = async (categoryId) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");
    try {
      const { data } = await axios.delete(`/category/${categoryId}`);

      queryClient.invalidateQueries("categories");
      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, deleteCategory };
};

export default useDeleteCategory;
