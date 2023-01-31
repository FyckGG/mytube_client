import React from "react";
import DataLoad from "../../dataLoad/dataLoad";
import { VIdeoMinList } from "../../components/UI/VideoMinList/VIdeoMinList";
import PageList from "../../components/UI/PageList/PageList";
import { Donut_2 } from "../../components/UI/Donut_2/Donut_2";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Context } from "../..";
import styles from "./SubscribtionVideoPage.module.css";

const SubscribtionVideoPage = () => {
  const store = React.useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageVideos, setPageVideos] = React.useState([]);
  const [videosLength, setVideosLength] = React.useState();
  const [isResultsLoading, setIsResultsLoading] = React.useState(true);
  const [isUserLoading, setIsUserLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(
    Number(searchParams.get("page"))
  );

  const navigate = useNavigate();

  const handlePageChange = async (e) => {
    setCurrentPage(Number(e));
    //const search_par = searchParams.get("params");
    const changed_page_par = new URLSearchParams();
    changed_page_par.append("page", e);
    //navigate({ search: `params=${search_par}&${changed_page_par.toString()}` });
    navigate({ search: `${changed_page_par.toString()}` });
  };

  React.useEffect(() => {
    const getSubscribtionVideos = async () => {
      setIsResultsLoading(true);
      if (!isUserLoading) {
        const video_results = await DataLoad.getSubscribtionVideos(
          store.user.id,
          Number(searchParams.get("page"))
        );
        setPageVideos(video_results.data.videos);
        setVideosLength(video_results.data.videos_length);
        setIsResultsLoading(false);
      }
      setTimeout(() => setIsUserLoading(store.isLoading), 3000);
    };
    getSubscribtionVideos();
  }, [searchParams.get("page"), isUserLoading]);
  return (
    <div className={styles.subscribtion_video_page}>
      {isResultsLoading ? (
        <Donut_2 />
      ) : (
        <div>
          {pageVideos.length == 0 ? (
            <h1>Вы не имеете подписок на другие каналы</h1>
          ) : (
            <div>
              <VIdeoMinList videos={pageVideos} />
              {videosLength > 32 ? (
                <PageList
                  buttons_count={Math.ceil(videosLength / 32)}
                  on_page_change={handlePageChange}
                  active_button={currentPage}
                />
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubscribtionVideoPage;
