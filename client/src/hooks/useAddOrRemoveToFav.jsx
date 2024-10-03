import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useAddOrRemoveToFav = () => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const addOrRemoveToFav = async (productId) => {
    setLoading(true);
    const loadingToast = toast.loading("Loading...");

    try {
      const { data } = await axios.get(`/favorite/${productId}`);

      queryClient.invalidateQueries(["product-details", productId]);

      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, addOrRemoveToFav };
};

export default useAddOrRemoveToFav;
