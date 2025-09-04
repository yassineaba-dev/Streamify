// useLogin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // 1) Save token (adjust key if your API returns different shape)
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      // 2) optional: if you use HttpOnly cookie approach, set a small flag
      // localStorage.setItem("hasSession", "1");

      // 3) Then invalidate/refetch auth query so it runs with the token present
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { error, isLoading, loginMutation: mutate };
};

export default useLogin;
