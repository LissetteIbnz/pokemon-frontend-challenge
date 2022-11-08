import cx from "classnames";
import styles from "./button.module.scss";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = ({ className, variant = "primary", ...props }: ButtonProps) => {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  return (
    <button
      {...props}
      className={cx(
        styles.button,
        {
          [styles["button--primary"]]: isPrimary,
          [styles["button--secondary"]]: isSecondary,
        },
        className
      )}
    />
  );
};
