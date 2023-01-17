import $api from "../http";

export default class videoDataLoadService {
  static getVideoForEdit = async (video_id, user_id) => {
    try {
      const result = $api.post(
        "http://localhost:5000/video-data-load/get-video-for-edit",
        {
          video_id: video_id,
          user_id: user_id,
        }
      );
      return result;
    } catch (e) {
      console.log("Ошибка при получении видео для редактирования: " + e);
    }
  };
}
