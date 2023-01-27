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
    //console.log("page " + currentPage);
    const getSearchResults = async () => {
      setIsResultsLoading(true);
      if (!isUserLoading) {
        const search_results = await axios.post(
          "http://localhost:5000/data-load/get-filtered-content",
          {
            user_id: store.user.id,
            search_string: searchParams.get("params"),
          }
        );

        setFilterdVideos(search_results.data.videos);
        setFilteredChannels(search_results.data.channels);

        setPageVideos(
          search_results.data.videos.length > 33
            ? search_results.data.videos.slice(
                Number(currentPage) * 33,
                (Number(currentPage) + 1) * 33
              )
            : search_results.data.videos
        );

        //console.log(search_results);
        setIsResultsLoading(false);
      }
      setTimeout(() => setIsUserLoading(store.isLoading), 3000);
    };
    getSearchResults();
  }, [searchParams.get("params"), isUserLoading]);

  React.useEffect(() => {
    // console.log(filtredVideos);
    // console.log(filtredVideos.slice(currentPage, currentPage + 1));
    setPageVideos(
      filtredVideos.slice(currentPage * 33, (currentPage + 1) * 33)
    );
  }, [currentPage]);
  return (
    <div className={styles.search_results_page}>
      {isResultsLoading ? (
        <Donut_2 />
      ) : (
        <>
          {" "}
          {filteredChannels.length == 0 && filtredVideos.length == 0 ? (
            <h1>По данному запросу ничего не найдено</h1>
          ) : (
            <h1 style={{ marginBottom: "5px" }}>Результаты поиска:</h1>
          )}
          <div>
            {currentPage == 0 ? (
              <ChannelSubscribeList list={filteredChannels} />
            ) : (
              <></>
            )}
            {/* <VIdeoMinList videos={filtredVideos} /> */}
            <VIdeoMinList videos={pageVideos} />
            <div style={{ marginTop: "10px" }}>
              {filtredVideos.length > 32 ? (
                <PageList
                  buttons_count={Math.ceil(filtredVideos.length / 32)} // тут считать в зависимости от того скока видосов
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
