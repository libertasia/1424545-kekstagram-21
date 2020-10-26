'use strict';

(function () {
  const doIfEscEvent = window.util.keyboard.doIfEscEvent;
  const doIfEnterEvent = window.util.keyboard.doIfEnterEvent;

  const pageMain = document.querySelector(`main`);
  const successMessage = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);
  const errorMessage = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);
  const successMessageCloseBtn = successMessage.querySelector(`.success__button`);
  const errorMessageCloseBtn = errorMessage.querySelector(`.error__button`);

  const uploadResult = {};

  const renderResultMessages = () => {
    pageMain.appendChild(successMessage);
    pageMain.appendChild(errorMessage);
    toggleMessage(successMessage);
    toggleMessage(errorMessage);
  };

  const toggleMessage = (msg) => {
    msg.classList.toggle(`hidden`);
  };

  const onSuccessMessageMouseUp = (evt) => {
    if (evt.target.className === `success`) {
      onSuccessMessageClose();
    }
  };

  const onErrorMessageMouseUp = (evt) => {
    if (evt.target.className === `error`) {
      onErrorMessageClose();
    }
  };

  const onSuccessMessageEscPress = (evt) => {
    doIfEscEvent(evt, onSuccessMessageClose);
  };

  const onErrorMessageEscPress = (evt) => {
    doIfEscEvent(evt, onErrorMessageClose);
  };

  const onSuccessMessageCloseBtnKeydown = (evt) => {
    doIfEnterEvent(evt, onSuccessMessageClose);
  };

  const onErrorMessageCloseBtnKeydown = (evt) => {
    doIfEnterEvent(evt, onErrorMessageClose);
  };

  const onSuccessMessageClose = () => {
    toggleMessage(successMessage);

    document.removeEventListener(`keydown`, onSuccessMessageEscPress);
    document.removeEventListener(`mouseup`, onSuccessMessageMouseUp);

    successMessageCloseBtn.removeEventListener(`click`, onSuccessMessageClose);
    successMessageCloseBtn.removeEventListener(`keydown`, onSuccessMessageCloseBtnKeydown);
  };

  const onErrorMessageClose = () => {
    toggleMessage(errorMessage);

    document.removeEventListener(`keydown`, onErrorMessageEscPress);
    document.removeEventListener(`mouseup`, onErrorMessageMouseUp);

    errorMessageCloseBtn.removeEventListener(`click`, onErrorMessageClose);
    errorMessageCloseBtn.removeEventListener(`keydown`, onErrorMessageCloseBtnKeydown);
  };

  uploadResult.onUploadSuccessCallback = () => {
    toggleMessage(successMessage);

    document.addEventListener(`keydown`, onSuccessMessageEscPress);
    document.addEventListener(`mouseup`, onSuccessMessageMouseUp);

    successMessageCloseBtn.addEventListener(`click`, onSuccessMessageClose);
    successMessageCloseBtn.addEventListener(`keydown`, onSuccessMessageCloseBtnKeydown);
  };

  uploadResult.onUploadErrorCallback = () => {
    toggleMessage(errorMessage);

    document.addEventListener(`keydown`, onErrorMessageEscPress);
    document.addEventListener(`mouseup`, onErrorMessageMouseUp);

    errorMessageCloseBtn.addEventListener(`click`, onErrorMessageClose);
    errorMessageCloseBtn.addEventListener(`keydown`, onErrorMessageCloseBtnKeydown);
  };

  renderResultMessages();

  window.uploadResult = uploadResult;
})();
