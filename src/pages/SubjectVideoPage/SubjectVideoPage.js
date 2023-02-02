import React from "react";
import axios from "axios";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { VIdeoMinList } from "../../components/UI/VideoMinList/VIdeoMinList";
import PageList from "../../components/UI/PageList/PageList";
import { Donut_2 } from "../../components/UI/Donut_2/Donut_2";
import { Context } from "../..";
import { getSubjectString } from "../../otherServices/getSubjectPage";
import styles from "./SubjectVideoPage.module.css";

const SubjectVideoPage = () => {
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
  const { subject } = useParams();

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
          `${process.env.REACT_APP_API_URL}/data-load/get-videos-by-subject`,
          {
            user_id: store.user.id,
            subject: getSubjectString(subject),
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
  }, [searchParams.get("page"), isUserLoading, subject]);
  return (
    <div className={styles.subject_video_page}>
      {isResultsLoading ? (
        <Donut_2 />
      ) : videosLength == 0 ? (
        <h1>По данному запросу видеоматериалов не найдено</h1>
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

export default SubjectVideoPage;
