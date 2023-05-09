import React from "react";
import { EditProfileForm } from "../../components/EditProfileForm/EditProfileForm";
import { Context } from "../..";
import axios from "axios";
import styles from "./EditProfilePage.module.css";
import { getLastUrlPart } from "../../otherServices/getLastUrlPart";

import load_photo from "./../../imgs/load_photo.jpg";

export const EditProfilePage = () => {
  const store = React.useContext(Context);
  const [isUserLoading, setIsUserLoading] = React.useState(store.isLoading);
  const [isLoading, setIsLoading] = React.useState(true);
  const [profileImg, setProfileImg] = React.useState(load_photo);
  const [channelDescription, setChannelDescription] = React.useState("");

  React.useEffect(() => {
    const getInfoForEdit = async () => {
      if (isUserLoading == false) {
        const url = window.location.href;
        const final = getLastUrlPart(url);
        const default_img = await axios.post(
          `${process.env.REACT_APP_API_URL}/users-data-load/get-avatar`,
          {
            id: final,
          }
        );
        const default_description = await axios.post(
          `${process.env.REACT_APP_API_URL}/users-data-load/get-channel-description`,
          { user_id: final }
        );
        if (default_img.data)
          setProfileImg(
            `${process.env.REACT_APP_API_URL}${default_img.data.avatar_dir}${default_img.data.avatar_name}`
          );
        if (default_description.data)
          setChannelDescription(default_description.data.description);
        setIsLoading(false);
      }
      //setIsUserLoading(store.isLoading);
      setTimeout(() => {
        setIsUserLoading(store.isLoading);
      }, 3000);
    };

    getInfoForEdit();
  }, [isUserLoading]);

  return (
    <div className={styles.edit_video_page}>
      <EditProfileForm
        is_loading={isLoading}
        default_profile={profileImg}
        default_description={channelDescription}
      />
    </div>
  );
};
