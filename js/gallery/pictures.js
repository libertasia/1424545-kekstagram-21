'use strict';

const backendLoad = window.backend.load;
const onLoadErrorCallback = window.backend.onLoadErrorCallback;

const userPictureTemplate = document.querySelector(`#picture`)
.content
.querySelector(`.picture`);
const imgFiltersContainer = document.querySelector(`.img-filters`);
const usersPictures = document.querySelector(`.pictures`);

const pictures = {};
pictures.picturesData = [];

const createPictureElement = (pictureObj) => {
  const pictureElement = userPictureTemplate.cloneNode(true);

  pictureElement.id = pictureObj.id;
  pictureElement.querySelector(`.picture__img`).src = pictureObj.url;
  pictureElement.querySelector(`.picture__likes`).textContent = pictureObj.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = pictureObj.comments.length;

  return pictureElement;
};

const clearUserPictures = () => {
  const oldPictures = Array.from(usersPictures.querySelectorAll(`.picture`));
  oldPictures.forEach((elem) => usersPictures.removeChild(elem));
};

const renderPictures = (picturesData) => {
  const fragment = document.createDocumentFragment();

  picturesData.forEach((pictureObj, index) => {
    pictureObj.id = `photo-${index}`;
    const pictureEl = createPictureElement(pictureObj);
    fragment.appendChild(pictureEl);
  });
  clearUserPictures();

  usersPictures.appendChild(fragment);
};

const showImgFiltersContainer = () => {
  imgFiltersContainer.classList.remove(`img-filters--inactive`);
};

const onLoadPictures = (picturesData) => {
  renderPictures(picturesData);
  window.pictures.picturesData = [...picturesData];
  showImgFiltersContainer();
};

backendLoad(onLoadPictures, onLoadErrorCallback);

pictures.render = renderPictures;

window.pictures = pictures;

