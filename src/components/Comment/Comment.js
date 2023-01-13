import React from "react";
import ProfilePicture from "../UI/ProfilePicture/ProfilePicture";
import styles from "./Comment.module.css";
import ChannelLink from "../UI/ChannelLink/ChannelLink";
import { Context } from "../..";

const Comment = (props) => {
  const store = React.useContext(Context);

  return (
    <div className={styles.comment}>
      <ChannelLink
        user_id={store.user.id}
        channel_id={props.user_id}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <ProfilePicture
          src={props.user_profile}
          alt="profile_img"
          width="40"
          height="40"
        />
      </ChannelLink>

      <div className={styles.comment_content}>
        <div>
          <ChannelLink
            user_id={store.user.id}
            channel_id={props.user_id}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <p className={styles.comment_create_desc}>{props.user_name}</p>
          </ChannelLink>

          <p
            className={styles.comment_create_desc}
            style={{ color: "#b4b4b4" }}
          >
            {props.comment_time}
          </p>

          {/* {props.user_id === store.user.id ? (
            <div className={styles.delete_icon} onClick={deleteThisComment}>
              <FontAwesomeIcon
                className={styles.font_delete}
                icon={faTrash}
                size="lg"
              />
            </div>
          ) : (
            <></>
          )} */}
        </div>

        <p className={styles.comment_text}>{props.comment_text}</p>
      </div>
    </div>
  );
};

export default Comment;
