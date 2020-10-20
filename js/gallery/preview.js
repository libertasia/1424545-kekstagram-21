'use strict';
// Показ/закрытие фотографии в полноразмерном режиме:

(function () {
  const SOCIAL_PICTURE_SIZE = 35;

  const doIfEscEvent = window.util.keyboard.doIfEscEvent;
  const doIfEnterEvent = window.util.keyboard.doIfEnterEvent;

  const pageBody = document.querySelector(`body`);

  const picturesSection = document.querySelector(`.pictures`);

  const bigPicture = document.querySelector(`.big-picture`);

  const bigPictureCloseBtn = bigPicture.querySelector(`.big-picture__cancel`);

  const preview = {};

  preview.pageBody = pageBody;

  const createSocialComment = function (commentObj) {
    return `
    <li class="social__comment">
    <img
      class="social__picture"
      src="${commentObj.avatar}"
      alt="${commentObj.name}"
      width="${SOCIAL_PICTURE_SIZE}" height="${SOCIAL_PICTURE_SIZE}">
    <p class="social__text">${commentObj.message}</p>
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
    doIfEscEvent(evt, closeBigPicture);
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
    doIfEnterEvent(evt, closeBigPicture);
  });

  picturesSection.addEventListener(`click`, function (evt) {
    if (evt.target.closest(`.picture`) !== null) {
      const pictureId = evt.target.closest(`.picture`).id;
      const pictureData = window.picture.picturesData.find((item) => item.id === pictureId);
      fillBigPicture(pictureData);
      hideElements();
      showBigPicture();
    }
  });

  window.preview = preview;
})();
