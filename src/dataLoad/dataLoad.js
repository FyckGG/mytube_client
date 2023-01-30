import DataLoadService from "../services/dataLoadService";

export default class DataLoad {
  static async getSubscribtionVideos(user_id, current_page) {
    try {
      const result = await DataLoadService.get_subscribtion_videos(
        user_id,
        current_page
      );
      return result;
    } catch (e) {
      throw "Не удалось получить видео: " + e;
    }
  }
}
