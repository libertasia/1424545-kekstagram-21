'use strict';

(function () {
  const backendLoad = window.backend.load;

  const onLoadErrorCallback = window.backend.onLoadErrorCallback;

  const userPictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

  const picture = {};

  const createPictureElement = function (pictureObj) {
    const pictureElement = userPictureTemplate.cloneNode(true);

    pictureElement.id = pictureObj.id;
    pictureElement.querySelector(`.picture__img`).src = pictureObj.url;
    pictureElement.querySelector(`.picture__likes`).textContent = pictureObj.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = pictureObj.comments.length;

    return pictureElement;
  };

  const renderPictures = function (picturesData) {
    picture.picturesData = picturesData;
    const fragment = document.createDocumentFragment();
    const usersPictures = document.querySelector(`.pictures`);

    picturesData.forEach((pictureObj, index) => {
      pictureObj.id = `photo-${index}`;
      const pictureEl = createPictureElement(pictureObj);
      fragment.appendChild(pictureEl);
    });

    usersPictures.appendChild(fragment);
  };

  backendLoad(renderPictures, onLoadErrorCallback);

  window.picture = picture;
})();
