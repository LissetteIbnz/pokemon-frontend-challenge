import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Card } from "./card";

type CardComponent = typeof Card;

export default {
  title: "UI/Card",
  component: Card,
} as ComponentMeta<CardComponent>;

const Template: ComponentStory<CardComponent> = (args) => <Card {...args} />;

export const Default = Template.bind({});
