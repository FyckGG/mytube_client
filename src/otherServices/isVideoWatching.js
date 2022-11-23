const isVideoWatching = (duration, second_of_watch) => {
  if (duration <= 60) {
    if (second_of_watch < duration / 2) return false;
    else return true;
  }
  if (duration > 60) {
    if (second_of_watch < Math.ceil(duration / 3)) return false;
    else return true;
  }
};

export default isVideoWatching;
