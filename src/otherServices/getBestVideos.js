export const getBestVideos = (videos_arr) => {
  const videos_with_likes = videos_arr.filter(
    (video) =>
      video.count_of_likes > 0 &&
      video.count_of_likes - video.count_of_dislikes > 0
  );

  videos_with_likes.sort(function (a, b) {
    const a_diff = a.count_of_likes - a.count_of_dislikes;
    const b_diff = b.count_of_lokes - b.count_of_dislikes;
    return b_diff - a_diff;
  });

  if (videos_with_likes.length < 5) return videos_with_likes;
  return videos_with_likes.slice(0, 5);
};
