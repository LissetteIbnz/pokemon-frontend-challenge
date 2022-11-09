import { render, screen, fireEvent, changeInput } from "test-utils";
import { Header, HeaderProps } from "./header";

describe("<Header />", () => {
  let props: HeaderProps;

  beforeEach(() => {
    props = {
      onViewFilterChange: jest.fn(),
      onSearchChange: jest.fn(),
      onTypeFilterChange: jest.fn(),
      viewFilter: "all",
      search: "",
      typeOptions: [
        {
          label: "Label 1",
          value: "value-1",
        },
      ],
      typeFilter: "",
    };
  });

  it("should call 'onFilterViewClick' when a user clicks on All button", () => {
    render(<Header {...props} />);

    const allButton = screen.getByRole("button", { name: /all/i });
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);
    expect(props.onViewFilterChange).toHaveBeenCalledWith("all");
  });

  it("should call 'onFilterViewClick' when a user clicks on Favorites button", () => {
    render(<Header {...props} />);

    const favoritesButton = screen.getByRole("button", { name: /favorites/i });
    expect(favoritesButton).toBeInTheDocument();

    fireEvent.click(favoritesButton);
    expect(props.onViewFilterChange).toHaveBeenCalledWith("favorites");
  });

  it("should call 'onSearchChange' when a user types on Search input", () => {
    const expectedSearch = "test";

    render(<Header {...props} />);

    const searchInput: HTMLInputElement = screen.getByRole("textbox");
    changeInput(searchInput, expectedSearch);

    expect(props.onSearchChange).toHaveBeenCalledWith(expectedSearch);
  });
});
