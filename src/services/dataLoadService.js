import $api from "../http";

export default class DataLoadService {
  static get_subscribtion_videos = async (user_id, current_page) => {
    return $api.post(
      `${process.env.REACT_APP_API_URL}/data-load/get-subscriptions-videos`,
      { user_id: user_id, current_page: current_page }
    );
  };
}
