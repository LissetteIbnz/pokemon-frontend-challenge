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

export const buildURLSearchParams = <T extends Record<string, unknown>>(object?: T) => {
  const queryParams = new URLSearchParams();

  if (!object) {
    return queryParams;
  }

  Object.entries(object).forEach(([key, value]) => {
    if (isNullOrUndefined(value)) {
      return;
    }

    if (typeof value === "number") {
      queryParams.append(key, value.toString());
    }

    if (typeof value === "string" && value.trim().length > 0) {
      queryParams.append(key, value);
    }

    if (Array.isArray(value)) {
      const join = value.join(",");
      queryParams.append(key, join);
    }
  });

  return queryParams;
};
