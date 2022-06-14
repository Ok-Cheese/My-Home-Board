export const hexToRgb = (hexType: string) => {
  const hex = hexType.trim().replace('#', '');

  const rgb = hex.length === 3 ? hex.match(/[a-f\d]/gi) : hex.match(/[a-f\d]{2}/gi);

  if (!rgb) return undefined;

  const converted: number[] = [];
  rgb.forEach((str: string) => {
    const hexValue = str.length === 1 ? str + str : str;
    converted.push(parseInt(hexValue, 16));
  });

  return `${converted.join(', ')}`;
};
