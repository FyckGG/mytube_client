import UserActionService from "../services/userActionService";

export default class userActions {
  static async uploadVideo(uploading_video) {
    try {
      console.log("cdcdcdcdc");
      const result = await UserActionService.uploadVideo(uploading_video);
      return result;
    } catch (e) {
      throw "Не удалось загрузить видео: " + e;
    }
  }
}
