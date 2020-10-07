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

const MIN_LIKES_COUNT = 15;

const MAX_LIKES_COUNT = 200;

const PICTURES_COUNT = 25;

const SOCIAL_PICTURE_SIZE = 35;

const PICTURE_SCALE_STEP = 25;

const MIN_PICTURE_SIZE = 25;

const MAX_PICTURE_SIZE = 100;

const MAX_EFFECT_LEVEL_VALUE = 100;

const MAX_HASHTAGS_COUNT = 5;

const HASHTAG_VALIDITY_REGEX = RegExp(`^#[a-zA-Z0-9а-яА-ЯёЁ]{1,19}$`);

const MAX_COMMENT_INPUT_LENGTH = 140;

const pageBody = document.querySelector(`body`);

const userPictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

const bigPicture = document.querySelector(`.big-picture`);
const bigPictureCloseBtn = bigPicture.querySelector(`.big-picture__cancel`);

const uploadFileInput = document.querySelector(`#upload-file`);
const uploadFileForm = document.querySelector(`.img-upload__overlay`);
const uploadFileCloseBtn = uploadFileForm.querySelector(`#upload-cancel`);

const increaseImgSizeBtn = uploadFileForm.querySelector(`.scale__control--bigger`);
const decreaseImgSizeBtn = uploadFileForm.querySelector(`.scale__control--smaller`);
const imgSizeValueInput = uploadFileForm.querySelector(`.scale__control--value`);
const imgUploadPreview = uploadFileForm.querySelector(`.img-upload__preview img`);

const effectLevelPin = uploadFileForm.querySelector(`.effect-level__pin`);
const effectLevelValueInput = uploadFileForm.querySelector(`.effect-level__value`);
const effectLevelSlider = uploadFileForm.querySelector(`.img-upload__effect-level`);

const hashtagsInput = uploadFileForm.querySelector(`.text__hashtags`);
const commentInput = uploadFileForm.querySelector(`.text__description`);

let activeFilter = null;

const Key = {
  ESC: `Escape`,
  ENTER: `Enter`
};

const keyboard = {
  doIfEscEvent(evt, callback) {
    if (evt.key === Key.ESC) {
      callback();
    }
  },
  doIfEnterEvent(evt, callback) {
    if (evt.key === Key.ENTER) {
      callback();
    }
  }
};

const InvalidMessage = {
  HASHTAG_INVALID: `
  хэш-тег начинается с символа # (решётка);
  строка после решётки должна состоять из букв и чисел;
  хеш-тег не может состоять только из одной решётки;
  максимальная длина одного хэш-тега 20 символов, включая решётку;
  хэш-теги разделяются пробелами;`,
  HASHTAG_DUPLICATE: `хэш-теги нечувствительны к регистру, один и тот же хэш-тег не может быть использован дважды;`,
  TOO_MANY_HASHTAGS: `нельзя указать больше пяти хэш-тегов;`,
  COMMENT_TOO_LONG: `длина комментария не может составлять больше 140 символов;`
};

const effect = {
  none: {
    className: `effects__preview--none`
  },
  chrome: {
    className: `effects__preview--chrome`,
    type: `grayscale`,
    min: 0,
    max: 1,
    units: ``
  },
  sepia: {
    className: `effects__preview--sepia`,
    type: `sepia`,
    min: 0,
    max: 1,
    units: ``
  },
  marvin: {
    className: `effects__preview--marvin`,
    type: `invert`,
    min: 0,
    max: 100,
    units: `%`
  },
  phobos: {
    className: `effects__preview--phobos`,
    type: `blur`,
    min: 0,
    max: 3,
    units: `px`
  },
  heat: {
    className: `effects__preview--heat`,
    type: `brightness`,
    min: 1,
    max: 3,
    units: ``
  }
};

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
      likes: getRandomInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
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


// Показ/закрытие фотографии в полноразмерном режиме:

const createSocialComment = function (commentObj) {
  return `
  <li class="social__comment">
  <img
    class="social__picture"
    src="${commentObj.avatar}"
    alt="${commentObj.name}"
    width="${SOCIAL_PICTURE_SIZE}" height="${SOCIAL_PICTURE_SIZE}">
  <p class="social__text">${commentObj.comment}</p>
  </li>
  `;
};

const fillBigPicture = function (picture) {
  bigPicture.querySelector(`.big-picture__img`).querySelector(`img`).src = picture.url;
  bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
  bigPicture.querySelector(`.comments-count`).textContent = picture.comments.length;
  bigPicture.querySelector(`.social__caption`).textContent = picture.description;

  const comments = picture.comments.map((comment) => createSocialComment(comment));
  bigPicture.querySelector(`.social__comments`).innerHTML = comments.join(``);
};

const hideElements = function () {
  bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
  bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
};

const onBigPictureEscPress = function (evt) {
  // evt.preventDefault();
  keyboard.doIfEscEvent(evt, closeBigPicture);
};

const showBigPicture = function () {
  bigPicture.classList.remove(`hidden`);
  pageBody.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onBigPictureEscPress);
};

const closeBigPicture = function () {
  bigPicture.classList.add(`hidden`);
  pageBody.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onBigPictureEscPress);
};

bigPictureCloseBtn.addEventListener(`click`, function () {
  closeBigPicture();
});

bigPictureCloseBtn.addEventListener(`keydown`, function (evt) {
  keyboard.doIfEnterEvent(evt, closeBigPicture);
});

fillBigPicture(picturesData[0]);

hideElements();

showBigPicture();

// Загрузка изображения и показ формы редактирования:


const onPopupEscPress = function (evt) {
  if (document.activeElement !== hashtagsInput && document.activeElement !== commentInput) {
    keyboard.doIfEscEvent(evt, closePopup);
  }
};

const resetImgParams = function () {
  imgSizeValueInput.value = `100%`;
  changePictureSize();
  imgUploadPreview.classList.remove(...imgUploadPreview.classList);
  effectLevelSlider.classList.add(`hidden`);
};

const openPopup = function () {
  uploadFileForm.classList.remove(`hidden`);
  pageBody.classList.add(`modal-open`);

  resetImgParams();

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  uploadFileForm.classList.add(`hidden`);
  uploadFileInput.value = ``;
  pageBody.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

uploadFileInput.addEventListener(`change`, function () {
  openPopup();
});

uploadFileCloseBtn.addEventListener(`click`, function () {
  closePopup();
});

uploadFileCloseBtn.addEventListener(`keydown`, function (evt) {
  keyboard.doIfEnterEvent(evt, closePopup);
});

// Редактирование размера изображения(Масштаб):

const changePictureSize = function () {
  const currentValue = parseInt(imgSizeValueInput.value, 10);
  imgUploadPreview.style.transform = `scale(${currentValue / MAX_PICTURE_SIZE})`;
};

const increaseImgSizeValueInput = function () {
  const currentValue = parseInt(imgSizeValueInput.value, 10);
  let newValue = currentValue + PICTURE_SCALE_STEP;
  if (newValue > MAX_PICTURE_SIZE) {
    newValue = MAX_PICTURE_SIZE;
  }
  imgSizeValueInput.value = `${newValue}%`;
};

const decreaseImgSizeValueInput = function () {
  const currentValue = parseInt(imgSizeValueInput.value, 10);
  let newValue = currentValue - PICTURE_SCALE_STEP;
  if (newValue < MIN_PICTURE_SIZE) {
    newValue = MIN_PICTURE_SIZE;
  }
  imgSizeValueInput.value = `${newValue}%`;
};

increaseImgSizeBtn.addEventListener(`click`, function () {
  increaseImgSizeValueInput();
  changePictureSize();
});

decreaseImgSizeBtn.addEventListener(`click`, function () {
  decreaseImgSizeValueInput();
  changePictureSize();
});

// Наложение эффекта на изображение:

const onUploadFileFormChange = function (evt) {
  if (evt.target.matches(`input[type="radio"]`)) {
    imgUploadPreview.style.filter = ``;
    effectLevelValueInput.value = MAX_EFFECT_LEVEL_VALUE;
    imgUploadPreview.className = `effects__preview--${evt.target.value}`;
    activeFilter = effect[evt.target.value];

    if (evt.target.value === `none`) {
      effectLevelSlider.classList.add(`hidden`);
      activeFilter = null;
    } else {
      effectLevelSlider.classList.remove(`hidden`);
    }
  }
};

const changeEffectLevel = function (levelValue) {
  if (!activeFilter) {
    imgUploadPreview.style.filter = ``;
    return;
  }
  const value = activeFilter.min + (activeFilter.max - activeFilter.min) * levelValue / 100;

  imgUploadPreview.style.filter = `${activeFilter.type}(${value}${activeFilter.units})`;
};

uploadFileForm.addEventListener(`change`, onUploadFileFormChange);

effectLevelPin.addEventListener(`mouseup`, function (evt) {
  const levelValue = Math.round(evt.target.offsetLeft / evt.target.parentElement.offsetWidth * 100);
  effectLevelValueInput.value = levelValue;

  changeEffectLevel(levelValue);
});

// Валидация хеш-тегов:

hashtagsInput.addEventListener(`input`, function (evt) {
  const hashtagsArray = evt.target.value.toLowerCase().split(` `);
  const isInvalidHashtagInArray = !hashtagsArray.every((item) => ((item) === `` || HASHTAG_VALIDITY_REGEX.test(item)));
  const isDuplicateHashtagInArray = !hashtagsArray.every((item, index, array) => (array.indexOf(item) === index));

  if (hashtagsArray.length > MAX_HASHTAGS_COUNT) {
    hashtagsInput.setCustomValidity(InvalidMessage.TOO_MANY_HASHTAGS);
  } else if (isInvalidHashtagInArray) {
    hashtagsInput.setCustomValidity(InvalidMessage.HASHTAG_INVALID);
  } else if (isDuplicateHashtagInArray) {
    hashtagsInput.setCustomValidity(InvalidMessage.HASHTAG_DUPLICATE);
  } else {
    hashtagsInput.setCustomValidity(``);
  }
});

// Валидация комментария:

commentInput.addEventListener(`invalid`, function () {
  if (commentInput.validity.tooLong) {
    commentInput.setCustomValidity(InvalidMessage.COMMENT_TOO_LONG);
  } else {
    commentInput.setCustomValidity(``);
  }
});

commentInput.addEventListener(`input`, function (evt) {
  const valueLength = evt.target.value.length;

  if (valueLength > MAX_COMMENT_INPUT_LENGTH) {
    commentInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_COMMENT_INPUT_LENGTH) + ` симв.`);
  } else {
    commentInput.setCustomValidity(``);
  }

  commentInput.reportValidity();
});
