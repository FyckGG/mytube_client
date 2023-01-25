import $api from "../http";

export default class videoDataCreationService {
  static saveVideoTags = async (video_id, tags, hashTags) => {
    try {
      return $api.post("http://localhost:5000/video-data-creation/save-tags", {
        video_id: video_id,
        tags: tags,
        hashTags: hashTags,
      });
    } catch (e) {
      console.log("Ошибка при сохранении тегов: " + e);
    }
  };
}
