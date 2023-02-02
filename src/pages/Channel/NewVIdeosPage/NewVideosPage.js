import React from "react";
import axios from "axios";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { VIdeoMinList } from "../../../components/UI/VideoMinList/VIdeoMinList";
import PageList from "../../../components/UI/PageList/PageList";
import { Donut_2 } from "../../../components/UI/Donut_2/Donut_2";
import { Context } from "../../..";
import styles from "./NewVideosPage.module.css";

const NewVideoPage = () => {
  const store = React.useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isResultsLoading, setIsResultsLoading] = React.useState(true);
  const [isUserLoading, setIsUserLoading] = React.useState(store.user.id);
  const [pageVideos, setPageVideos] = React.useState([]);
  const [videosLength, setVideosLength] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(
    Number(searchParams.get("page"))
  );

  const navigate = useNavigate();

  const handlePageChange = async (e) => {
    setCurrentPage(Number(e));

    const changed_page_par = new URLSearchParams();
    changed_page_par.append("page", e);

    navigate({ search: `${changed_page_par.toString()}` });
  };
  React.useEffect(() => {
    const getSearchResults = async () => {
      setIsResultsLoading(true);
      if (!isUserLoading) {
        const results = await axios.post(
          "http://localhost:5000/data-load/get-new-videos",
          {
            user_id: store.user.id,
            current_page: Number(searchParams.get("page")),
          }
        );
        console.log(results);
        setPageVideos(results.data.videos);

        setVideosLength(results.data.videos_length);

        setIsResultsLoading(false);
      }
      setTimeout(() => setIsUserLoading(store.isLoading), 3000);
    };
    getSearchResults();
  }, [searchParams.get("page"), isUserLoading]);
  return (
    <div className={styles.new_videos_page}>
      {isResultsLoading ? (
        <Donut_2 />
      ) : videosLength == 0 ? (
        <h1>Видео отсутствуют</h1>
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
  );
};

export default NewVideoPage;
