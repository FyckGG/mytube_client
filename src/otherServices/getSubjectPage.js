export const getSubjectString = (param) => {
  const subject_strings = [
    { par: "films-serials", str: "Фильмы/сериалы" },
    { par: "cartoons-animation", str: "Мультфильмы/анимация" },
    { par: "music", str: "Музыка" },
    { par: "videogames", str: "Видеоигры" },
    { par: "sport", str: "Спорт" },
    { par: "active-leisure", str: "Активный отдых" },
    { par: "science-tecnology", str: "Наука/технологии" },
    { par: "economic", str: "Экономика" },
    { par: "politics", str: "Политика" },
  ];

  const subject_string = subject_strings.filter((item) => item.par == param);
  return subject_string[0].str;
};

// {
//     href: "/",
//     value: "Главная",
//   },
//   { href: "", value: "line" },
//   { href: "/videos-subscriptions/?page=0", value: "Подписки" },
//   { href: "", value: "line" },
//   { href: "/subjects/films-serials/?page=0", value: "Фильмы/сериалы" },
//   {
//     href: "/subjects/cartoons-animation/?page=0",
//     value: "Мультфильмы/анимация",
//   },
//   { href: "/subjects/music/?page=0", value: "Музыка" },
//   { href: "/subjects/videogames/?page=0", value: "Видеоигры" },
//   { href: "/subjects/sport/?page=0", value: "Спорт" },
//   { href: "/subjects/active-leisure/?page=0", value: "Активный отдых" },
//   { href: "/subjects/science-tecnology/?page=0", value: "Наука/технологии" },
//   { href: "/subjects/economic/?page=0", value: "Экономика" },
//   { href: "/subjects/politics/?page=0", value: "Политика" },
