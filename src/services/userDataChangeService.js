import $api from "../http";

export default class UserDataChangeService {
  static change_avatar = async (new_avatar) => {
    return $api.post(
      "http://localhost:5000/user-data-change/change-avatar",
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
      "http://localhost:5000/user-data-change/change-channel-description",
      {
        user_id: user_id,
        text: text,
      }
    );
  };
}