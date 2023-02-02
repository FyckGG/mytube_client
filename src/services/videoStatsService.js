import $api from "../http";

export default class VideoStatsService {
  static addView = async (video_id) => {
    try {
      const result = await $api.post(
        `${process.env.REACT_APP_API_URL}/video-stats/add-view`,
        {
          video_id: video_id,
        }
      );
      return result;
    } catch (e) {
      console.log("Ошибка добавления просмотра: " + e);
    }
  };

  static addMark = async (video, user, is_like) => {
    try {
      const result = await $api.post(
        `${process.env.REACT_APP_API_URL}/video-stats/add-mark`,
        {
          video: video,
          user: user,
          is_like: is_like,
        }
      );
      return result;
    } catch (e) {
      console.log("Ошибка при добавлении оценки: " + e);
    }
  };

  static deleteMark = async (video, user, is_like) => {
    try {
      const result = await $api.post(
        `${process.env.REACT_APP_API_URL}/video-stats/delete-mark`,
        {
          video: video,
          user: user,
          is_like: is_like,
        }
      );
      return result;
    } catch (e) {
      console.log("Ошибка при удалении оценки: " + e);
    }
  };
}
