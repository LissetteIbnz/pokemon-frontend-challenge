import { render, screen, fireEvent } from "test-utils";
import { HeartButton, HeartButtonProps } from "./heart-button";

describe("<HeartButton />", () => {
  let props: HeartButtonProps;

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      isActive: false,
    };
  });

  it("should call 'onClick' when a user clicks on Favorite button", () => {
    render(<HeartButton {...props} />);

    const favoriteButton = screen.getByRole("button", { name: /favorite/i });
    fireEvent.click(favoriteButton);

    expect(props.onClick).toHaveBeenCalled();
  });

  it("should display 'Mark as favorite' when is not active", () => {
    props.isActive = false;
    render(<HeartButton {...props} />);

    expect(screen.getByRole("button", { name: /mark as favorite/i })).toBeInTheDocument();
  });

  it("should display 'Remove as favorite' when is active", () => {
    props.isActive = true;
    render(<HeartButton {...props} />);

    expect(screen.getByRole("button", { name: /remove as favorite/i })).toBeInTheDocument();
  });
});
