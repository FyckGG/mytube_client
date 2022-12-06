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
import PostCommentForm from "../../components/PostCommentForm/PostCommentForm";
import userActions from "../../userActions/userActions";

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
      searchParams.get("u"),
      commentText
    );
    console.log(new_comment);
    setCommentForm(false);
    setCommentText("");
  };

  const getCommentList = async () => {
    //console.log("comments");
    const commentList = await axios.post(
      "http://localhost:5000/data-load/get-comments",
      {
        video_id: searchParams.get("v"),
      }
    );
    setCountComments(commentList.data.comments_count);
    setIsCommentsLoad(true);
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
    console.log(store.user);
    const getVideo = async () => {
      setPageLoading(true);
      const video = await axios.post(
        "http://localhost:5000/user-action/load-watch-video",
        {
          video_id: searchParams.get("v"),
          user_id: searchParams.get("u"),
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

  return (
    <div>
      <div className={styles.video_player}>
        <ReactPlayer
          url={`http://localhost:5000${videoPath}`}
          controls
          width="100%"
          height="70vh"
          style={{ display: "inline-block", marginTop: "20px" }}
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
            style={{ borderBottom: "4px solid #d9d9d9", paddingBottom: "10px" }}
          >
            <div className={styles.video_stat}>
              <h1 className={styles.video_name}>{videoName}</h1>
              <h2 className={styles.views_count}>
                Количество просмотров:{countViews}
              </h2>
            </div>
            <LikeDislikePanel
              likes={countLike}
              dislikes={countDislike}
              is_like_active={isLike}
              is_dislike_active={isDislike}
              onLike={handleLikeChange}
              onDislike={handleDislikeChange}
            />

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
            {store.user.login == channelName || pageLoading ? (
              <></>
            ) : (
              <div className={styles.subscribe_button}>
                <Main_Button>Подписаться</Main_Button>
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
            <Main_Button button_action={() => setCommentForm(true)}>
              Оставить комментарий
            </Main_Button>
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
            <div>
              {/* <CommentList /> */}
              <InfiniteScroll
                dataLength={4}
                next={getCommentList}
                hasMore={true}
                pullDownToRefreshContent={
                  <h3 style={{ textAlign: "center" }}>
                    &#8595; Pull down to refresh
                  </h3>
                }
              ></InfiniteScroll>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default WatchVideo;
