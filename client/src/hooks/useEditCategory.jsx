import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useEditCategory = () => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const editCategory = async (categoryId, categoryName) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");

    try {
      const { data } = await axios.patch(`/category/${categoryId}`, {
        categoryName,
      });

      toast.success(data.message);
      queryClient.invalidateQueries("categories");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, editCategory };
};

export default useEditCategory;
