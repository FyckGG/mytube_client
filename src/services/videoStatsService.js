import $api from "../http";

export default class VideoStatsService {
  static addView = async (video_id) => {
    try {
      console.log(video_id);
      await $api.post("http://localhost:5000/video-stats/add-view", {
        video_id: video_id,
      });
    } catch (e) {
      console.log("Ошибка добавления просмотра: " + e);
    }
  };
}
