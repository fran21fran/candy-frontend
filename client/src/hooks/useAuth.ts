import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

export interface User {
  id: string;
  username: string;
  email: string;
  isPremium: boolean;
}

export function useAuth() {
  console.log("🔍 useAuth se está ejecutando");
  
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/user-info"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  console.log("🔍 useAuth state:", { user, isLoading, error });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
    isPremium: user?.isPremium || false,
    error,
  };
}
