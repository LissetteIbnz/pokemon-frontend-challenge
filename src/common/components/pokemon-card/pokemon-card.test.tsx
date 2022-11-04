import { render, screen, fireEvent } from "test-utils";
import { PokemonCard, PokemonCardProps } from "./pokemon-card";

describe("<PokemonCard />", () => {
  let props: PokemonCardProps;

  beforeEach(() => {
    props = {
      description: "Description",
      imageUrl: "irrelevant-url.png",
      isFavorite: false,
      title: "Title",
      onFavorite: jest.fn(),
    };
  });

  it("should render a title", () => {
    render(<PokemonCard {...props} />);

    expect(
      screen.getByRole("heading", { name: props.title })
    ).toBeInTheDocument();
  });

  it("should render a description", () => {
    render(<PokemonCard {...props} />);

    expect(screen.getByText(props.description)).toBeInTheDocument();
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
});
