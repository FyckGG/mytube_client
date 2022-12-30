import React from "react";
import { useState, useEffect, useContext } from "react";
import ProfilePicture from "../../components/UI/ProfilePicture/ProfilePicture";
import styles from "./UserProfile.module.css";
import ToggleTabs from "../../components/ToggleTabs/ToggleTabs";
import ChannelInformation from "../../components/ChannelInformation/ChannelInformation";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import axios from "axios";
import load_photo from "./../../imgs/load_photo.jpg";
import UserVideos from "../../components/UserVideos/UserVideos";

const UserProfile = observer((props) => {
  const store = useContext(Context);
  const [avatar, setAvatar] = useState("");
  const [user_name, setUserName] = useState("");
  const [user_videos, setUserVideos] = useState([]);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [videosLoading, setVideosLoading] = useState(false);
  const [countSubs, setCountSubs] = useState(0);
  const [countViews, setCountViews] = useState(0);
  useEffect(() => {
    const url = window.location.href;
    const final = url.substring(url.lastIndexOf("/") + 1);
    //console.log(final);
    const getUserData = async () => {
      setAvatarLoading(true);
      setVideosLoading(true);
      await store.checkAuth();
      const user_result = await axios.post(
        "http://localhost:5000/users-data-load/get-user",
        {
          user_id: final,
        }
      );
      console.log(user_result);
      setUserName(user_result.data.login);
      const avatar_result = await axios.post(
        "http://localhost:5000/users-data-load/get-avatar",
        {
          //id: store.user.id,
          id: final,
        }
      );
      setAvatar(
        `http://localhost:5000${avatar_result.data.avatar_dir}${avatar_result.data.avatar_name}`
      );
      setAvatarLoading(false);
      const user_videos_result = await axios.post(
        "http://localhost:5000/users-data-load/get-user-videos",
        {
          //user_id: store.user.id,
          user_id: final,
        }
      );
      const user_stats = await axios.post(
        "http://localhost:5000/users-data-load/get-user-stats",
        //{ user_id: store.user.id }
        { user_id: final }
      );
      setCountSubs(user_stats.data.count_of_subs);
      setCountViews(user_stats.data.count_of_views);
      setUserVideos(user_videos_result.data);
      setVideosLoading(false);
    };
    getUserData();
  }, []);
  const tab_items = [
    {
      tabname: "Главная",
      tab_id: 0,
      tab_content: <h1>MAIN</h1>,
    },
    {
      tabname: "Видео",
      tab_id: 1,
      tab_content: (
        <UserVideos
          videos={user_videos}
          is_activated={store.user.isActivated}
          is_loading={videosLoading}
          user_id={store.user.id}
        />
      ),
    },
    {
      tabname: "Плейлисты",
      tab_id: 2,
      tab_content: <h1>PLAYLISTS</h1>,
    },
    {
      tabname: "Обо мне",
      tab_id: 3,
      tab_content: <ChannelInformation />,
    },
  ];
  return (
    <div className={styles.profile}>
      {store.isLoading ? (
        <div className={styles.loading}></div>
      ) : (
        <>
          <div>
            <h1 className={styles.user_name}>{user_name}, </h1>
            <h2 className={styles.subs_count}> {countSubs} подпищ.</h2>
          </div>
          <div className={styles.user_picture}>
            <ProfilePicture
              src={avatarLoading ? load_photo : avatar}
              alt="profile_img"
              width="90"
              height="100"
            />
          </div>
          <ToggleTabs tab_items={tab_items} />
        </>
      )}
    </div>
  );
});

export default UserProfile;
