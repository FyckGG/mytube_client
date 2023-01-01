import React from "react";
import styles from "./WatchVideo.module.css";
import ReactPlayer from "react-player/lazy";
import { Context } from "../..";
import { useSearchParams } from "react-router-dom";
import ProfilePicture from "../../components/UI/ProfilePicture/ProfilePicture";
import Main_Button from "../../components/UI/main_button/Main_Button";
import LikeDislikePanel from "../../components/LikeDislikePanel/LikeDislikePanel";
import axios from "axios";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import isVideoWatching from "../../otherServices/isVideoWatching";
import VideoStatsService from "../../services/videoStatsService";
import CommentList from "../../components/CommentList/CommentList";
import Donut from "../../components/UI/Donut/Donut";
import PostCommentForm from "../../components/PostCommentForm/PostCommentForm";
import SubscribeButton from "../../components/UI/SubscribeButton/SubscribeButton";
import userActions from "../../userActions/userActions";
import convertCount from "./../../otherServices/ConvertCount";

const WatchVideo = observer(() => {
  const store = React.useContext(Context);
  const [videoPath, setVideoPath] = React.useState("");
  const [videoName, setVideoName] = React.useState("");
  const [videoDescription, setVideoDescription] = React.useState("");
  const [videoSubject, setVideoSubject] = React.useState("");
  const [channelAvatar, setChannelAvatar] = React.useState("");
  const [channelName, setChannelName] = React.useState("");
  const [countLike, setCountLike] = React.useState("");
  const [countDislike, setCountDislike] = React.useState("");
  const [countSubs, setCountSubs] = React.useState("");
  const [countViews, setCountViews] = React.useState("");
  const [countComments, setCountComments] = React.useState("");
  const [commentList, setCommentList] = React.useState([]);
  const [commentRenderCount, setCommentRenderCount] = React.useState(0);

  const [isSubs, setIsSubs] = React.useState(false);
  const [channelId, setChannelId] = React.useState("");

  const [isCommentsLoading, setIsCommentsLoading] = React.useState(false);
  const [hasMoreComments, setHasMoreComments] = React.useState(true);
  const [isCommentsLoad, setIsCommentsLoad] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLoading, setPageLoading] = React.useState(false);
  const [isPlay, setIsPlay] = React.useState(false);
  const [isWatch, setIsWatch] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [second, setSecond] = React.useState(0);
  const [isLike, setIsLike] = React.useState(false);
  const [isDislike, setIsDislike] = React.useState(false);
  const [commentForm, setCommentForm] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");

  const handleLikeChange = async () => {
    if (isLike) {
      const delete_like = await VideoStatsService.deleteMark(
        searchParams.get("v"),
        store.user.id,
        true
      );
      setCountLike(countLike - 1);
    } else {
      if (isDislike) {
        const delete_dislike = await VideoStatsService.deleteMark(
          searchParams.get("v"),
          store.user.id,
          false
        );
        setIsDislike(!isDislike);
        setCountDislike(countDislike - 1);
      }
      const add_like = await VideoStatsService.addMark(
        searchParams.get("v"),
        store.user.id,
        true
      );
      setCountLike(countLike + 1);
    }
    setIsLike(!isLike);
  };

  const handleDislikeChange = async () => {
    if (isDislike) {
      const delete_dislike = await VideoStatsService.deleteMark(
        searchParams.get("v"),
        store.user.id,
        false
      );
      setCountDislike(countDislike - 1);
    } else {
      if (isLike) {
        const delete_like = await VideoStatsService.deleteMark(
          searchParams.get("v"),
          store.user.id,
          true
        );
        setIsLike(!isLike);
        setCountLike(countLike - 1);
      }
      const add_dislike = await VideoStatsService.addMark(
        searchParams.get("v"),
        store.user.id,
        false
      );
      setCountDislike(countDislike + 1);
    }
    setIsDislike(!isDislike);
  };

  const handlePlay = () => {
    setIsPlay(true);
  };

  const handlePause = () => {
    setIsPlay(false);
  };

  const handleDuration = (duration) => {
    setDuration(Math.ceil(duration));
  };

  const sendComment = async () => {
    const new_comment = await userActions.sendComment(
      searchParams.get("v"),

      store.user.id,
      commentText
    );
    console.log(new_comment);
    setCommentForm(false);

    setCommentList([new_comment.data, ...commentList]);
    setCountComments(countComments + 1);
    setCommentText("");
  };

  const getCommentList = async () => {
    if (isCommentsLoading) return;
    setIsCommentsLoading(true);
    if (commentRenderCount >= countComments && isCommentsLoad) {
      setHasMoreComments(false);
      return;
    }
    setCommentRenderCount(commentRenderCount + 10);
    const comment_list = await axios.post(
      "http://localhost:5000/data-load/get-comments",
      {
        video_id: searchParams.get("v"),
        comment_count: commentRenderCount + 10,
      }
    );
    console.log(comment_list.data);
    setCountComments(comment_list.data.comments_count);
    if (comment_list.data.comments_count === 0) {
      setHasMoreComments(false);
    }
    setCommentList(commentList.concat(comment_list.data.comment_list));
    setIsCommentsLoad(true);
    setIsCommentsLoading(false);
  };

  const handleCountSubsChange = (e) => {
    if (e) setCountSubs(countSubs + 1);
    else setCountSubs(countSubs - 1);
  };

  const handleSubsStatusChange = (e) => {
    setIsSubs(e);
  };

  React.useEffect(() => {
    let timer = null;
    if (isPlay && !isWatch) {
      timer = setInterval(() => {
        setSecond((second) => second + 1);
        console.log(second);
        if (isVideoWatching(duration, second)) {
          setIsWatch(true);
          VideoStatsService.addView(searchParams.get("v"));
        }
      }, 1000);
    } else if (!isPlay && second !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlay, second]);

  React.useEffect(() => {
    const getVideo = async () => {
      setPageLoading(true);
      const video = await axios.post(
        "http://localhost:5000/user-action/load-watch-video",
        {
          video_id: searchParams.get("v"),
          user_id: store.user.id,
        }
      );

      setVideoPath(video.data.video.video_directory);
      setVideoName(video.data.video.video_name);
      setVideoDescription(video.data.video.video_description);
      setVideoSubject(video.data.video.video_subject);
      setChannelAvatar(video.data.channel_avatar);
      setChannelName(video.data.channel_name);
      setCountLike(video.data.count_likes);
      setCountDislike(video.data.count_dislikes);
      setCountSubs(video.data.count_subs);
      setCountViews(video.data.count_views);
      if (video.data.video_mark === true) setIsLike(true);
      else if (video.data.video_mark === false) setIsDislike(true);
      setPageLoading(false);
    };
    getVideo();
  }, []);

  React.useEffect(() => {
    const getSubStatus = async () => {
      const channel_status = await axios.post(
        "http://localhost:5000/users-data-load/get-channel-status",
        {
          user_id: store.user.id,
          video_id: searchParams.get("v"),
        }
      );
      console.log(channel_status);
      setIsSubs(channel_status.data.subs_status);
      setChannelId(channel_status.data.channel);
    };
    getSubStatus();
  }, []);

  return (
    <div>
      <div className={styles.video_player}>
        <ReactPlayer
          url={`http://localhost:5000${videoPath}`}
          controls
          width="100%"
          height="70vh"
          style={{
            display: "inline-block",
            marginTop: "20px",
          }}
          onDuration={handleDuration}
          onPlay={handlePlay}
          onPause={handlePause}
        />
      </div>
      {pageLoading ? (
        <div></div>
      ) : (
        <>
          <div
            style={{
              borderBottom: "4px solid #d9d9d9",
              paddingBottom: "10px",
            }}
          >
            <h1 className={styles.video_name}>{videoName}</h1>
            <div className={styles.video_stat}>
              <h2 className={styles.views_count}>
                Количество просмотров: {convertCount(countViews)}
              </h2>
              <div className={styles.like_dislike_panel}>
                <LikeDislikePanel
                  likes={convertCount(countLike)}
                  dislikes={convertCount(countDislike)}
                  is_like_active={isLike}
                  is_dislike_active={isDislike}
                  onLike={handleLikeChange}
                  onDislike={handleDislikeChange}
                />
              </div>
            </div>

            <div className={styles.channel_picture}>
              <ProfilePicture
                src={`http://localhost:5000${channelAvatar}`}
                alt="profile_img"
                width="60"
                height="60"
              />
            </div>
            <div className={styles.channel_info}>
              <h3 className={styles.channel_name}>{channelName}</h3>
              <p className={styles.count_subs}>
                {pageLoading ? "" : `${countSubs} subs.`}
              </p>
            </div>
            {store.user.login == channelName ||
            pageLoading ||
            localStorage.getItem("token") == null ? (
              <></>
            ) : (
              <div className={styles.subscribe_button}>
                <SubscribeButton
                  is_subs={isSubs}
                  channel={channelId}
                  subscriber={store.user.id}
                  count_subs_change={handleCountSubsChange}
                  subs_status_change={handleSubsStatusChange}
                />
              </div>
            )}
          </div>
          <div className={styles.video_description}>
            <h3>Описание видео:</h3>
            <p>{videoDescription}</p>
            <h3 style={{ marginTop: "5px" }}>Категория: {videoSubject}</h3>
          </div>
          <div>
            <h2
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                marginRight: "5px",
                color: "#d9d9d9",
                padding: "2px",
                display: "inline",
              }}
            >
              Комментарии: {countComments}
            </h2>
            {localStorage.getItem("token") == null ? (
              <></>
            ) : (
              <Main_Button button_action={() => setCommentForm(true)}>
                Оставить комментарий
              </Main_Button>
            )}
            {commentForm ? (
              <div className={styles.comment_form}>
                <PostCommentForm
                  on_comment={(e) => {
                    setCommentText(e);
                  }}
                  on_send={sendComment}
                  on_cancel={() => {
                    setCommentForm(false);
                    setCommentText("");
                  }}
                />
              </div>
            ) : (
              <></>
            )}
            {pageLoading ? (
              <></>
            ) : (
              <div>
                <CommentList comment_list={commentList} />
                <InfiniteScroll
                  dataLength={commentList.length}
                  next={getCommentList}
                  hasMore={hasMoreComments}
                  style={{ marginTop: 20 }}
                  loader={
                    <div className={styles.donut_panel}>
                      <Donut
                        donut_name_size={"15px"}
                        donut_color={"#f3f47b"}
                        donut_size={"40px"}
                      />
                    </div>
                  }
                ></InfiniteScroll>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default WatchVideo;
