import videoDataCreationService from "../services/videoDataCreationService";

export default class VideoDataCreation {
  static async saveVideoTags(video_id, tags, hashTags) {
    try {
      const result = await videoDataCreationService.saveVideoTags(
        video_id,
        tags,
        hashTags
      );
      return result;
    } catch (e) {
      throw "Не удалось сохранить теги видео:" + e;
    }
  }
}
