import cx from "classnames";
import styles from "./input.module.scss";

type OmittedProps = Omit<React.HTMLAttributes<HTMLInputElement>, "onChange">;

interface InputProps extends OmittedProps {
  value: string;
  onChange: (text: string) => void;
}

export const Input = ({ onChange, value, className, ...props }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <input
      {...props}
      className={cx(styles.input, className)}
      value={value}
      onChange={handleChange}
    />
  );
};
