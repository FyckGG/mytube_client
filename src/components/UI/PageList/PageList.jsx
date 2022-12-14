import React from "react";
import PageButton from "../PageButton/PageButton";

const PageList = (props) => {
  const buttons = [];
  for (let i = 1; i < props.buttons_count; i++) {
    buttons.push(<PageButton number={i} />);
  }
  return <div>{buttons}</div>;
};

export default PageList;
