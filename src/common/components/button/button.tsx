import cx from "classnames";
import styles from "./button.module.scss";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
  onlyIcon?: boolean;
  isBlock?: boolean;
};

export const Button = ({
  className,
  variant = "primary",
  isBlock,
  onlyIcon,
  ...props
}: ButtonProps) => {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isTertiary = variant === "tertiary";

  return (
    <button
      {...props}
      className={cx(
        styles.button,
        {
          [styles["button--primary"]]: isPrimary,
          [styles["button--secondary"]]: isSecondary,
          [styles["button--block"]]: isBlock,
          [styles["button--icon"]]: onlyIcon,
          [styles["button--tertiary"]]: isTertiary || onlyIcon,
        },
        className
      )}
    />
  );
};
