const addSpaces = (num) => {
  const num_str = num.toString();

  if (num_str.length <= 3) return num_str;

  let num_with_spaces = "";

  let count = 0;

  if (num_str.length % 3 !== 0) {
    num_with_spaces += num_str.substring(0, num_str.length % 3) + " ";

    for (let i = num_str.length % 3; i < num_str.length; i++) {
      if (count % 3 === 0) num_with_spaces += " ";
      num_with_spaces += num_str[i];
      count++;
    }
  } else {
    for (let i = 0; i < num_str.length; i++) {
      if (count % 3 === 0) num_with_spaces += " ";
      num_with_spaces += num_str[i];
      count++;
    }
  }

  return num_with_spaces;
};

export default addSpaces;
