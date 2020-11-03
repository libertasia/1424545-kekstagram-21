'use strict';
// Показ формы редактирования:

const MAX_IMG_SIZE_VALUE = `100%`;

const doIfEscEvent = window.util.keyboard.doIfEscEvent;
const doIfEnterEvent = window.util.keyboard.doIfEnterEvent;
const pageBody = window.preview.pageBody;
const uploadFileContainer = window.pictureSize.uploadFileContainer;
const imgSizeValueInput = window.pictureSize.imgSizeValueInput;
const imgUploadPreview = window.pictureSize.imgUploadPreview;
const changePictureSize = window.pictureSize.change;
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
form.uploadFileInput = uploadFileInput;

const onPopupEscPress = (evt) => {
  if (document.activeElement !== hashtagsInput && document.activeElement !== commentInput) {
    doIfEscEvent(evt, closePopup);
  }
};

const resetImgParams = () => {
  imgSizeValueInput.value = MAX_IMG_SIZE_VALUE;
  changePictureSize();
  imgUploadPreview.classList.remove(...imgUploadPreview.classList);
  imgUploadPreview.style.filter = ``;
  rbtEffectNone.checked = true;
  effectLevelSlider.classList.add(`hidden`);
};

const openPopup = () => {
  uploadFileContainer.classList.remove(`hidden`);
  pageBody.classList.add(`modal-open`);

  resetImgParams();

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  uploadFileContainer.classList.add(`hidden`);
  uploadFileInput.value = ``;
  hashtagsInput.value = ``;
  commentInput.value = ``;

  resetImgParams();

  pageBody.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

uploadFileInput.addEventListener(`change`, () => {
  openPopup();
});

uploadFileCloseBtn.addEventListener(`click`, () => {
  closePopup();
});

uploadFileCloseBtn.addEventListener(`keydown`, (evt) => {
  doIfEnterEvent(evt, closePopup);
});

const onImgFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(imgUploadForm);
  backendSave(formData, onUploadSuccessCallback, onUploadErrorCallback);
  closePopup();
};

imgUploadForm.addEventListener(`submit`, onImgFormSubmit);

window.form = form;

