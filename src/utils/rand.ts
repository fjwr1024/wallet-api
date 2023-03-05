export const createRandomCode = () => {
  const MIN = 100000;
  const MAX = 999999;
  const sentCode = Math.floor(Math.random() * (MAX + 1 - MIN)) + MIN;

  return sentCode;
};
