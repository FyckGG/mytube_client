import React from "react";
import { Link } from "react-router-dom";

const ChannelLink = ({ children, user_id, channel_id, style }) => {
  return (
    <Link
      to={
        user_id == channel_id
          ? `/profile/${channel_id}`
          : `/channel/${channel_id}`
      }
      style={style}
    >
      {children}
    </Link>
  );
};

export default ChannelLink;
