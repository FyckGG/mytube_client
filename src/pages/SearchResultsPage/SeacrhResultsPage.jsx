import React from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { VIdeoMinList } from "../../components/UI/VideoMinList/VIdeoMinList";
import { ChannelSubscribeList } from "../../components/UI/ChannelSubscribeList/ChannelSubscribeList";
import { Donut_2 } from "../../components/UI/Donut_2/Donut_2";
import PageList from "../../components/UI/PageList/PageList";
import { Context } from "../..";
import styles from "./SearchResultsPage.module.css";

const SeacrhResultsPage = () => {
  const store = React.useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtredVideos, setFilterdVideos] = React.useState([]);
  const [pageVideos, setPageVideos] = React.useState();
  const [videosLength, setVideosLength] = React.useState(0);
  const [filteredChannels, setFilteredChannels] = React.useState([]);
  const [isUserLoading, setIsUserLoading] = React.useState(store.isLoading);
  const [isResultsLoading, setIsResultsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(
    Number(searchParams.get("page"))
  );

  const navigate = useNavigate();
  // 32 video on page
  const handlePageChange = (e) => {
    setCurrentPage(Number(e));
    const search_par = searchParams.get("params");
    const changed_page_par = new URLSearchParams();
    changed_page_par.append("page", e);
    navigate({ search: `params=${search_par}&${changed_page_par.toString()}` });
  };

  React.useEffect(() => {
    const getSearchResults = async () => {
      setIsResultsLoading(true);
      if (!isUserLoading) {
        const search_results = await axios.post(
          `${process.env.REACT_APP_API_URL}/data-load/get-filtered-content`,
          {
            user_id: store.user.id,
            search_string: searchParams.get("params"),
            current_page: Number(searchParams.get("page")),
          }
        );

        setFilteredChannels(search_results.data.channels);

        setPageVideos(search_results.data.videos);

        setVideosLength(search_results.data.videos_length);

        setIsResultsLoading(false);
      }
      setTimeout(() => setIsUserLoading(store.isLoading), 3000);
    };
    getSearchResults();
  }, [searchParams.get("params"), searchParams.get("page"), isUserLoading]);

  return (
    <div className={styles.search_results_page}>
      {isResultsLoading ? (
        <Donut_2 />
      ) : (
        <>
          {" "}
          {filteredChannels.length == 0 && pageVideos.length == 0 ? (
            <h1>По данному запросу ничего не найдено</h1>
          ) : (
            <h1 style={{ marginBottom: "5px" }}>Результаты поиска:</h1>
          )}
          <div>
            {currentPage == 0 ? (
              <ChannelSubscribeList
                list={filteredChannels}
                user={store.user.id}
              />
            ) : (
              <></>
            )}

            <VIdeoMinList videos={pageVideos} />
            <div style={{ marginTop: "10px" }}>
              {videosLength > 32 ? (
                <PageList
                  buttons_count={Math.ceil(videosLength / 32)}
                  on_page_change={handlePageChange}
                  active_button={Number(currentPage)}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SeacrhResultsPage;
