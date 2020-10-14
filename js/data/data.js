'use strict';

// Генерация моковых данных:

(function () {
  const USERS_NAMES = [
    `Тирион Ланнистер`,
    `Джон Сноу`,
    `Дейенерис Таргариен`,
    `Серсея Ланнистер`,
    `Санса Старк`,
    `Арья Старк`,
    `Джейме Ланнистер`,
    `Джорах Мормонт`,
    `Теон Грейджой`,
    `Сэмвелл Тарли`,
    `Варис`,
    `Бриенна Тарт`,
    `Сандор Клиган`,
    `Миссандея`,
    `Серый Червь`,
    `Мелисандра`,
    `Его Воробейшество`,
    `Джендри`,
    `Визерис Таргариен`,
    `Роберт Баратеон`,
    `Кхал Дрого`,
    `Джиор Мормонт`,
    `Рамси Болтон`,
    `Робб Старк`,
    `Даарио Нахарис`,
    `Шая`
  ];

  const COMMENTS = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];

  const MIN_LIKES_COUNT = 15;

  const MAX_LIKES_COUNT = 200;

  const PICTURES_COUNT = 25;

  const getRandomInt = window.util.getRandomInt;

  const data = {};

  const isPropertyValueUsed = function (propertyName, propertyValue, objArray) {
    for (let i = 0; i < objArray.length; i++) {
      if (propertyValue === objArray[i][propertyName]) {
        return true;
      }
    }
    return false;
  };

  const generateComments = function (count) {
    const comments = [];
    let name = ``;
    let comment = ``;
    for (let i = 0; i < count; i++) {
      do {
        name = USERS_NAMES[getRandomInt(0, USERS_NAMES.length - 1)];
      }
      while (isPropertyValueUsed(`name`, name, comments));

      do {
        comment = COMMENTS[getRandomInt(0, COMMENTS.length - 1)];
      }
      while (isPropertyValueUsed(`comment`, comment, comments));

      comments.push({
        avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
        name,
        comment
      });
    }
    return comments;
  };

  data.generatePictures = function () {
    const pictures = [];
    let url = ``;
    for (let i = 0; i < PICTURES_COUNT; i++) {
      do {
        url = `photos/${getRandomInt(1, PICTURES_COUNT)}.jpg`;
      }
      while (isPropertyValueUsed(`url`, url, pictures));

      pictures.push({
        id: `photo-${i}`,
        url,
        description: ``,
        likes: getRandomInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
        comments: generateComments(getRandomInt(1, 6))
      });
    }
    return pictures;
  };

  window.data = data;
})();
