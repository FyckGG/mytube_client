import $api from "./../http/index";

export default class UserDataLoadService {
  static getSub = async (channel_id, subscriber_id) => {
    return $api.post("http://localhost:5000/users-data-load/get-sub", {
      channel_id: channel_id,
      subscriber_id: subscriber_id,
    });
  };

  static getLikedVideos = async (user_id) => {
    return $api.post("http://localhost:5000/users-data-load/get-liked-videos", {
      user_id: user_id,
    });
  };

  static getSubsChannels = async (user_id) => {
    return $api.post(
      "http://localhost:5000/users-data-load/get-subs-channels",
      {
        user_id: user_id,
      }
    );
  };

  static getWatchLaterVideos = async (user_id) => {
    return $api.post(
      "http://localhost:5000/users-data-load/get-watch-later-videos",
      {
        user_id: user_id,
      }
    );
  };
}
