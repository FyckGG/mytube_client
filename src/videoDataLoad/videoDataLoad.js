import videoDataLoadService from "../services/videoDataLoadService";

export default class VideoDataLoad {
  static async getVideoForEdit(video_id, user_id) {
    try {
      const result = await videoDataLoadService.getVideoForEdit(
        video_id,
        user_id
      );
      return result;
    } catch (e) {
      throw "Не удалось получить видео для редактирования:" + e;
    }
  }
}
