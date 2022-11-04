import * as React from "react";
import {
  fireEvent,
  render,
  RenderOptions,
  RenderResult,
  configure,
} from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { testQueryClientConfig } from "core/api/api.config";
import { ApiProvider } from "core/api";

configure({ throwSuggestions: true });

// React Query Config
const queryClient = new QueryClient(testQueryClientConfig);
// Due to React Query caching calls, we need to clear this cache.
beforeEach(() => {
  queryClient.clear();
});

type RenderProps = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => RenderResult;

const WrapperProviders = ({ children }: { children: React.ReactNode }) => (
  <ApiProvider queryClient={queryClient}>{children}</ApiProvider>
);

const customRender: RenderProps = (ui, renderOptions) =>
  render(ui, { wrapper: WrapperProviders, ...renderOptions });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

export const changeInput = (
  input: HTMLInputElement | HTMLTextAreaElement,
  value: string
) => fireEvent.change(input, { target: { value } });
