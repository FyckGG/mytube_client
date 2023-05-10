import React from "react";
import { useState, useEffect, useContext } from "react";
import ProfilePicture from "../../components/UI/ProfilePicture/ProfilePicture";
import styles from "./UserProfile.module.css";
import ToggleTabs from "../../components/ToggleTabs/ToggleTabs";
import ChannelInformation from "../../components/ChannelInformation/ChannelInformation";
import UserProfileMainPage from "../UserProfileMainPage/UserProfileMainPage";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import UserDataLoad from "../../userDataLoad/userDataLoad";
import SubscribeButton from "../../components/UI/SubscribeButton/SubscribeButton";
import ComplaintButton from "components/UI/ComplaintButton/ComplaintButton";
import ComplaintForm from "components/ComplaintForm/ComplaintForm";
import EditProfileButton from "../../components/UI/EditProfileButton/EditProfileButton";
import { Donut_2 } from "../../components/UI/Donut_2/Donut_2";
import { Link } from "react-router-dom";
import axios from "axios";

import load_photo from "./../../imgs/load_photo.jpg";
import { getLastUrlPart } from "../../otherServices/getLastUrlPart";
import UserVideos from "../../components/Uservideos/UserVideos.jsx";

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
  const [channelDesciption, setChannelDescription] = useState(""); ///////////////////

  const [complaintForm, setComplaintForm] = useState(false);

  const handleCountSubsChange = (e) => {
    if (e) setCountSubs(countSubs + 1);
    else setCountSubs(countSubs - 1);
  };

  const handleSubsStatusChange = (e) => {
    setIsSubs(e);
  };

  const handleComplaintFormStatusChange = () => {
    setComplaintForm(!complaintForm);
  };

  const hideForm = () => {
    setComplaintForm(false);
  };

  useEffect(() => {
    const url = window.location.href;
    const final = getLastUrlPart(url);
    setUserId(final);
    const getUserData = async () => {
      setAvatarLoading(true);
      setVideosLoading(true);
      await store.checkAuth();
      const user_result = await axios
        .post(`${process.env.REACT_APP_API_URL}/users-data-load/get-user`, {
          user_id: final,
        })
        .catch(function (error) {
          if (error.response.status == 404);
          alert("Пользователь недоступен");
        });

      if (user_result.data) setUserName(user_result.data.login);

      const avatar_result = await axios.post(
        `${process.env.REACT_APP_API_URL}/users-data-load/get-avatar`,
        {
          id: final,
        }
      );
      if (avatar_result.data) {
        setAvatar(
          `${process.env.REACT_APP_API_URL}${avatar_result.data.avatar_dir}${avatar_result.data.avatar_name}`
        );
        setAvatarLoading(false);
      }

      const user_videos_result = await axios.post(
        `${process.env.REACT_APP_API_URL}/users-data-load/get-user-videos`,
        {
          channel_id: final,
          user_id: store.user.id,
        }
      );
      const user_stats = await axios.post(
        `${process.env.REACT_APP_API_URL}/users-data-load/get-user-stats`,

        { user_id: final }
      );

      if (!props.is_my_profile && store.user.id) {
        const is_subs_result = await UserDataLoad.getSubs(final, store.user.id);

        setIsSubs(is_subs_result.data);
      }

      const user_description = await axios.post(
        `${process.env.REACT_APP_API_URL}/users-data-load/get-channel-description`,
        { user_id: final }
      );

      if (user_stats.data) {
        setCountSubs(user_stats.data.count_of_subs);
        setCountViews(user_stats.data.count_of_views);
      }
      setUserVideos(user_videos_result.data);

      if (user_result.data) setSignDate(user_result.data.sign_date);

      if (user_description.data)
        setChannelDescription(user_description.data.description);

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
          can_change={props.is_my_profile}
          videos={user_videos}
          is_activated={store.user.isActivated}
          is_loading={videosLoading}
          user_id={store.user.id}
        />
      ),
    },

    {
      tabname: "Обо мне",
      tab_id: 2,
      tab_content: (
        <ChannelInformation
          reg_date={signDate}
          count_views={countViews}
          channel_description={channelDesciption}
        />
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
            {props.is_my_profile && store.user.id ? (
              <Link to={`/edit_profile/${store.user.id}`}>
                <EditProfileButton />
              </Link>
            ) : (
              <></>
            )}

            {isSubsInfoLoad ? (
              <div className={styles.subs_panel}>
                <h2 className={styles.subs_count}> {countSubs} подпищ.</h2>
                {props.is_my_profile || !store.user.id ? (
                  <></>
                ) : (
                  <div className={styles.user_interactions}>
                    <SubscribeButton
                      is_subs={isSubs}
                      channel={userId}
                      subscriber={store.user.id}
                      count_subs_change={handleCountSubsChange}
                      subs_status_change={handleSubsStatusChange}
                    />
                    <div
                      className={styles.complaint_button}
                      onClick={handleComplaintFormStatusChange}
                    >
                      <ComplaintButton />
                    </div>
                    <ComplaintForm
                      hide_form={hideForm}
                      user_id={store.user.id}
                      target_id={userId}
                      target_type={"user"}
                      modal_active={complaintForm}
                      set_modal_active={setComplaintForm}
                    />
                  </div>
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
