import React from "react";
import { useSearchParams } from "react-router-dom";
import { Donut_2 } from "../../components/UI/Donut_2/Donut_2";
import { EditVideoForm } from "../../components/EditVideoForm/EditVideoForm";
import VideoDataLoad from "../../videoDataLoad/videoDataLoad";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

export const EditVideoPage = observer(() => {
  const store = React.useContext(Context);
  const [isUserLoading, setIsUserLoading] = React.useState(store.isLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [videoName, setVideoName] = React.useState();
  const [videoDescription, setVideoDescription] = React.useState();
  const [videoAccess, setVideoAccess] = React.useState();
  const [videoSubject, setVideoSubject] = React.useState();
  const [tagList, setTagList] = React.useState();
  const [hashTagList, setHashTagList] = React.useState();
  React.useEffect(() => {
    const getVideoData = async () => {
      if (isUserLoading == false) {
        const video_data = await VideoDataLoad.getVideoForEdit(
          searchParams.get("v"),
          store.user.id
        );
        setVideoName(video_data.data.name);
        setVideoDescription(video_data.data.description);
        setVideoAccess(video_data.data.access_type);
        setVideoSubject(video_data.data.subject);
        setTagList(video_data.data.tags.tags_list);
        setHashTagList(video_data.data.tags.hash_tags_list);
        setIsLoading(false);
        return;
      }

      setIsUserLoading(store.isLoading);
      setTimeout(() => {
        setIsUserLoading(store.isLoading);
      }, 5000);

      // setVideoName(video_data.data.name);
      // setVideoDescription(video_data.data.description);
      // setVideoAccess(video_data.data.access_type);
      // setVideoSubject(video_data.data.subject);
      //setIsLoading(false);
    };
    getVideoData();
  }, [isUserLoading]);
  return (
    <div style={{ textAlign: "center", padding: "5px" }}>
      {isLoading ? (
        <Donut_2 />
      ) : (
        <EditVideoForm
          video_id={searchParams.get("v")}
          is_loading={isLoading}
          default_name={videoName}
          default_description={videoDescription}
          default_access={videoAccess}
          default_subject={videoSubject}
          tags={tagList}
          hash_tags={hashTagList}
        />
      )}
    </div>
  );
});
