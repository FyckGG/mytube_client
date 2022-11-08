const is_img_check = (inputFile) => {
  const imgTypes = ["jpg", "jpeg", "png", "bmp"];
  if (inputFile.files && inputFile.files[0]) {
    const extension = inputFile.files[0].name.split(".").pop().toLowerCase();
    const isSuccess = imgTypes.indexOf(extension) > -1;
    if (isSuccess) return true;
    else return false;
  }
};

export default is_img_check;
