export const getMostPopularVideos = (videos_arr) => {
  const watched_videos = videos_arr.filter((video) => video.number_views > 0);

  watched_videos.sort(function (a, b) {
    return b.number_views - a.number_views;
  });

  if (watched_videos.length <= 5) return watched_videos;
  return watched_videos.slice(0, 5);
};
