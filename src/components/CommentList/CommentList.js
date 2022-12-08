import React from "react";
import Comment from "../Comment/Comment";
import styles from "./CommentList.module.css";
import timeAgo from "./../../otherServices/timeAgo";

const CommentList = (props) => {
  return (
    <div>
      {props.comment_list.map((comment) => (
        <div className={styles.comment}>
          <Comment
            user_name={comment.user_name}
            comment_text={comment.comment_text}
            user_profile={`http://localhost:5000${comment.user_avatar}`}
            comment_time={timeAgo(comment.comment_date)}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
