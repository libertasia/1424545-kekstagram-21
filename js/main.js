'use strict';

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

const userPictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

const usersPictures = document.querySelector(`.pictures`);

const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isPropertyValueUsed = function (propertyName, propertyValue, objArray) {
  for (let i = 0; i < objArray.length; i++) {
    if (propertyValue === objArray[i][propertyName]) {
      return true;
    }
  }
  return false;
};

const generateComments = function (count) {
  let comments = [];
  for (let i = 0; i < count; i++) {
    let name = ``;
    do {
      name = USERS_NAMES[getRandomInt(0, USERS_NAMES.length)];
    }
    while (isPropertyValueUsed(`name`, name, comments));

    let avatar = `img/avatar-${getRandomInt(0, 6)}.svg`;
    let message = ``;
    do {
      message = COMMENTS[getRandomInt(0, COMMENTS.length)];
    }
    while (isPropertyValueUsed(`message`, message, comments));

    comments.push({
      avatar,
      name,
      message
    });
  }
  return comments;
};

const generatePictures = function () {
  let pictures = [];
  for (let i = 0; i < 25; i++) {
    let url = ``;
    do {
      url = `photos/${getRandomInt(1, 25)}.jpg`;
    }
    while (isPropertyValueUsed(`url`, url, pictures));

    let likes = getRandomInt(15, 200);

    let comments = generateComments(getRandomInt(1, 6));

    let picture = {
      url,
      description: ``,
      likes,
      comments
    };
    pictures.push(picture);
  }
  return pictures;
};

const createPictureElement = function (picture) {
  let pictureElement = userPictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = picture.url;
  pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;

  return pictureElement;
};

const createPicturesFragment = function (pictures) {
  let fragment = document.createDocumentFragment();
  pictures.forEach((picture) => fragment.appendChild(createPictureElement(picture)));
  return fragment;
};

const showPictures = function () {
  usersPictures.appendChild(createPicturesFragment(generatePictures()));
};

showPictures();
