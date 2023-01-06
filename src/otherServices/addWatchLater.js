import userActions from "../userActions/userActions";

const addWatchLater = async (video_id, user_id) => {
  const result = await userActions.addWatchLater(video_id, user_id);
  return result;
};

export default addWatchLater;
