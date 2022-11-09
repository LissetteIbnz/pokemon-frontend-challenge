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
          <Button isBlock={true} key={title} onClick={onClick} variant={variant}>
            {title}
          </Button>
        );
      })}
    </div>
  );
};
