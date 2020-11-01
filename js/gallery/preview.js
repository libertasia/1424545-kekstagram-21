'use strict';
// Показ/закрытие фотографии в полноразмерном режиме:

(function () {
  const SOCIAL_PICTURE_SIZE = 35;
  const COMMENTS_COUNT = 5;

  const doIfEscEvent = window.util.keyboard.doIfEscEvent;
  const doIfEnterEvent = window.util.keyboard.doIfEnterEvent;

  const pageBody = document.querySelector(`body`);
  const picturesSection = document.querySelector(`.pictures`);
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureCloseBtn = bigPicture.querySelector(`.big-picture__cancel`);
  const commentsLoaderBtn = bigPicture.querySelector(`.comments-loader`);
  const commentsCountDiv = bigPicture.querySelector(`.social__comment-count`);

  const preview = {};
  let currentPicture;
  let visibleCommentsCount = 0;

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
    bigPicture.querySelector(`.social__caption`).textContent = picture.description;

    const comments = picture.comments.slice(0, COMMENTS_COUNT).map((comment) => createSocialComment(comment));
    bigPicture.querySelector(`.social__comments`).innerHTML = comments.join(``);
    currentPicture = picture;
    visibleCommentsCount = comments.length;
    commentsCountDiv.textContent = `${visibleCommentsCount} из ${picture.comments.length} комментариев`;
  };

  const hideLoadCommentsBtn = () => {
    commentsLoaderBtn.classList.add(`hidden`);
  };

  const showLoadCommentsBtn = () => {
    commentsLoaderBtn.classList.remove(`hidden`);
  };

  const loadMoreComments = () => {
    const comments = currentPicture.comments.slice(visibleCommentsCount, visibleCommentsCount + COMMENTS_COUNT).map((comment) => createSocialComment(comment));
    bigPicture.querySelector(`.social__comments`).innerHTML += comments.join(``);
    visibleCommentsCount += comments.length;
    commentsCountDiv.textContent = `${visibleCommentsCount} из ${currentPicture.comments.length} комментариев`;
    if (visibleCommentsCount === currentPicture.comments.length) {
      hideLoadCommentsBtn();
    }
  };

  const onBigPictureEscPress = (evt) => {
    doIfEscEvent(evt, closeBigPicture);
  };

  const showBigPicture = () => {
    bigPicture.classList.remove(`hidden`);
    pageBody.classList.add(`modal-open`);

    if (currentPicture.comments.length > COMMENTS_COUNT) {
      showLoadCommentsBtn();
    } else {
      hideLoadCommentsBtn();
    }

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
      const pictureData = window.pictures.picturesData.find((item) => item.id === pictureId);
      fillBigPicture(pictureData);
      showBigPicture();
    }
  });

  commentsLoaderBtn.addEventListener(`click`, () => {
    loadMoreComments();
  });

  commentsLoaderBtn.addEventListener(`keydown`, (evt) => {
    doIfEnterEvent(evt, loadMoreComments);
  });

  window.preview = preview;
})();
