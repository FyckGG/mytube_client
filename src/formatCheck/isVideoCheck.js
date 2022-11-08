const is_video_check = (inputFile) => {
  const imgTypes = ["mov", "mp4"];
  if (inputFile.files && inputFile.files[0]) {
    const extension = inputFile.files[0].name.split(".").pop().toLowerCase();
    const isSuccess = imgTypes.indexOf(extension) > -1;
    if (isSuccess) return true;
    else return false;
  }
};

export default is_video_check;
