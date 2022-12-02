import React from "react";
import Comment from "../Comment/Comment";
import styles from "./CommentList.module.css";

const CommentList = () => {
  return (
    <div>
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default CommentList;
