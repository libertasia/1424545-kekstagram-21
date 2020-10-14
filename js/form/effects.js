'use strict';
// Наложение эффекта на изображение:

(function () {
  const MAX_EFFECT_LEVEL_VALUE = 100;

  const uploadFileForm = window.pictureSize.uploadFileForm;
  const imgUploadPreview = window.pictureSize.imgUploadPreview;
  const effectLevelSlider = window.form.effectLevelSlider;

  const effectLevelPin = uploadFileForm.querySelector(`.effect-level__pin`);
  const effectLevelValueInput = uploadFileForm.querySelector(`.effect-level__value`);

  let activeFilter = null;

  const effect = {
    none: {
      className: `effects__preview--none`
    },
    chrome: {
      className: `effects__preview--chrome`,
      type: `grayscale`,
      min: 0,
      max: 1,
      units: ``
    },
    sepia: {
      className: `effects__preview--sepia`,
      type: `sepia`,
      min: 0,
      max: 1,
      units: ``
    },
    marvin: {
      className: `effects__preview--marvin`,
      type: `invert`,
      min: 0,
      max: 100,
      units: `%`
    },
    phobos: {
      className: `effects__preview--phobos`,
      type: `blur`,
      min: 0,
      max: 3,
      units: `px`
    },
    heat: {
      className: `effects__preview--heat`,
      type: `brightness`,
      min: 1,
      max: 3,
      units: ``
    }
  };

  const onUploadFileFormChange = function (evt) {
    if (evt.target.matches(`input[type="radio"]`)) {
      imgUploadPreview.style.filter = ``;
      effectLevelValueInput.value = MAX_EFFECT_LEVEL_VALUE;
      imgUploadPreview.className = `effects__preview--${evt.target.value}`;
      activeFilter = effect[evt.target.value];

      if (evt.target.value === `none`) {
        effectLevelSlider.classList.add(`hidden`);
        activeFilter = null;
      } else {
        effectLevelSlider.classList.remove(`hidden`);
      }
    }
  };

  const changeEffectLevel = function (levelValue) {
    if (!activeFilter) {
      imgUploadPreview.style.filter = ``;
      return;
    }
    const value = activeFilter.min + (activeFilter.max - activeFilter.min) * levelValue / 100;

    imgUploadPreview.style.filter = `${activeFilter.type}(${value}${activeFilter.units})`;
  };

  uploadFileForm.addEventListener(`change`, onUploadFileFormChange);

  effectLevelPin.addEventListener(`mouseup`, function (evt) {
    const levelValue = Math.round(evt.target.offsetLeft / evt.target.parentElement.offsetWidth * 100);
    effectLevelValueInput.value = levelValue;

    changeEffectLevel(levelValue);
  });
})();
