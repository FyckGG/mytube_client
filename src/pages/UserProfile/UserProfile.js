import React from "react";
import { useState, useEffect, useContext } from "react";
import ProfilePicture from "../../components/UI/ProfilePicture/ProfilePicture";
import styles from "./UserProfile.module.css";
import Main_Button from "../../components/UI/main_button/Main_Button";
import ToggleTabs from "../../components/ToggleTabs/ToggleTabs";
import ChannelInformation from "../../components/ChannelInformation/ChannelInformation";
import UserProfileMainPage from "../UserProfileMainPage/UserProfileMainPage";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import userActions from "../../userActions/userActions";
import UserDataLoad from "../../userDataLoad/userDataLoad";
import SubscribeButton from "../../components/UI/SubscribeButton/SubscribeButton";
import { Donut_2 } from "../../components/UI/Donut_2/Donut_2";
import axios from "axios";

import load_photo from "./../../imgs/load_photo.jpg";
import { getLastUrlPart } from "../../otherServices/getLastUrlPart";
import UserVideos from "../../components/UserVideos/UserVideos";

const UserProfile = observer((props) => {
  const store = useContext(Context);

  const [avatar, setAvatar] = useState("");
  const [userId, setUserId] = useState("");
  const [user_name, setUserName] = useState("");
  const [user_videos, setUserVideos] = useState([]);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [videosLoading, setVideosLoading] = useState(false);
  const [countSubs, setCountSubs] = useState(0);
  const [isSubs, setIsSubs] = useState("");
  const [isSubsInfoLoad, setIsSubInfoLoad] = useState(false);
  const [countViews, setCountViews] = useState("");
  const [signDate, setSignDate] = useState("");

  const handleCountSubsChange = (e) => {
    if (e) setCountSubs(countSubs + 1);
    else setCountSubs(countSubs - 1);
  };

  const handleSubsStatusChange = (e) => {
    setIsSubs(e);
  };

  // const subscribe_click = async () => {
  //   if (isSubs) {
  //     const unsub_result = await userActions.Unsubscribe(userId, store.user.id);
  //     setCountSubs(countSubs - 1);
  //     setIsSubs(false);
  //     console.log("otpiska");
  //   } else {
  //     const sub_result = await userActions.Subscribe(userId, store.user.id);
  //     setCountSubs(countSubs + 1);
  //     setIsSubs(true);
  //     console.log("podpiska");
  //   }
  // };

  useEffect(() => {
    const url = window.location.href;
    //const final = url.substring(url.lastIndexOf("/") + 1);
    const final = getLastUrlPart(url);
    setUserId(final);
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
      setUserName(user_result.data.login);
      const avatar_result = await axios.post(
        "http://localhost:5000/users-data-load/get-avatar",
        {
          id: final,
        }
      );
      setAvatar(
        `http://localhost:5000${avatar_result.data.avatar_dir}${avatar_result.data.avatar_name}`
      );
      setAvatarLoading(false);
      console.log(store.user.id);
      const user_videos_result = await axios.post(
        "http://localhost:5000/users-data-load/get-user-videos",
        {
          //user_id: final,
          channel_id: final,
          user_id: store.user.id,
        }
      );
      const user_stats = await axios.post(
        "http://localhost:5000/users-data-load/get-user-stats",

        { user_id: final }
      );

      if (!props.is_my_profile && store.user.id) {
        const is_subs_result = await UserDataLoad.getSubs(final, store.user.id);

        setIsSubs(is_subs_result.data);
      }

      setCountSubs(user_stats.data.count_of_subs);
      setCountViews(user_stats.data.count_of_views);
      setUserVideos(user_videos_result.data);
      // console.log(user_videos_result.data);
      setSignDate(user_result.data.sign_date);
      setIsSubInfoLoad(true);
      setVideosLoading(false);
    };
    getUserData();
  }, []);

  const tab_items = [
    {
      tabname: "Главная",
      tab_id: 0,
      tab_content: (
        <UserProfileMainPage videos={user_videos} is_loading={videosLoading} />
      ),
    },
    {
      tabname: "Видео",
      tab_id: 1,
      tab_content: (
        <UserVideos
          is_load={props.is_my_profile}
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
      tab_content: (
        <ChannelInformation reg_date={signDate} count_views={countViews} />
      ),
    },
  ];
  return (
    <div className={styles.profile}>
      {store.isLoading ? (
        <Donut_2 />
      ) : (
        <>
          <div>
            <h1 className={styles.user_name}>{user_name} </h1>
            {isSubsInfoLoad ? (
              <div className={styles.subs_panel}>
                <h2 className={styles.subs_count}> {countSubs} подпищ.</h2>
                {props.is_my_profile || !store.user.id ? (
                  <></>
                ) : (
                  <SubscribeButton
                    is_subs={isSubs}
                    channel={userId}
                    subscriber={store.user.id}
                    count_subs_change={handleCountSubsChange}
                    subs_status_change={handleSubsStatusChange}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
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
