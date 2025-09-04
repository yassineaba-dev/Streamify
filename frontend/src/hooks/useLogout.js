// useLogout.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logoutMutation, isLoading, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // clear token/flags on logout
      localStorage.removeItem("token");
      localStorage.removeItem("hasSession");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { logoutMutation, isLoading, error };
};
export default useLogout;
