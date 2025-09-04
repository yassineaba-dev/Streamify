import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    enabled: !!token,            // <-- only run when token exists
    retry: false,
    refetchOnWindowFocus: false, // optional: avoid extra calls
    staleTime: 1000 * 60 * 5,    // optional: cache for 5 minutes
    select: (data) => data?.user // if your API returns { user: ... }
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data ?? null };
};

export default useAuthUser;
