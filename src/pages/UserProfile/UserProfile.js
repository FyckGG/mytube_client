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

const UserProfile = observer((props) => {
  const store = useContext(Context);
  const [avatar, setAvatar] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);
  useEffect(() => {
    const getAvatar = async () => {
      setAvatarLoading(true);
      await store.checkAuth();
      const result = await axios.post(
        "http://localhost:5000/users-data-load/get-avatar",
        {
          id: store.user.id,
        }
      );
      console.log(result);
      setAvatar(
        `http://localhost:5000${result.data.avatar_dir}${result.data.avatar_name}`
      );
      console.log(avatar);
      setAvatarLoading(false);
      //console.log(avatarLoading);
    };
    getAvatar();
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
      tab_content: <h1>VIDEOS</h1>,
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
            <h1 className={styles.user_name}>{store.user.login}, </h1>
            <h2 className={styles.subs_count}>Кол-во подпищиков</h2>
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
