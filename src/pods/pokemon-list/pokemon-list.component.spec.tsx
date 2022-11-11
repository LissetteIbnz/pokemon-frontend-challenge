import selectEvent from "react-select-event";
import { render, screen, changeInput, fireEvent } from "test-utils";
import { PokemonListComponent, PokemonListComponentProps } from "./pokemon-list.component";

describe("<PokemonListComponent />", () => {
  let props: PokemonListComponentProps;

  beforeEach(() => {
    props = {
      fetchButton: <button>Load More</button>,
      onFavoriteClick: jest.fn(),
      onPokemonClick: jest.fn(),
      onSearchChange: jest.fn(),
      onTypeFilterChange: jest.fn(),
      onViewChange: jest.fn(),
      onViewFilterChange: jest.fn(),
      pokemons: [
        {
          id: "001",
          imageUrl: "irrelevant-image-url.png",
          isFavorite: false,
          name: "Bulbasur",
          types: "Type 1",
        },
      ],
      search: "",
      typeFilter: "",
      typeOptions: [
        { label: "Type 1", value: "Type 1" },
        { label: "Type 2", value: "Type 2" },
      ],
      view: "grid",
      viewFilter: "all",
    };
  });

  it("should call 'onFavoriteClick' when a user clicks on Favorite button", () => {
    render(<PokemonListComponent {...props} />);

    const favoriteButton = screen.getByRole("button", { name: /mark as favorite/i });
    expect(favoriteButton).toBeInTheDocument();

    fireEvent.click(favoriteButton);
    expect(props.onFavoriteClick).toHaveBeenCalled();
  });

  it("should call 'onPokemonClick' when a user clicks on card", () => {
    render(<PokemonListComponent {...props} />);

    const cardButton = screen.getByRole("img");
    expect(cardButton).toBeInTheDocument();

    fireEvent.click(cardButton);
    expect(props.onPokemonClick).toHaveBeenCalled();
  });

  it("should call 'onViewChange' when a user clicks on View List button", () => {
    render(<PokemonListComponent {...props} />);

    fireEvent.click(screen.getByRole("button", { name: /view list/i }));
    expect(props.onViewChange).toHaveBeenCalledWith("list");

    fireEvent.click(screen.getByRole("button", { name: /view grid/i }));
    expect(props.onViewChange).toHaveBeenCalledWith("grid");
  });

  it("should call 'onViewFilterChange' when a user clicks on View Filter button", () => {
    render(<PokemonListComponent {...props} />);

    fireEvent.click(screen.getByRole("button", { name: /all/i }));
    expect(props.onViewFilterChange).toHaveBeenCalledWith("all");

    fireEvent.click(screen.getByRole("button", { name: /favorites/i }));
    expect(props.onViewFilterChange).toHaveBeenCalledWith("favorites");
  });

  it("should call 'onSearchChange' when a user types", () => {
    const expectedText = "fire";

    render(<PokemonListComponent {...props} />);

    const inputSearch: HTMLInputElement = screen.getByRole("textbox");
    expect(inputSearch).toBeInTheDocument();

    changeInput(inputSearch, expectedText);
    expect(props.onSearchChange).toHaveBeenCalledWith(expectedText);
  });

  it("should call 'onTypeFilterChange' when a user types", async () => {
    render(<PokemonListComponent {...props} />);

    const typeSelect = screen.getByRole("combobox");
    await selectEvent.select(typeSelect, ["Type 2"]);

    expect(props.onTypeFilterChange).toHaveBeenCalledWith("Type 2");
  });
});
