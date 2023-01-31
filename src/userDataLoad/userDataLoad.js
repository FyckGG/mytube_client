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

  static async getSubsChannels(user_id) {
    try {
      const result = await UserDataLoadService.getSubsChannels(user_id);
      return result;
    } catch (e) {
      throw "Не улалось получить подписки пользователя:" + e;
    }
  }

  static async getWatchLaterVideos(user_id) {
    try {
      const result = await UserDataLoadService.getWatchLaterVideos(user_id);
      return result;
    } catch (e) {
      throw "Не удалось получить видео для просмотра позже: " + e;
    }
  }

  static async getUserHistoryVideos(user_id) {
    try {
      const result = await UserDataLoadService.getUserHistoryVideos(user_id);
      return result;
    } catch (e) {
      throw "Не удалось получить историю пользователя: " + e;
    }
  }
}
