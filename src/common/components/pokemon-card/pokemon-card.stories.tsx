import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PokemonCard } from "./pokemon-card";

type PokemonCardComponent = typeof PokemonCard;

export default {
  title: "UI/PokemonCard",
  component: PokemonCard,
} as ComponentMeta<PokemonCardComponent>;

const Template: ComponentStory<PokemonCardComponent> = (args) => (
  <PokemonCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  description: "Grass, Poison",
  isFavorite: false,
  title: "Bulbasaur",
};
