import $api from "../http";

export default class UserDataChangeService {
  static change_avatar = async (new_avatar) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-data-change/change-avatar`,
      new_avatar,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  static change_channel_description = async (user_id, text) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-data-change/change-channel-description`,
      {
        user_id: user_id,
        text: text,
      }
    );
  };

  static add_video_to_history = async (user_id, video_id) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/user-data-change/add-video-to-history`,
      {
        user_id: user_id,
        video_id: video_id,
      }
    );
  };
}
