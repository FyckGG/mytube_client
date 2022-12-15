import React from "react";
import PageButton from "../PageButton/PageButton";
import { observer } from "mobx-react-lite";

const PageList = observer((props) => {
  const buttons = [];
  for (let i = 0; i < props.buttons_count; i++) {
    buttons.push(
      <PageButton
        is_button_active={props.active_button === i}
        number={i + 1}
        on_click={() => {
          props.on_page_change(i);
        }}
      />
    );
  }
  return <div>{buttons}</div>;
});

export default PageList;
