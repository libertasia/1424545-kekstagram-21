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

const PICTURES_COUNT = 25;

const userPictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

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

const generatePictures = function () {
  const pictures = [];
  let url = ``;
  for (let i = 0; i < PICTURES_COUNT; i++) {
    do {
      url = `photos/${getRandomInt(1, PICTURES_COUNT)}.jpg`;
    }
    while (isPropertyValueUsed(`url`, url, pictures));

    pictures.push({
      url,
      description: ``,
      likes: getRandomInt(15, 200),
      comments: generateComments(getRandomInt(1, 6))
    });
  }
  return pictures;
};

const createPictureElement = function (picture) {
  const pictureElement = userPictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = picture.url;
  pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;

  return pictureElement;
};

const renderPictures = function (picturesData) {
  const fragment = document.createDocumentFragment();
  const usersPictures = document.querySelector(`.pictures`);

  picturesData.forEach((picture) => {
    const pictureEl = createPictureElement(picture);
    fragment.appendChild(pictureEl);
  });

  usersPictures.appendChild(fragment);
};

const picturesData = generatePictures();
renderPictures(picturesData);


//

const createSocialComment = function (commentObj) {
  const comment = document.createElement(`li`);
  comment.classList.add(`social__comment`);

  const socialPicture = document.createElement(`img`);
  socialPicture.classList.add(`social__picture`);
  socialPicture.src = commentObj.avatar;
  socialPicture.alt = commentObj.name;
  socialPicture.width = 35;
  socialPicture.height = 35;

  const socialText = document.createElement(`p`);
  socialText.classList.add(`social__text`);
  socialText.textContent = commentObj.comment;

  comment.append(socialPicture);
  comment.append(socialText);
};

const showBigPicture = function (picture) {
  const bigPicture = document.querySelector(`.big-picture`);

  bigPicture.querySelector(`.big-picture__img`).querySelector(`img`).src = picture.url;
  bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
  bigPicture.querySelector(`.comments-count`).textContent = picture.comments.length;
  bigPicture.querySelector(`.social__caption`).textContent = picture.description;
  const socialComments = bigPicture.querySelector(`.social__comments`);

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < picture.comments.length; i++) {
    const comment = createSocialComment(picture.comments[i]);
    fragment.append(comment);
  }

  socialComments.innerHTML = ``;
  socialComments.append(fragment);

  bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
  bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);

  bigPicture.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
};

showBigPicture(picturesData[0]);
