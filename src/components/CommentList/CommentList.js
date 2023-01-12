import React from "react";
import Comment from "../Comment/Comment";
import styles from "./CommentList.module.css";
import timeAgo from "./../../otherServices/timeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const CommentList = observer((props) => {
  const store = React.useContext(Context);

  const deleteComment = async (id) => {
    props.on_delete_icon_click(id);
  };
  console.log(props.comment_list);
  return (
    <div>
      {props.comment_list.map((comment) => (
        <div className={styles.comment}>
          <div className={styles.comment_content}>
            <Comment
              user_id={comment.user_id}
              user_name={comment.user_name}
              comment_text={comment.comment_text}
              user_profile={`http://localhost:5000${comment.user_avatar}`}
              comment_time={timeAgo(comment.comment_date)}
            />
          </div>
          {comment.user_id === store.user.id ? (
            <div
              className={styles.delete_icon}
              onClick={() => deleteComment(comment.comment_id)}
            >
              <FontAwesomeIcon
                className={styles.font_delete}
                icon={faTrash}
                size="lg"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
});

export default CommentList;
