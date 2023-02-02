import $api from "./../http/index";

export default class UserDataLoadService {
  static getSub = async (channel_id, subscriber_id) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/users-data-load/get-sub`,
      {
        channel_id: channel_id,
        subscriber_id: subscriber_id,
      }
    );
  };

  static getLikedVideos = async (user_id) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/users-data-load/get-liked-videos`,
      {
        user_id: user_id,
      }
    );
  };

  static getSubsChannels = async (user_id) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/users-data-load/get-subs-channels`,
      {
        user_id: user_id,
      }
    );
  };

  static getWatchLaterVideos = async (user_id, current_page) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/users-data-load/get-watch-later-videos`,
      {
        user_id: user_id,
        current_page: current_page,
      }
    );
  };

  static getUserHistoryVideos = async (user_id, current_page) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/users-data-load/get-user-history-videos`,
      { user_id: user_id, current_page: current_page }
    );
  };
}
