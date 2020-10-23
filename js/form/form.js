'use strict';
// Загрузка изображения и показ формы редактирования:

(function () {
  const MAX_IMG_SIZE_VALUE = `100%`;

  const doIfEscEvent = window.util.keyboard.doIfEscEvent;
  const doIfEnterEvent = window.util.keyboard.doIfEnterEvent;
  const pageBody = window.preview.pageBody;
  const uploadFileContainer = window.pictureSize.uploadFileContainer;
  const imgSizeValueInput = window.pictureSize.imgSizeValueInput;
  const imgUploadPreview = window.pictureSize.imgUploadPreview;
  const changePictureSize = window.pictureSize.changePictureSize;
  const backendSave = window.backend.save;
  const onUploadSuccessCallback = window.uploadResult.onUploadSuccessCallback;
  const onUploadErrorCallback = window.uploadResult.onUploadErrorCallback;

  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadFileCloseBtn = uploadFileContainer.querySelector(`#upload-cancel`);
  const hashtagsInput = uploadFileContainer.querySelector(`.text__hashtags`);
  const commentInput = uploadFileContainer.querySelector(`.text__description`);
  const effectLevelSlider = uploadFileContainer.querySelector(`.img-upload__effect-level`);
  const rbtEffectNone = uploadFileContainer.querySelector(`#effect-none`);
  const imgUploadForm = document.querySelector(`.img-upload__form`);

  const form = {};

  form.hashtagsInput = hashtagsInput;
  form.effectLevelSlider = effectLevelSlider;

  const onPopupEscPress = function (evt) {
    if (document.activeElement !== hashtagsInput && document.activeElement !== commentInput) {
      doIfEscEvent(evt, closePopup);
    }
  };

  const resetImgParams = function () {
    imgSizeValueInput.value = MAX_IMG_SIZE_VALUE;
    changePictureSize();
    imgUploadPreview.classList.remove(...imgUploadPreview.classList);
    imgUploadPreview.style.filter = ``;
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

  const onImgFormUpload = function (evt) {
    evt.preventDefault();
    const formData = new FormData(imgUploadForm);
    backendSave(formData, onUploadSuccessCallback, onUploadErrorCallback);
    closePopup();
  };

  imgUploadForm.addEventListener(`submit`, onImgFormUpload);

  window.form = form;
})();

