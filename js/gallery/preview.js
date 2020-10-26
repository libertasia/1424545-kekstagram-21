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

  const createSocialComment = (commentObj) => {
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

  const fillBigPicture = (picture) => {
    bigPicture.querySelector(`.big-picture__img`).querySelector(`img`).src = picture.url;
    bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
    bigPicture.querySelector(`.comments-count`).textContent = picture.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = picture.description;

    const comments = picture.comments.map((comment) => createSocialComment(comment));
    bigPicture.querySelector(`.social__comments`).innerHTML = comments.join(``);
  };

  const hideElements = () => {
    bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);
    bigPicture.querySelector(`.comments-loader`).classList.add(`hidden`);
  };

  const onBigPictureEscPress = (evt) => {
    doIfEscEvent(evt, closeBigPicture);
  };

  const showBigPicture = () => {
    bigPicture.classList.remove(`hidden`);
    pageBody.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onBigPictureEscPress);
  };

  const closeBigPicture = () => {
    bigPicture.classList.add(`hidden`);
    pageBody.classList.remove(`modal-open`);

    document.removeEventListener(`keydown`, onBigPictureEscPress);
  };

  bigPictureCloseBtn.addEventListener(`click`, () => {
    closeBigPicture();
  });

  bigPictureCloseBtn.addEventListener(`keydown`, (evt) => {
    doIfEnterEvent(evt, closeBigPicture);
  });

  picturesSection.addEventListener(`click`, (evt) => {
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
