const getArrayOfColors = (length: number) =>
  [...Array(length)].map(() => `hsla(${~~(360 * Math.random())},70%,70%,0.8)`);

export default getArrayOfColors;
