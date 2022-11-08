import React from "react";
import styles from "./ProfilePicture.module.css";

const ProfilePicture = (props) => {
  return (
    <img
      className={styles.profile_picture}
      //   src="https://i.pinimg.com/564x/ee/58/3a/ee583a70bb1030f65578a7dba1ff90e0.jpg"
      //   alt="profile_img"
      //   width="100"
      //   height="100"
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  );
};

export default ProfilePicture;
