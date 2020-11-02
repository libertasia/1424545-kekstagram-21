'use strict';

const ERROR = `error`;
const SUCCESS = `success`;

const doIfEscEvent = window.util.keyboard.doIfEscEvent;
const doIfEnterEvent = window.util.keyboard.doIfEnterEvent;

const pageMain = document.querySelector(`main`);
const successMessage = document.querySelector(`#success`)
.content
.querySelector(`.success`);
const errorMessage = document.querySelector(`#error`)
.content
.querySelector(`.error`);

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

const showResultMessage = (status) => {
  const msgSection = pageMain.querySelector(`.${status}`);
  const msgCloseBtn = msgSection.querySelector(`.${status}__button`);
  toggleMessage(msgSection);

  const closeResultMessage = () => {
    toggleMessage(msgSection);

    document.removeEventListener(`keydown`, onDocumentKeydown);
    document.removeEventListener(`click`, onMessagePopupClick);
    msgCloseBtn.removeEventListener(`click`, onMsgCloseBtnClick);
    msgCloseBtn.removeEventListener(`keydown`, onMsgCloseBtnKeydown);
  };

  const onMsgCloseBtnClick = () => {
    closeResultMessage();
  };

  const onMsgCloseBtnKeydown = (evt) => {
    doIfEnterEvent(evt, closeResultMessage);
  };

  const onDocumentKeydown = (evt) => {
    doIfEscEvent(evt, closeResultMessage);
  };

  const onMessagePopupClick = ({target}) => {
    if (target.className === status) {
      closeResultMessage();
    }
  };

  document.addEventListener(`keydown`, onDocumentKeydown);
  document.addEventListener(`click`, onMessagePopupClick);
  msgCloseBtn.addEventListener(`click`, onMsgCloseBtnClick);
  msgCloseBtn.addEventListener(`keydown`, onMsgCloseBtnKeydown);
};

uploadResult.onUploadSuccessCallback = () => {
  showResultMessage(SUCCESS);
};

uploadResult.onUploadErrorCallback = () => {
  showResultMessage(ERROR);
};

renderResultMessages();

window.uploadResult = uploadResult;
