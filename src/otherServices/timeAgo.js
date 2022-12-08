const timeAgo = (pastDate) => {
  const dif_seconds = Math.floor((Date.now() - Date.parse(pastDate)) / 1000);
  if (dif_seconds < 60) return "Только что";
  const dif_minutes = Math.floor(dif_seconds / 60);
  if (dif_minutes < 60) return `${dif_minutes} мин. назад`;
  const dif_hours = Math.floor(dif_minutes / 60);
  if (dif_hours < 24) return `${dif_hours} ч. назад`;
  const dif_days = Math.floor(dif_hours / 24);
  if (dif_days < 30) return `${dif_days} дн. назад`;
  const dif_mounths = Math.floor(dif_days / 30);
  if (dif_mounths < 12) return `${dif_mounths} мес. назад`;
  const dif_years = Math.floor(dif_mounths / 12);
  return `${dif_years} л. назад`;
};

export default timeAgo;
