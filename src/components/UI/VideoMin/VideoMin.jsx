import React from "react";
import VideoPreview from "../VideoPreview/VideoPreview";
import styles from "./VideoMin.module.css";
import convertCount from "./../../../otherServices/ConvertCount";
import convertTime from "./../../../otherServices/convertVideoTime";
import timeAgo from "./../../../otherServices/timeAgo";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Tooltip from "../Tooltip/Tooltip";
import { Link } from "react-router-dom";
import ChannelLink from "../ChannelLink/ChannelLink";
import { VerticalDots } from "../VerticalDots/VerticalDots";
import addWatchLater from "../../../otherServices/addWatchLater";
import deleteWatchLater from "../../../otherServices/deleteWatchLater";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";

const VideoMin = observer((props) => {
  const [isWatchLater, setIsWatchLater] = React.useState(props.is_watch_later);
  const store = React.useContext(Context);
  const dotsList = [
    {
      name: "Смотреть позже",
      action: async () => {
        await addWatchLater(props.video_id, store.user.id);
        setIsWatchLater(!isWatchLater);
      },
    },
  ];
  const dotsList_2 = [
    {
      name: "Удалить из 'Смотреть позже'",
      action: async () => {
        await deleteWatchLater(props.video_id, store.user.id);
        setIsWatchLater(!isWatchLater);
      },
    },
  ];
  return (
    <div className={styles.video_min}>
      <div className={styles.dots}>
        {isWatchLater == undefined ? (
          <></>
        ) : (
          <>
            {isWatchLater ? (
              <VerticalDots content={dotsList_2} />
            ) : (
              <VerticalDots content={dotsList} />
            )}
          </>
        )}
      </div>
      <div>
        <VideoPreview
          src={`http://localhost:5000${props.preview}`}
          width="200"
        />
      </div>
      <div className={styles.video_info}>
        <ChannelLink
          user_id={store.user.id}
          channel_id={props.channel}
          style={{ height: "40%" }}
        >
          <ProfilePicture
            src={`http://localhost:5000${props.channel_icon}`}
            alt="profile_img"
            width="40"
            height="40"
          />
        </ChannelLink>
        <div className={styles.video_stats}>
          <Tooltip text={props.name}>
            <h2 className={styles.video_name}>{props.name}</h2>
          </Tooltip>

          <ChannelLink
            user_id={store.user.id}
            channel_id={props.channel}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <h4 className={styles.channel_name}>{props.channel_name}</h4>
          </ChannelLink>
          <p className={styles.views}>{convertCount(props.views)} просм.</p>
          <p className={styles.video_time}>{convertTime(props.duration)}</p>
          <p>{timeAgo(props.date)}</p>
        </div>
      </div>
    </div>
  );
});

export default VideoMin;
