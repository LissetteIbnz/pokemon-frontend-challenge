import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "Forms/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Default",
};

export const InActive = Template.bind({});
InActive.args = {};
