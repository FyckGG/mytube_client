export const checkHashTags = (tags) => {
  let is_correct = true;
  tags.map((tag) => {
    if (tag[0] !== "#") {
      is_correct = false;
    }
  });
  return is_correct;
};
