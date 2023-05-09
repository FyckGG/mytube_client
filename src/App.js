import React from "react";
import styles from "./App.module.css";
import Login from "./components/Login/Login";
import Sign from "./components/Sign/Sign";
import { useState, useRef, useEffect, useContext } from "react";
import Navbar from "./components/navbar/Navbar";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import list from "./imgs/list1.png";
import cross from "./imgs/cross.png";
import AccOptions from "./components/AccOptions/AccOptions";
import { Route, Routes, Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons"; //// Здесь по хорошему сделать библиотеку как советовалось в статейке
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faListSquares } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faPersonBiking } from "@fortawesome/free-solid-svg-icons";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";
import UserProfile from "./pages/UserProfile/UserProfile";
import MainPage from "./pages/MainPage/MainPage";
import UserLikes from "./pages/UserLikes/UserLikes";
import UserPlaylists from "./pages/UserPlaylists/UserPlaylists";
import UserSubscriptions from "./pages/UserSubscriptions/UserSubscriptions";
import UploadVideo from "./pages/UploadVideo/UploadVideo";
import WatchVideo from "./pages/WatchVideoPage/WatchVideo";
import Channel from "./pages/Channel/Channel";
import MyChannel from "./pages/MyChannel/MyChannel";
import { EditProfilePage } from "./pages/EditProfilePage/EditProfilePage";
import { EditVideoPage } from "./pages/EditVideoPage/EditVideoPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage/ResetPasswordPage";
import SeacrhResultsPage from "./pages/SearchResultsPage/SeacrhResultsPage";
import SubscribtionVideoPage from "./pages/SubscribtionsVideoPage/SubscribtionVideoPage";
import SubjectVideoPage from "./pages/SubjectVideoPage/SubjectVideoPage";
import NewVideoPage from "./pages/Channel/NewVIdeosPage/NewVideosPage";
import UserHistoryPage from "./pages/UserHistoryPage/UserHistoryPage";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage";
import { WatchLater } from "./pages/WatchLater/WatchLater";
import { Context } from ".";

function App() {
  //dotenv.config();
  const nodeRef = useRef(null);
  const store = useContext(Context);
  //store.user.id
  const items_acc_menu = [
    {
      href: `/profile/${store.user.id}`,
      value: "Мой профиль",
      icon: faUser,
    },
    {
      href: `/subscriptions/${store.user.id}`,
      value: "Мои подписки",
      icon: faListSquares,
    },
    {
      href: `/liked_videos/${store.user.id}`,
      value: "Понравившиеся видео",
      icon: faThumbsUp,
    },
    {
      href: `/watch_later/${store.user.id}`,
      value: "Смотреть позже",
      icon: faClockFour,
    },
    {
      href: `/history/${store.user.id}/?page=0`,
      value: "История",
      icon: faClockRotateLeft,
    },
    {
      href: "/",
      value: "Покинуть аккаунт",
      icon: faDoorOpen,
      action: async () => {
        //console.log("ggf");
        await store.logout();
        setOptionsActive(false);
        window.location.reload();
      },
    },
  ];

  const burger_items = [
    {
      href: "/",
      value: "Главная",
      for_auth: false,
      icon: faHouse,
    },
    { href: "", value: "line" },
    {
      href: "/videos-subscriptions/?page=0",
      value: "Подписки",
      for_auth: true,
      icon: faSquareCheck,
    },
    { href: "", value: "line" },
    {
      href: "/subjects/films-serials/?page=0",
      value: "Фильмы/сериалы",
      for_auth: false,
      icon: faCamera,
    },
    {
      href: "/subjects/cartoons-animation/?page=0",
      value: "Мультфильмы/анимация",
      for_auth: false,
      icon: faFaceSmileBeam,
    },
    {
      href: "/subjects/music/?page=0",
      value: "Музыка",
      for_auth: false,
      icon: faMusic,
    },
    {
      href: "/subjects/videogames/?page=0",
      value: "Видеоигры",
      for_auth: false,
      icon: faGamepad,
    },
    {
      href: "/subjects/sport/?page=0",
      value: "Спорт",
      for_auth: false,
      icon: faDumbbell,
    },
    {
      href: "/subjects/active-leisure/?page=0",
      value: "Активный отдых",
      for_auth: false,
      icon: faPersonBiking,
    },
    {
      href: "/subjects/science-tecnology/?page=0",
      value: "Наука/технологии",
      for_auth: false,
      icon: faFlask,
    },
    {
      href: "/subjects/economic/?page=0",
      value: "Экономика",
      for_auth: false,
      icon: faDollar,
    },
    {
      href: "/subjects/politics/?page=0",
      value: "Политика",
      for_auth: false,
      icon: faLandmark,
    },
  ];

  const [signActive, setSignActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);
  const [openList, setOpenList] = useState(list);
  const [isLogUser, setIsLogUser] = useState(false);
  const [optionsActive, setOptionsActive] = useState(false);

  const handleLogChange = () => {
    isLogUser ? setIsLogUser(false) : setIsLogUser(true);
  };

  const accOptionRef = useRef(null);
  const accOptionButtonRef = useRef(null);

  useEffect(() => {
    if (!optionsActive) return;
    const handleClick = (e) => {
      if (!accOptionRef.current) return;
      if (
        !accOptionRef.current.contains(e.target) &&
        !accOptionButtonRef.current.contains(e.target)
      ) {
        setOptionsActive(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [optionsActive, setOptionsActive]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    } else store.isLoading = false;
  }, []);

  return (
    <div>
      <Navbar
        is_log={isLogUser}
        sign_in={() => setSignActive(true)}
        log_in={() => setLoginActive(true)}
        open_options={() => {
          if (optionsActive) {
            setOptionsActive(false);
          } else {
            setOptionsActive(true);
          }
        }}
        burger_action={() => {
          if (burgerActive) {
            setOpenList(list);
            setBurgerActive(false);
          } else {
            setOpenList(cross);
            setBurgerActive(true);
          }
        }}
        list_icon={openList}
        acc_button_ref={accOptionButtonRef}
      />

      <div>
        <BurgerMenu
          active={burgerActive}
          setActive={setBurgerActive}
          items={burger_items}
          header="Навигация"
        />
      </div>
      <Sign
        modalActive={signActive}
        setModalActive={setSignActive}
        onSign={handleLogChange}
      ></Sign>
      <Login
        modalActive={loginActive}
        setModalActive={setLoginActive}
        onLog={handleLogChange}
      ></Login>
      <AccOptions
        items={items_acc_menu}
        acc_ref={accOptionRef}
        header="Параметры аккаунта"
        optionsActive={optionsActive}
      />
      <div className={styles.page_content}>
        <Routes>
          <Route path="/profile/:id" element={<MyChannel />} />
          <Route path="/subscriptions/:id" element={<UserSubscriptions />} />
          <Route path="/liked_videos/:id" element={<UserLikes />} />
          <Route path="/watch_later/:id" element={<WatchLater />} />
          <Route path="/playlisis/:id" element={<UserPlaylists />} />
          <Route path="/upload_video/:id" element={<UploadVideo />} />
          <Route path="/watch_video/" element={<WatchVideo />} />
          <Route path="/channel/:id" element={<Channel />} />
          <Route path="/edit_video/" element={<EditVideoPage />} />
          <Route path="/edit_profile/:id" element={<EditProfilePage />} />
          <Route path="/password-reset/" element={<ResetPasswordPage />} />
          <Route path="/search-results/" element={<SeacrhResultsPage />} />
          <Route
            path="/videos-subscriptions"
            element={<SubscribtionVideoPage />}
          />
          <Route path="/subjects/:subject" element={<SubjectVideoPage />} />
          <Route path="/history/:id" element={<UserHistoryPage />} />
          <Route path="/new/" element={<NewVideoPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
