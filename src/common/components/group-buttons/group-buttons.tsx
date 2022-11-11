import { Button } from "../button";
import styles from "./group-buttons.module.scss";

type ButtonProps = {
  isActive: boolean;
  onClick: () => void;
  title: string;
};

export interface GroupButtonsProps {
  buttons: ButtonProps[];
}

export const GroupButtons = ({ buttons }: GroupButtonsProps) => {
  return (
    <div className={styles.container}>
      {buttons.map(({ title, isActive, onClick }) => {
        const variant = isActive ? "primary" : "secondary";
        return (
          <Button key={title} isBlock={true} variant={variant} onClick={onClick}>
            {title}
          </Button>
        );
      })}
    </div>
  );
};
