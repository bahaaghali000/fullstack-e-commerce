import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useAddRating = () => {
  const [loading, setLoading] = useState(false);

  const submitRating = async (productId, reviewObject) => {
    setLoading(true);

    const loadingToast = toast.loading("Loading...");
    try {
      const { data } = await axios.post(
        `/api/rating/${productId}`,
        reviewObject
      );
      toast.success("Your Rating Added Successfully");

      return data.data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return { loading, submitRating };
};

export default useAddRating;
