import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const defaultQueryClient = new QueryClient();

interface ApiProviderProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

export function ApiProvider({
  children,
  queryClient = defaultQueryClient,
}: ApiProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}