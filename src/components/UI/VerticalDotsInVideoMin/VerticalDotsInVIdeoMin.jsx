import React from "react";
import { VerticalDots } from "../VerticalDots/VerticalDots";
import { Context } from "../../..";
import addWatchLater from "../../../otherServices/addWatchLater";
import deleteWatchLater from "../../../otherServices/deleteWatchLater";

export const VerticalDotsInVIdeoMin = (props) => {
  const store = React.useContext(Context);
  const [isWatchLater, setIsWatchLater] = React.useState(props.is_watch_later);
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
    <div>
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
  );
};
