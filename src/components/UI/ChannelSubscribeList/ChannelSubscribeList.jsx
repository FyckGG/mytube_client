import React from "react";
import { ChannelSubscribe } from "../ChannelSubscribe/ChannelSubscribe";
import styles from "./ChannelSubscribeList.module.css";

export const ChannelSubscribeList = ({ list }) => {
  const arr = [1, 1, 1, 11, 1, , 1, 1, 1];
  return (
    <div className={styles.subscribe_list}>
      {list.map((item, index) => (
        <div className={styles.channel_subscribe} key={index}>
          <ChannelSubscribe
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
