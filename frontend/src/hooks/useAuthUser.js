// src/hooks/useAuthUser.js
import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

export default function useAuthUser() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    select: (data) => data?.user ?? null,
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data ?? null };
}
