import * as React from "react";
import { Button } from "../button";
import styles from "./group-buttons.module.scss";

type ButtonProps = {
  title: string;
  onClick: () => void;
};

interface GroupButtonsProps {
  buttons: ButtonProps[];
  defaultSelectedIndex?: number;
}

export const GroupButtons = ({ buttons, defaultSelectedIndex = 0 }: GroupButtonsProps) => {
  const [selectedIndexButton, setSelectedIndexButton] = React.useState(defaultSelectedIndex);

  const handleClick = (indexButton: number) => {
    setSelectedIndexButton(indexButton);
    buttons[indexButton].onClick();
  };

  return (
    <div className={styles.container}>
      {buttons.map(({ title }, index) => {
        const isSelected = selectedIndexButton === index;
        const variant = isSelected ? "primary" : "secondary";
        return (
          <Button isBlock={true} key={title} onClick={() => handleClick(index)} variant={variant}>
            {title}
          </Button>
        );
      })}
    </div>
  );
};
