import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const defaultQueryClient = new QueryClient();

interface ApiProviderProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

export const ApiProvider = ({ children, queryClient = defaultQueryClient }: ApiProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
