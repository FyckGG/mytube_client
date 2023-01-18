import UserDataChangeService from "../services/userDataChangeService";

export default class UserDataChange {
  static async change_avatar(new_avatar) {
    try {
      const result = await UserDataChangeService.change_avatar(new_avatar);
      return result;
    } catch (e) {
      throw "Не удалось сменить аватар профиля: " + e;
    }
  }

  static async change_channel_description(user_id, text) {
    try {
      const result = await UserDataChangeService.change_channel_description(
        user_id,
        text
      );
      return result;
    } catch (e) {
      throw "Не удалось изменить описание канала: " + e;
    }
  }
}
