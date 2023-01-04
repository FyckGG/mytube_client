export const getLastUrlPart = (url) => {
  return url.substring(url.lastIndexOf("/") + 1);
};
