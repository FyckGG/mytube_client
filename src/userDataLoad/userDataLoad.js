import UserDataLoadService from "../services/userDataLoadService";

export default class UserDataLoad {
  static async getSubs(channel_id, subscriber_id) {
    try {
      const result = await UserDataLoadService.getSub(
        channel_id,
        subscriber_id
      );
      return result;
    } catch (e) {
      throw "Не удалось получить данные о подписке: " + e;
    }
  }

  static async getLikedVIdeos(videos_id) {
    try {
      const result = await UserDataLoadService.getLikedVideos(videos_id);
      return result;
    } catch (e) {
      throw "Не удалось загрузить понравившиеся видео: " + e;
    }
  }
}
