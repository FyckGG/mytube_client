import React from "react";
import Comment from "../Comment/Comment";
import styles from "./CommentList.module.css";
import timeAgo from "./../../otherServices/timeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./comment_animation.css";

const CommentList = observer((props) => {
  const store = React.useContext(Context);

  const deleteComment = async (id) => {
    props.on_delete_icon_click(id);
  };
  const comments_with_ref = [];
  props.comment_list.map((comment) => {
    comment = { ...comment, nodeRef: React.createRef(null) };
    comments_with_ref.push(comment);
  });
  return (
    <div>
      <TransitionGroup className={"todo-list"}>
        {comments_with_ref.map((comment) => (
          <CSSTransition
            key={comment.comment_id}
            nodeRef={comment.nodeRef}
            timeout={500}
            classNames="item"
          >
            <div className={styles.comment} ref={comment.nodeRef}>
              <div className={styles.comment_content}>
                <Comment
                  user_id={comment.user_id}
                  user_name={comment.user_name}
                  comment_text={comment.comment_text}
                  user_profile={`${process.env.REACT_APP_API_URL}${comment.user_avatar}`}
                  comment_time={timeAgo(comment.comment_date)}
                />
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
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
});

export default CommentList;
