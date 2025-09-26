import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

export interface User {
  id: string;
  username: string;
  email: string;
  isPremium: boolean;
}

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/user-info"],
    queryFn: getQueryFn({ 
      url: "https://candy-backend-j0d3.onrender.com/api/user-info", 
      on401: "returnNull" 
    }),
    retry: false,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
    isPremium: user?.isPremium || false,
    error,
  };
}
