const convertCount = (count) => {
  if (count < 1000) return count;
  const thous = Math.floor(count / 1000);
  if (thous < 1000) return `${thous} тыс.`;
  const mill = Math.floor(thous / 1000);
  if (mill < 1000) return `${mill} млн.`;
  const bill = Math.floor(mill / 1000);
  return `${bill} млрд.`;
};

export default convertCount;
