import userActions from "../userActions/userActions";

const deleteWatchLater = async (video_id, user_id) => {
  const result = await userActions.deleteWatchLater(video_id, user_id);
  return result;
};

export default deleteWatchLater;
