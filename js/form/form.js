'use strict';
// Загрузка изображения и показ формы редактирования:

(function () {
  const doIfEscEvent = window.util.keyboard.doIfEscEvent;
  const doIfEnterEvent = window.util.keyboard.doIfEnterEvent;
  const pageBody = window.preview.pageBody;
  const uploadFileForm = window.pictureSize.uploadFileForm;
  const imgSizeValueInput = window.pictureSize.imgSizeValueInput;
  const imgUploadPreview = window.pictureSize.imgUploadPreview;
  const changePictureSize = window.pictureSize.changePictureSize;

  const uploadFileInput = document.querySelector(`#upload-file`);
  const uploadFileCloseBtn = uploadFileForm.querySelector(`#upload-cancel`);
  const hashtagsInput = uploadFileForm.querySelector(`.text__hashtags`);
  const commentInput = uploadFileForm.querySelector(`.text__description`);
  const effectLevelSlider = uploadFileForm.querySelector(`.img-upload__effect-level`);

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
    effectLevelSlider.classList.add(`hidden`);
  };

  const openPopup = function () {
    uploadFileForm.classList.remove(`hidden`);
    pageBody.classList.add(`modal-open`);

    resetImgParams();

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = function () {
    uploadFileForm.classList.add(`hidden`);
    uploadFileInput.value = ``;
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

  window.form = form;
})();

