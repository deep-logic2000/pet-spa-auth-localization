export const setItemToLS = (key: string, value: string | boolean) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLS = (key: string): string | null | undefined => {
  if (!localStorage.getItem(key)) {
    return null;
  }

  const value = localStorage.getItem(key);
  if (typeof value === "string") {
    const parse = JSON.parse(value);
    return parse;
  }
};

export const removeItemFromLS = (key: string) => {
  localStorage.removeItem(key);
};
