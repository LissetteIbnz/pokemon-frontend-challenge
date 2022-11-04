import * as React from "react";
import {
  fireEvent,
  render,
  RenderOptions,
  RenderResult,
  configure,
} from "@testing-library/react";

configure({ throwSuggestions: true });

type RenderProps = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => RenderResult;

const WrapperProviders = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
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
