const convertTime = (time) => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) - hours * 60;
  const seconds = Math.floor(time % 60);
  let time_string = "";
  if (hours != 0) time_string += `${hours}h `;
  if (minutes != 0) time_string += `${minutes}m `;
  if (seconds != 0) time_string += `${seconds}s`;
  return time_string;
};

export default convertTime;
