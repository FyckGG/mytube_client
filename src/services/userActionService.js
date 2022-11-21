import $api from "../http";

export default class UserActionService {
  static uploadVideo = async (uploading_video) => {
    return $api.post(
      "http://localhost:5000/user-action/upload-video",
      uploading_video,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };
}
