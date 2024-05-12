"use client";

import {
  Query,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { ResponseError, logout } from "../services/httpClient.service";
import { UserContext, useUser } from "./UserContext.context";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, setUser } = useUser() as UserContext;

  const onError = async (error: Error) => {
    if (error instanceof ResponseError) {
      if (error.response.status === 401) {
        await logout();
        setUser(null);
      }
    }
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: onError,
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
