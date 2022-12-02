import React from "react";
import ProfilePicture from "../UI/ProfilePicture/ProfilePicture";
import styles from "./Comment.module.css";
import img from "./../../imgs/cross.png";

const Comment = (props) => {
  return (
    <div className={styles.comment}>
      <ProfilePicture
        src={props.user_profile}
        alt="profile_img"
        width="40"
        height="40"
      />
      <div className={styles.comment_content}>
        <div>
          <p className={styles.comment_create_desc}>{props.user_name}</p>
          <p className={styles.comment_create_desc}>{props.comment_time}</p>
        </div>
        <p className={styles.comment_text}>{props.comment_text}</p>
      </div>
    </div>
  );
};

export default Comment;
