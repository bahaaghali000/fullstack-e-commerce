import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useFilterProducts = () => {
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (search, category = "", sort = "") => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/products/?search=${search}&category=${category}&sorting=${sort}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, fetchProducts };
};

export default useFilterProducts;
