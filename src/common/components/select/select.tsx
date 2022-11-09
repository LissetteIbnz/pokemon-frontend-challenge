import ReactSelect, { SingleValue, ActionMeta } from "react-select";
import { reactSelectStyles } from "./select.styles";
import { Option } from "./select.vm";

export interface SelectProps {
  onChange: (value: Option["value"]) => void;
  options: Option[];
  value: Option["value"];
  placeholder?: string;
  className?: string;
}

export const Select = ({ className, onChange, options, value, placeholder }: SelectProps) => {
  const handleChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    if (actionMeta.action === "clear") {
      onChange("");
    } else if (newValue) {
      onChange(newValue.value);
    }
  };

  const formattedValue = options.find((option) => option.value === value);

  return (
    <ReactSelect
      className={className}
      placeholder={placeholder}
      defaultValue={formattedValue}
      isClearable={true}
      onChange={handleChange}
      styles={reactSelectStyles}
      options={options}
    />
  );
};
