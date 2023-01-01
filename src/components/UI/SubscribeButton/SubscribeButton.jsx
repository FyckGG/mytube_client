import React from "react";
import Main_Button from "../main_button/Main_Button";
import userActions from "../../../userActions/userActions";

const SubscribeButton = (props) => {
  const subscribe_click = async () => {
    if (props.is_subs) {
      const unsub_result = await userActions.Unsubscribe(
        props.channel,
        props.subscriber
      );
      props.count_subs_change(false);
      props.subs_status_change(false);
    } else {
      const sub_result = await userActions.Subscribe(
        props.channel,
        props.subscriber
      );
      props.count_subs_change(true);
      props.subs_status_change(true);
    }
  };
  return (
    <Main_Button button_action={subscribe_click} is_pressed={props.is_subs}>
      {props.is_subs ? "Вы подписаны" : "Подписаться"}
    </Main_Button>
  );
};

export default SubscribeButton;
