'use strict';
// Редактирование размера изображения(Масштаб):

(function () {
  const PICTURE_SCALE_STEP = 25;

  const MIN_PICTURE_SIZE = 25;

  const MAX_PICTURE_SIZE = 100;

  const uploadFileForm = document.querySelector(`.img-upload__overlay`);
  const increaseImgSizeBtn = uploadFileForm.querySelector(`.scale__control--bigger`);
  const decreaseImgSizeBtn = uploadFileForm.querySelector(`.scale__control--smaller`);
  const imgSizeValueInput = uploadFileForm.querySelector(`.scale__control--value`);
  const imgUploadPreview = uploadFileForm.querySelector(`.img-upload__preview img`);

  const pictureSize = {};

  pictureSize.uploadFileForm = uploadFileForm;
  pictureSize.imgSizeValueInput = imgSizeValueInput;
  pictureSize.imgUploadPreview = imgUploadPreview;

  const changePictureSize = function () {
    const currentValue = parseInt(imgSizeValueInput.value, 10);
    imgUploadPreview.style.transform = `scale(${currentValue / MAX_PICTURE_SIZE})`;
  };

  const increaseImgSizeValueInput = function () {
    const currentValue = parseInt(imgSizeValueInput.value, 10);
    let newValue = currentValue + PICTURE_SCALE_STEP;
    if (newValue > MAX_PICTURE_SIZE) {
      newValue = MAX_PICTURE_SIZE;
    }
    imgSizeValueInput.value = `${newValue}%`;
  };

  const decreaseImgSizeValueInput = function () {
    const currentValue = parseInt(imgSizeValueInput.value, 10);
    let newValue = currentValue - PICTURE_SCALE_STEP;
    if (newValue < MIN_PICTURE_SIZE) {
      newValue = MIN_PICTURE_SIZE;
    }
    imgSizeValueInput.value = `${newValue}%`;
  };

  increaseImgSizeBtn.addEventListener(`click`, function () {
    increaseImgSizeValueInput();
    changePictureSize();
  });

  decreaseImgSizeBtn.addEventListener(`click`, function () {
    decreaseImgSizeValueInput();
    changePictureSize();
  });

  pictureSize.changePictureSize = changePictureSize;
  window.pictureSize = pictureSize;
})();

