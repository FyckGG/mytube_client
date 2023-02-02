import $api from "../http";

export default class videoDataCreationService {
  static saveVideoTags = async (video_id, tags, hashTags) => {
    try {
      return $api.post(
        `${process.env.REACT_APP_API_URL}/video-data-creation/save-tags`,
        {
          video_id: video_id,
          tags: tags,
          hashTags: hashTags,
        }
      );
    } catch (e) {
      console.log("Ошибка при сохранении тегов: " + e);
    }
  };
}
