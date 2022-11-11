import { render, screen, fireEvent } from "test-utils";
import { LoadMoreButton, LoadMoreProps } from "./fetch-button";

describe("<LoadMoreButton />", () => {
  let props: LoadMoreProps;

  beforeEach(() => {
    props = {
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    };
  });

  it("should display Nothing more to load", () => {
    render(<LoadMoreButton {...props} />);

    const nothingButton = screen.getByRole("button", { name: /Nothing more to load/i });
    expect(nothingButton).toBeInTheDocument();
    expect(nothingButton).toBeDisabled();
  });

  it("should display Loading more", () => {
    props.isFetchingNextPage = true;
    render(<LoadMoreButton {...props} />);

    const loadingButton = screen.getByRole("button", { name: /Loading more/i });
    expect(loadingButton).toBeInTheDocument();
    expect(loadingButton).toBeDisabled();
  });

  it("should display Load Newer", () => {
    props.hasNextPage = true;
    render(<LoadMoreButton {...props} />);

    const loadNewerButton = screen.getByRole("button", { name: /Load Newer/i });
    expect(loadNewerButton).toBeInTheDocument();
    expect(loadNewerButton).toBeEnabled();

    fireEvent.click(loadNewerButton);
    expect(props.fetchNextPage).toHaveBeenCalled();
  });
});
