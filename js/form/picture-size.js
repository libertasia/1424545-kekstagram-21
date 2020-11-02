'use strict';
// Редактирование размера изображения(Масштаб):

const PICTURE_SCALE_STEP = 25;
const MIN_PICTURE_SIZE = 25;
const MAX_PICTURE_SIZE = 100;

const uploadFileContainer = document.querySelector(`.img-upload__overlay`);
const increaseImgSizeBtn = uploadFileContainer.querySelector(`.scale__control--bigger`);
const decreaseImgSizeBtn = uploadFileContainer.querySelector(`.scale__control--smaller`);
const imgSizeValueInput = uploadFileContainer.querySelector(`.scale__control--value`);
const imgUploadPreview = uploadFileContainer.querySelector(`.img-upload__preview img`);

const pictureSize = {};

pictureSize.uploadFileContainer = uploadFileContainer;
pictureSize.imgSizeValueInput = imgSizeValueInput;
pictureSize.imgUploadPreview = imgUploadPreview;

const changePictureSize = () => {
  const currentValue = parseInt(imgSizeValueInput.value, 10);
  imgUploadPreview.style.transform = `scale(${currentValue / MAX_PICTURE_SIZE})`;
};

const increaseImgSizeValueInput = () => {
  const currentValue = parseInt(imgSizeValueInput.value, 10);
  let newValue = currentValue + PICTURE_SCALE_STEP;
  if (newValue > MAX_PICTURE_SIZE) {
    newValue = MAX_PICTURE_SIZE;
  }
  imgSizeValueInput.value = `${newValue}%`;
};

const decreaseImgSizeValueInput = () => {
  const currentValue = parseInt(imgSizeValueInput.value, 10);
  let newValue = currentValue - PICTURE_SCALE_STEP;
  if (newValue < MIN_PICTURE_SIZE) {
    newValue = MIN_PICTURE_SIZE;
  }
  imgSizeValueInput.value = `${newValue}%`;
};

increaseImgSizeBtn.addEventListener(`click`, () =>{
  increaseImgSizeValueInput();
  changePictureSize();
});

decreaseImgSizeBtn.addEventListener(`click`, () => {
  decreaseImgSizeValueInput();
  changePictureSize();
});

pictureSize.changePictureSize = changePictureSize;
window.pictureSize = pictureSize;
