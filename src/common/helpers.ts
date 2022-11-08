export const isNullOrUndefined = (value: unknown): boolean => {
  return value === null || value === undefined;
};

export const formatterList = (values: string[]) => {
  if (isNullOrUndefined(values)) {
    return "";
  }

  const formatter = new Intl.ListFormat("en", {
    style: "narrow",
    type: "conjunction",
  });

  return formatter.format(values);
};
