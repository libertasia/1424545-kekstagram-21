'use strict';
// Наложение эффекта на изображение:

(function () {
  const MAX_EFFECT_LEVEL_VALUE = 100;

  const uploadFileContainer = window.pictureSize.uploadFileContainer;
  const imgUploadPreview = window.pictureSize.imgUploadPreview;
  const effectLevelSlider = window.form.effectLevelSlider;
  const initSlider = window.slider.initSlider;

  const effectLevelPin = uploadFileContainer.querySelector(`.effect-level__pin`);
  const effectLevelDepth = uploadFileContainer.querySelector(`.effect-level__depth`);
  const effectLevelValueInput = uploadFileContainer.querySelector(`.effect-level__value`);

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

  const resetEffectLevel = function () {
    imgUploadPreview.style.filter = ``;
    effectLevelValueInput.value = MAX_EFFECT_LEVEL_VALUE;
    effectLevelPin.style.left = `${MAX_EFFECT_LEVEL_VALUE}%`;
    effectLevelDepth.style.width = `${MAX_EFFECT_LEVEL_VALUE}%`;
  };

  const onUploadFileContainerChange = function (evt) {
    if (evt.target.matches(`input[type="radio"]`)) {
      resetEffectLevel();

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
    const value = activeFilter.min + (activeFilter.max - activeFilter.min) * levelValue / MAX_EFFECT_LEVEL_VALUE;

    imgUploadPreview.style.filter = `${activeFilter.type}(${value}${activeFilter.units})`;
    effectLevelValueInput.value = levelValue;
  };

  uploadFileContainer.addEventListener(`change`, onUploadFileContainerChange);

  initSlider(changeEffectLevel);
})();
