export const isValidABN = (abn: string): boolean => {
  if (abn.length !== 11) {
    return false;
  }

  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const digits = abn.split('').map(Number);

  digits[0] -= 1;

  // Calculate the weighted sum
  const sum = digits.reduce(
    (total, digit, index) => total + digit * weights[index],
    0,
  );

  return sum % 89 === 0;
};
