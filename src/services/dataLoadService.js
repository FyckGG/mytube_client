import $api from "../http";

export default class DataLoadService {
  static get_subscribtion_videos = async (user_id, current_page) => {
    return $api.post(
      "http://localhost:5000/data-load/get-subscriptions-videos",
      { user_id: user_id, current_page: current_page }
    );
  };
}
