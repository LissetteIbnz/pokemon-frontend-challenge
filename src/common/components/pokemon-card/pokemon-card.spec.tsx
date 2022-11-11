import { render, screen, fireEvent } from "test-utils";
import { PokemonCard, PokemonCardProps } from "./pokemon-card";

describe("<PokemonCard />", () => {
  let props: PokemonCardProps;

  beforeEach(() => {
    props = {
      types: undefined,
      imageUrl: "irrelevant-url.png",
      isFavorite: false,
      title: "Title",
      onFavorite: jest.fn(),
      onClick: jest.fn(),
    };
  });

  it("should render a title", () => {
    render(<PokemonCard {...props} />);

    expect(screen.getByRole("heading", { name: props.title })).toBeInTheDocument();
  });

  it("should render a types when it exists", () => {
    const expectedText = "Types";

    props.types = undefined;
    const { rerender } = render(<PokemonCard {...props} />);
    expect(screen.queryByText(expectedText)).not.toBeInTheDocument();

    props.types = expectedText;
    rerender(<PokemonCard {...props} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it("should render an image", () => {
    render(<PokemonCard {...props} />);

    expect(screen.getByRole("img", { name: props.title })).toBeInTheDocument();
  });

  it("should call 'onFavorite' when a user clicks on Favorite button", () => {
    render(<PokemonCard {...props} />);

    const favoriteButton = screen.getByRole("button", { name: /favorite/i });
    fireEvent.click(favoriteButton);

    expect(props.onFavorite).toBeCalled();
  });

  it("should call 'onClick' when a user clicks on the card", () => {
    props.onClick = jest.fn();
    render(<PokemonCard {...props} />);

    const card = screen.getByRole("img");
    fireEvent.click(card);

    expect(props.onClick).toBeCalled();
  });
});
