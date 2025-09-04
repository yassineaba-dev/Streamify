// useSignUp.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      // localStorage.setItem("hasSession", "1"); // if cookie-based
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { isLoading, error, signupMutation: mutate };
};
export default useSignUp;
