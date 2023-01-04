import React from "react";
import { ChannelSubscribeList } from "../../components/UI/ChannelSubscribeList/ChannelSubscribeList";
import { ChannelSubscribe } from "../../components/UI/ChannelSubscribe/ChannelSubscribe";
import UserDataLoad from "../../userDataLoad/userDataLoad";
import { getLastUrlPart } from "./../../otherServices/getLastUrlPart";
import styles from "./UserSubscriptions.module.css";

const UserSubscriptions = () => {
  const [subsChannels, setSubsChannels] = React.useState([]);
  const [isSubsLoading, setIsSubsLoading] = React.useState(true);
  React.useEffect(() => {
    const getSubs = async () => {
      const subs_channels = await UserDataLoad.getSubsChannels(
        getLastUrlPart(window.location.href)
      );
      console.log(subs_channels.data);
      setSubsChannels(subs_channels.data);
      setIsSubsLoading(false);
    };
    getSubs();
  }, []);
  return (
    <div className={styles.channel_subscriptions}>
      <ChannelSubscribeList list={subsChannels} />
    </div>
  );
};

export default UserSubscriptions;
