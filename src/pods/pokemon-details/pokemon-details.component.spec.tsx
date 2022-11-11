import { render, screen, fireEvent } from "test-utils";
import { mockPokemonDetailsDTO } from "common/mocks";
import { PokemonDetailsComponent, PokemonDetailsComponentProps } from "./pokemon-details.component";
import { mapPokemonDetailsAmToVm } from "./pokemon-details.mapper";

jest.mock("../../common/hooks/audio.hook", () => ({
  useAudio: () => ({
    playing: false,
    toggle: jest.fn(),
  }),
}));

describe("<PokemonDetailsComponent />", () => {
  let props: PokemonDetailsComponentProps;

  beforeEach(() => {
    props = {
      onFavorite: jest.fn(),
      onGoBack: jest.fn(),
      onNavigateToPokemon: jest.fn(),
      pokemon: mapPokemonDetailsAmToVm(mockPokemonDetailsDTO),
    };
  });

  it("should render a pokemon", () => {
    render(<PokemonDetailsComponent {...props} />);
    expect(screen.getByRole("heading", { name: props.pokemon.name })).toBeInTheDocument();
  });

  it("should call 'onGoBack' when a user clicks on Go Back button", () => {
    render(<PokemonDetailsComponent {...props} />);

    const goBackButton = screen.getByRole("button", { name: /go back/i });
    fireEvent.click(goBackButton);
    expect(props.onGoBack).toHaveBeenCalled();
  });

  it("should call 'onFavorite' when a user clicks on Favorite button", () => {
    render(<PokemonDetailsComponent {...props} />);

    const mainFavoriteButton = screen.getAllByRole("button", { name: /favorite/i })[0];
    fireEvent.click(mainFavoriteButton);
    expect(props.onFavorite).toHaveBeenCalledWith(props.pokemon.id, props.pokemon.isFavorite);

    const evolutionFavoriteButton = screen.getAllByRole("button", { name: /favorite/i })[1];
    fireEvent.click(evolutionFavoriteButton);
    expect(props.onFavorite).toHaveBeenCalledWith(
      props.pokemon.evolutions[0].id,
      props.pokemon.evolutions[0].isFavorite
    );
  });

  it("should call 'onNavigateToPokemon' when a user clicks on Card", () => {
    render(<PokemonDetailsComponent {...props} />);

    const evolutionNavigateToPokemonCard = screen.getAllByRole("img")[1];
    fireEvent.click(evolutionNavigateToPokemonCard);
    expect(props.onNavigateToPokemon).toHaveBeenCalledWith(props.pokemon.evolutions[0].id);
  });
});
