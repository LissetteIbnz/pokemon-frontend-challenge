import { render, screen, fireEvent } from "test-utils";
import { Header, HeaderProps } from "./header";

describe("<Header />", () => {
  let props: HeaderProps;

  beforeEach(() => {
    props = {
      onAllClick: jest.fn(),
      onFavoritesClick: jest.fn(),
    };
  });

  it("should call 'onAllClick' when a user clicks on All button", () => {
    render(<Header {...props} />);

    const allButton = screen.getByRole("button", { name: /all/i });
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);
    expect(props.onAllClick).toHaveBeenCalled();
  });

  it("should call 'onFavoritesClick' when a user clicks on Favorites button", () => {
    render(<Header {...props} />);

    const favoritesButton = screen.getByRole("button", { name: /favorites/i });
    expect(favoritesButton).toBeInTheDocument();

    fireEvent.click(favoritesButton);
    expect(props.onFavoritesClick).toHaveBeenCalled();
  });
});
