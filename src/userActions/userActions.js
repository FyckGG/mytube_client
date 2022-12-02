import UserActionService from "../services/userActionService";

export default class userActions {
  static async uploadVideo(uploading_video) {
    try {
      const result = await UserActionService.uploadVideo(uploading_video);
      return result;
    } catch (e) {
      throw "Не удалось загрузить видео: " + e;
    }
  }

  static async sendComment(video, user, text) {
    try {
      const result = await UserActionService.sendComment(video, user, text);
      return result;
    } catch (e) {
      throw "Не удалось отправить комментарий на сервер: " + e;
    }
  }
}
