import { StylesConfig } from "react-select";
import colors from "assets/scss/_colors.scss";
import { Option } from "./select.vm";

type IsNotMulti = false;

export const reactSelectStyles: StylesConfig<Option, IsNotMulti> = {
  control: (provided) => ({
    ...provided,
    background: colors["layer-01"],
    borderColor: colors["layer-01"],
    borderRadius: "0",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "8px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: colors.primary,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: colors["layer-01"],
  }),
};
