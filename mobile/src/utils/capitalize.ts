export const capitalize = (text: string): string => {
  const capitalizedText = text.slice(0, 1).toUpperCase() + text.slice(1);

  return capitalizedText;
}