export const chunk = <T>(array: T[], size: number): T[][] => {
  if (size === 0) {
    return [];
  }

  const chunked = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
    index += size;
  }

  return chunked;
};
