import React from "react";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import ChannelLink from "../ChannelLink/ChannelLink";
import styles from "./ChannelSubscribe.module.css";

export const ChannelSubscribe = (props) => {
  return (
    <ChannelLink user_id={props.user_id} channel_id={props.channel_id}>
      <div className={styles.channel_subscribe}>
        <ProfilePicture
          src={`${process.env.REACT_APP_API_URL}${props.avatar}`}
          alt="profile_img"
          width="90"
          height="100"
        />
        <div className={styles.channel_info}>
          <div>{props.name}</div>
          <div>{props.count_subs} subs</div>
        </div>
      </div>
    </ChannelLink>
  );
};
