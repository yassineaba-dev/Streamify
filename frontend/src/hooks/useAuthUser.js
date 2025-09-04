import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    select: (data) => data?.user,
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data ?? null };
};
