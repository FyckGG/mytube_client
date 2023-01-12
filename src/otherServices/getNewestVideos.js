export const getNewestVideos = (videos_arr) => {
  const current_date = Date.now();
  console.log(current_date);
  const newest_videos = videos_arr.filter(
    (video) => (current_date - Date.parse(video.video_date)) / 86400000 < 30
  );
  if (newest_videos.length <= 5) return newest_videos;
  return newest_videos.slice(0, 5);
};
