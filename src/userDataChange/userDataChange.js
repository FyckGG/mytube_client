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

  static async add_video_to_history(user_id, video_id) {
    try {
      const result = await UserDataChangeService.add_video_to_history(
        user_id,
        video_id
      );
      return result;
    } catch (e) {
      throw "Не удалось добавить видео в историю: " + e;
    }
  }
}
