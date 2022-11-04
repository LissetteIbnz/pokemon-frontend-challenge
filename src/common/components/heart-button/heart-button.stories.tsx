import { Meta, Story } from "@storybook/react";
import { HeartButton, HeartButtonProps } from "./heart-button";

export default {
  title: "Forms/HeartButton",
  component: HeartButton,
} as Meta<HeartButtonProps>;

const Template: Story<HeartButtonProps> = (args) => <HeartButton {...args} />;

export const Active = Template.bind({});
Active.args = {
  isActive: true,
};

export const InActive = Template.bind({});
InActive.args = {
  isActive: false,
};
