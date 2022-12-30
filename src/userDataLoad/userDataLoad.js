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
}
