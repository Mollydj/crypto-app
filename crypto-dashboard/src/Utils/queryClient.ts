// src/Utils/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // how long data stays *fresh* (no refetch)
      staleTime: 1000 * 60 * 5, // 5 minutes

      // how long cached data remains after all listeners unmount
      gcTime: 1000 * 60 * 30, // 30 minutes

      // do not refetch when window is focused
      refetchOnWindowFocus: false,
    },
  },
});
