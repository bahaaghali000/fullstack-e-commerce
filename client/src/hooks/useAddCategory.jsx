import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useAddCategory = () => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const addCategory = async (categoryName) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");

    try {
      const { data } = await axios.post(`/category`, {
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

  return { loading, addCategory };
};

export default useAddCategory;
