import React from "react";
import { ChannelSubscribeList } from "../../components/UI/ChannelSubscribeList/ChannelSubscribeList";
import { ChannelSubscribe } from "../../components/UI/ChannelSubscribe/ChannelSubscribe";
import UserDataLoad from "../../userDataLoad/userDataLoad";
import { Donut_2 } from "../../components/UI/Donut_2/Donut_2";
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
      setSubsChannels(subs_channels.data);
      setIsSubsLoading(false);
    };
    getSubs();
  }, []);
  return (
    <div className={styles.channel_subscriptions}>
      {isSubsLoading ? (
        <Donut_2 />
      ) : subsChannels.length !== 0 ? (
        <ChannelSubscribeList list={subsChannels} />
      ) : (
        <h1>Нет подписок</h1>
      )}
    </div>
  );
};

export default UserSubscriptions;
