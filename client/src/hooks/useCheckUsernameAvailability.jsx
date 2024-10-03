import axios from "axios";
import debounce from "lodash.debounce";

const useCheckUsernameAvailability = () => {
  const checkUsernameAvailability = debounce(async (username) => {
    try {
      const { data } = await axios.get(
        `user/check-username?username=${username}`
      );

      return data;
    } catch (error) {
      console.error("Error checking username availability", error);
      return { status: "error", message: "An error occurred" };
    }
  }, 500); // 500ms debounce

  return { checkUsernameAvailability };
};

export default useCheckUsernameAvailability;
