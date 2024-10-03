import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useAddRating = () => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const submitRating = async (productId, reviewObject) => {
    setLoading(true);

    const loadingToast = toast.loading("Loading...");
    try {
      const { data } = await axios.post(`/rating/${productId}`, reviewObject);
      toast.success(data.message);

      queryClient.invalidateQueries(["ratings", productId]);
      queryClient.invalidateQueries(["product-details", productId]);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, submitRating };
};

export default useAddRating;
