import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { VIdeoMinList } from "../../components/UI/VideoMinList/VIdeoMinList";
import { ChannelSubscribeList } from "../../components/UI/ChannelSubscribeList/ChannelSubscribeList";
import { Donut_2 } from "../../components/UI/Donut_2/Donut_2";
import { Context } from "../..";
import styles from "./SearchResultsPage.module.css";

const SeacrhResultsPage = () => {
  const store = React.useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtredVideos, setFilterdVideos] = React.useState([]);
  const [filteredChannels, setFilteredChannels] = React.useState([]);
  const [isUserLoading, setIsUserLoading] = React.useState(store.isLoading);
  const [isResultsLoading, setIsResultsLoading] = React.useState(true);

  React.useEffect(() => {
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
        console.log(search_results);
        setIsResultsLoading(false);
      }
      setTimeout(() => setIsUserLoading(store.isLoading), 3000);
    };
    getSearchResults();
  }, [searchParams.get("params"), isUserLoading]);
  return (
    <div className={styles.search_results_page}>
      {isResultsLoading ? (
        <Donut_2 />
      ) : (
        <div>
          <ChannelSubscribeList list={filteredChannels} />
          <VIdeoMinList videos={filtredVideos} />
        </div>
      )}
    </div>
  );
};

export default SeacrhResultsPage;
