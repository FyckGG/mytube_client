const convertDate = (date) => {
  const mounths = new Map();
  mounths
    .set("01", "января")
    .set("02", "февраля")
    .set("03", "марта")
    .set("04", "апреля")
    .set("05", "мая")
    .set("06", "июня")
    .set("07", "июля")
    .set("08", "августа")
    .set("09", "сентября")
    .set("10", "октября")
    .set("11", "ноября")
    .set("12", "декабря");
  const date_part = date.split("-");
  date_part[2] = date_part[2].substring(0, 2);
  return `${date_part[2]} ${mounths.get(date_part[1])} ${date_part[0]}`;
};

export default convertDate;
