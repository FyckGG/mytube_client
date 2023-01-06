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

  static sendComment = async (video, user, text) => {
    return $api.post("http://localhost:5000/user-action/send-comment", {
      video_id: video,
      user_id: user,
      text: text,
    });
  };

  static subscribe = async (channel_id, subscriber_id) => {
    return $api.post("http://localhost:5000/user-action/subscribe", {
      channel_id: channel_id,
      subscriber_id: subscriber_id,
    });
  };

  static unsubscribe = async (channel_id, subscriber_id) => {
    return $api.post("http://localhost:5000/user-action/unsubscribe", {
      channel_id: channel_id,
      subscriber_id: subscriber_id,
    });
  };

  static addWatchLater = async (video_id, user_id) => {
    return $api.post("http://localhost:5000/user-action/add-watch-later", {
      video_id: video_id,
      user_id: user_id,
    });
  };

  static deleteWatchLater = async (video_id, user_id) => {
    return $api.post("http://localhost:5000/user-action/delete-watch-later", {
      video_id: video_id,
      user_id: user_id,
    });
  };
}
