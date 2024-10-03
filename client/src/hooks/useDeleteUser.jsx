import axios from "axios";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteUser = async (userId) => {
    const loadingToast = toast.loading("Loading...");
    try {
      await axios.delete(`/user/${userId}`);

      queryClient.invalidateQueries("users");

      toast.success("User Deleted successfully");
    } catch (error) {
      toast.error("Something went wroung");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return { deleteUser };
};

export default useDeleteUser;
