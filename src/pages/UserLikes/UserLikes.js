import React from "react";
import UserDataLoad from "../../userDataLoad/userDataLoad";
import { VIdeoMinList } from "../../components/UI/VideoMinList/VIdeoMinList";
import { getLastUrlPart } from "../../otherServices/getLastUrlPart";
import { Donut_2 } from "../../components/UI/Donut_2/Donut_2";
import styles from "./UserLikes.module.css";

const UserLikes = () => {
  const [likedVideos, setLikedVideos] = React.useState([]);
  const [isVIdeosLoad, setIsVideosLoad] = React.useState(true);
  React.useEffect(() => {
    const getLikedVideos = async () => {
      const user_id = getLastUrlPart(window.location.href);
      const liked_videos = await UserDataLoad.getLikedVIdeos(user_id);
      setLikedVideos(liked_videos.data);
      setIsVideosLoad(false);
    };
    getLikedVideos();
  }, []);
  return (
    <div className={styles.user_likes_page}>
      {isVIdeosLoad ? <Donut_2 /> : <VIdeoMinList videos={likedVideos} />}
    </div>
  );
};

export default UserLikes;
