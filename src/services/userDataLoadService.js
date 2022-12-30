import $api from "./../http/index";

export default class UserDataLoadService {
  static getSub = async (channel_id, subscriber_id) => {
    return $api.post("http://localhost:5000/users-data-load/get-sub", {
      channel_id: channel_id,
      subscriber_id: subscriber_id,
    });
  };
}
