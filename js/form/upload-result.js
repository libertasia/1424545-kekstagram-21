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
  const successMessageDiv = successMessage.querySelector(`.success__inner`);
  const errorMessageCloseBtn = errorMessage.querySelector(`.error__button`);
  const errorMessageDiv = errorMessage.querySelector(`.error__inner`);

  const uploadResult = {};

  const renderResultMessages = function () {
    pageMain.appendChild(successMessage);
    pageMain.appendChild(errorMessage);
    toggleMessage(successMessage);
    toggleMessage(errorMessage);
  };

  const toggleMessage = function (msg) {
    msg.classList.toggle(`hidden`);
  };

  const isElementTarget = function (evt, element) {
    if (evt.target === element) {
      return true;
    }
    const children = Array.from(element.children);
    let isChildClicked = false;
    children.forEach((child) => {
      if (evt.target === child) {
        isChildClicked = true;
      }
    });
    return isChildClicked;
  };

  const onSuccessMessageMouseUp = function (evt) {
    if (!isElementTarget(evt, successMessageDiv)) {
      onSuccessMessageClose();
    }
  };

  const onErrorMessageMouseUp = function (evt) {
    if (!isElementTarget(evt, errorMessageDiv)) {
      onErrorMessageClose();
    }
  };

  const onSuccessMessageEscPress = function (evt) {
    doIfEscEvent(evt, onSuccessMessageClose);
  };

  const onErrorMessageEscPress = function (evt) {
    doIfEscEvent(evt, onErrorMessageClose);
  };

  const onSuccessMessageCloseBtnKeydown = function (evt) {
    doIfEnterEvent(evt, onSuccessMessageClose);
  };

  const onErrorMessageCloseBtnKeydown = function (evt) {
    doIfEnterEvent(evt, onErrorMessageClose);
  };

  const onSuccessMessageClose = function () {
    toggleMessage(successMessage);

    document.removeEventListener(`keydown`, onSuccessMessageEscPress);
    document.removeEventListener(`mouseup`, onSuccessMessageMouseUp);

    successMessageCloseBtn.removeEventListener(`click`, onSuccessMessageClose);
    successMessageCloseBtn.removeEventListener(`keydown`, onSuccessMessageCloseBtnKeydown);
  };

  const onErrorMessageClose = function () {
    toggleMessage(errorMessage);

    document.removeEventListener(`keydown`, onErrorMessageEscPress);
    document.removeEventListener(`mouseup`, onErrorMessageMouseUp);

    errorMessageCloseBtn.removeEventListener(`click`, onErrorMessageClose);
    errorMessageCloseBtn.removeEventListener(`keydown`, onErrorMessageCloseBtnKeydown);
  };

  uploadResult.onUploadSuccessCallback = function () {
    toggleMessage(successMessage);

    document.addEventListener(`keydown`, onSuccessMessageEscPress);
    document.addEventListener(`mouseup`, onSuccessMessageMouseUp);

    successMessageCloseBtn.addEventListener(`click`, onSuccessMessageClose);
    successMessageCloseBtn.addEventListener(`keydown`, onSuccessMessageCloseBtnKeydown);
  };

  uploadResult.onUploadErrorCallback = function () {
    toggleMessage(errorMessage);

    document.addEventListener(`keydown`, onErrorMessageEscPress);
    document.addEventListener(`mouseup`, onErrorMessageMouseUp);

    errorMessageCloseBtn.addEventListener(`click`, onErrorMessageClose);
    errorMessageCloseBtn.addEventListener(`keydown`, onErrorMessageCloseBtnKeydown);
  };

  renderResultMessages();

  window.uploadResult = uploadResult;
})();
