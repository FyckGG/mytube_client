import $api from "../http";

export default class UserActionService {
  static uploadVideo = async (uploading_video) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-action/upload-video`,
      uploading_video,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  static sendComment = async (video, user, text) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-action/send-comment`,
      {
        video_id: video,
        user_id: user,
        text: text,
      }
    );
  };

  static deleteComment = async (comment) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-action/delete-comment`,
      {
        comment_id: comment,
      }
    );
  };

  static subscribe = async (channel_id, subscriber_id) => {
    return $api.post(`${process.env.REACT_APP_API_URL}/user-action/subscribe`, {
      channel_id: channel_id,
      subscriber_id: subscriber_id,
    });
  };

  static unsubscribe = async (channel_id, subscriber_id) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-action/unsubscribe`,
      {
        channel_id: channel_id,
        subscriber_id: subscriber_id,
      }
    );
  };

  static addWatchLater = async (video_id, user_id) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-action/add-watch-later`,
      {
        video_id: video_id,
        user_id: user_id,
      }
    );
  };

  static deleteWatchLater = async (video_id, user_id) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-action/delete-watch-later`,
      {
        video_id: video_id,
        user_id: user_id,
      }
    );
  };

  static editVideo = async (
    user_id,
    video_id,
    video_name,
    video_description,
    video_access
  ) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-action/edit-video`,
      {
        user: user_id,
        video_id: video_id,
        video_name: video_name,
        video_description: video_description,
        video_access: video_access,
      }
    );
  };

  static editTags = async (user_id, video_id, tags, hash_tags) => {
    return $api.post(`${process.env.REACT_APP_API_URL}/user-action/edit-tags`, {
      user_id: user_id,
      video_id: video_id,
      tags: tags,
      hash_tags: hash_tags,
    });
  };

  static deleteVideo = async (video_id) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-action/delete-video`,
      {
        video_id: video_id,
      }
    );
  };

  static sendComplaint = async (
    complaint_source,
    complaint_target,
    complaint_text
  ) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-action/send-complaint`,
      {
        complaint_source: complaint_source,
        complaint_target: complaint_target,
        complaint_text: complaint_text,
      }
    );
  };

  static sendVideoComplaint = async (
    complaint_source,
    complaint_target,
    complaint_text
  ) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-action/send-video-complaint`,
      {
        complaint_source: complaint_source,
        complaint_target: complaint_target,
        complaint_text: complaint_text,
      }
    );
  };
}
