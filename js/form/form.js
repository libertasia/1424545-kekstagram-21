'use strict';
// Загрузка изображения и показ формы редактирования:

(function () {
  const doIfEscEvent = window.util.keyboard.doIfEscEvent;
  const doIfEnterEvent = window.util.keyboard.doIfEnterEvent;
  const pageBody = window.preview.pageBody;
  const uploadFileContainer = window.pictureSize.uploadFileContainer;
  const imgSizeValueInput = window.pictureSize.imgSizeValueInput;
  const imgUploadPreview = window.pictureSize.imgUploadPreview;
  const changePictureSize = window.pictureSize.changePictureSize;
  const backendSave = window.backend.save;

  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadFileCloseBtn = uploadFileContainer.querySelector(`#upload-cancel`);
  const hashtagsInput = uploadFileContainer.querySelector(`.text__hashtags`);
  const commentInput = uploadFileContainer.querySelector(`.text__description`);
  const effectLevelSlider = uploadFileContainer.querySelector(`.img-upload__effect-level`);
  const rbtEffectNone = uploadFileContainer.querySelector(`#effect-none`);
  const pageMain = pageBody.querySelector(`main`);
  const imgUploadForm = document.querySelector(`.img-upload__form`);

  const uploadSuccessMessage = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

  const uploadSuccessMessageCloseBtn = uploadSuccessMessage.querySelector(`.success__button`);
  const uploadSuccessMessageDiv = uploadSuccessMessage.querySelector(`.success__inner`);

  const uploadErrorMessage = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

  const uploadErrorMessageCloseBtn = uploadErrorMessage.querySelector(`.error__button`);
  const uploadErrorMessageDiv = uploadErrorMessage.querySelector(`.error__inner`);

  const form = {};

  form.hashtagsInput = hashtagsInput;
  form.effectLevelSlider = effectLevelSlider;

  const onPopupEscPress = function (evt) {
    if (document.activeElement !== hashtagsInput && document.activeElement !== commentInput) {
      doIfEscEvent(evt, closePopup);
    }
  };

  const resetImgParams = function () {
    imgSizeValueInput.value = `100%`;
    changePictureSize();
    imgUploadPreview.classList.remove(...imgUploadPreview.classList);
    rbtEffectNone.checked = true;
    effectLevelSlider.classList.add(`hidden`);
  };

  const openPopup = function () {
    uploadFileContainer.classList.remove(`hidden`);
    pageBody.classList.add(`modal-open`);

    resetImgParams();

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = function () {
    uploadFileContainer.classList.add(`hidden`);
    uploadFileInput.value = ``;
    hashtagsInput.value = ``;
    commentInput.value = ``;

    resetImgParams();

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
    doIfEnterEvent(evt, closePopup);
  });

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

  const onUploadSuccessMouseUp = function (evt) {
    if (!isElementTarget(evt, uploadSuccessMessageDiv)) {
      closeUploadSuccessMessage();
    }
  };

  const onUploadErrorMouseUp = function (evt) {
    if (!isElementTarget(evt, uploadErrorMessageDiv)) {
      closeUploadErrorMessage();
    }
  };

  const onSuccessMessageEscPress = function (evt) {
    doIfEscEvent(evt, closeUploadSuccessMessage);
  };

  const onErrorMessageEscPress = function (evt) {
    doIfEscEvent(evt, closeUploadErrorMessage);
  };

  const onSuccessMessageCloseBtnKeydown = function (evt) {
    doIfEnterEvent(evt, closeUploadSuccessMessage);
  };

  const onErrorMessageCloseBtnKeydown = function (evt) {
    doIfEnterEvent(evt, closeUploadErrorMessage);
  };

  const closeUploadSuccessMessage = function () {
    pageMain.removeChild(uploadSuccessMessage);

    document.removeEventListener(`keydown`, onSuccessMessageEscPress);
    document.removeEventListener(`mouseup`, onUploadSuccessMouseUp);

    uploadSuccessMessageCloseBtn.removeEventListener(`click`, closeUploadSuccessMessage);
    uploadSuccessMessageCloseBtn.removeEventListener(`keydown`, onSuccessMessageCloseBtnKeydown);
  };

  const closeUploadErrorMessage = function () {
    pageMain.removeChild(uploadErrorMessage);

    document.removeEventListener(`keydown`, onErrorMessageEscPress);
    document.removeEventListener(`mouseup`, onUploadErrorMouseUp);

    uploadErrorMessageCloseBtn.removeEventListener(`click`, closeUploadErrorMessage);
    uploadErrorMessageCloseBtn.removeEventListener(`keydown`, onErrorMessageCloseBtnKeydown);
  };

  const onUploadSuccessCallback = function () {
    pageMain.appendChild(uploadSuccessMessage);

    document.addEventListener(`keydown`, onSuccessMessageEscPress);
    document.addEventListener(`mouseup`, onUploadSuccessMouseUp);

    uploadSuccessMessageCloseBtn.addEventListener(`click`, closeUploadSuccessMessage);
    uploadSuccessMessageCloseBtn.addEventListener(`keydown`, onSuccessMessageCloseBtnKeydown);
  };

  const onUploadErrorCallback = function () {
    pageMain.appendChild(uploadErrorMessage);

    document.addEventListener(`keydown`, onErrorMessageEscPress);
    document.addEventListener(`mouseup`, onUploadErrorMouseUp);

    uploadErrorMessageCloseBtn.addEventListener(`click`, closeUploadErrorMessage);
    uploadErrorMessageCloseBtn.addEventListener(`keydown`, onErrorMessageCloseBtnKeydown);
  };

  const onImgFormUpload = function (evt) {
    evt.preventDefault();
    const formData = new FormData(imgUploadForm);
    backendSave(formData, onUploadSuccessCallback, onUploadErrorCallback);
    closePopup();
  };

  imgUploadForm.addEventListener(`submit`, onImgFormUpload);

  window.form = form;
})();

