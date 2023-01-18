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

  static async deleteComment(comment) {
    try {
      const result = await UserActionService.deleteComment(comment);
      return result;
    } catch (e) {
      throw "Не удалось удалить комментарий: " + e;
    }
  }

  static async Subscribe(channel_id, subscriber_id) {
    try {
      const result = await UserActionService.subscribe(
        channel_id,
        subscriber_id
      );
      return result;
    } catch (e) {
      throw "Не удалось осуществить подписку: " + e;
    }
  }

  static async Unsubscribe(channel_id, subscriber_id) {
    try {
      const result = await UserActionService.unsubscribe(
        channel_id,
        subscriber_id
      );
      return result;
    } catch (e) {
      throw "не удалось удалить подписку: " + e;
    }
  }

  static async addWatchLater(video_id, user_id) {
    try {
      const result = await UserActionService.addWatchLater(video_id, user_id);
      return result;
    } catch (e) {
      throw "Не удалось добавить запись 'Посмотреть позже:' " + e;
    }
  }

  static async deleteWatchLater(video_id, user_id) {
    try {
      const result = await UserActionService.deleteWatchLater(
        video_id,
        user_id
      );
      return result;
    } catch (e) {
      throw "Не удалось удалить запись 'Смотреть позже' : " + e;
    }
  }

  static async editVideo(
    user_id,
    video_id,
    video_name,
    video_description,
    video_access
  ) {
    try {
      const result = await UserActionService.editVideo(
        user_id,
        video_id,
        video_name,
        video_description,
        video_access
      );
      return result;
    } catch (e) {
      throw "Не удалось изменить видео: " + e;
    }
  }
}
