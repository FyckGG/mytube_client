import React from "react";
import { ChannelSubscribe } from "../ChannelSubscribe/ChannelSubscribe";
import styles from "./ChannelSubscribeList.module.css";

export const ChannelSubscribeList = ({ list, user }) => {
  return (
    <div className={styles.subscribe_list}>
      {list.map((item, index) => (
        <div className={styles.channel_subscribe} key={index}>
          <ChannelSubscribe
            user_id={user}
            channel_id={item.channel_id}
            name={item.channel_name}
            avatar={item.channel_avatar}
            count_subs={item.channel_count_of_subs}
          />
        </div>
      ))}
    </div>
  );
};
