'use strict';

(function () {
  const PERCENT_MULTIPLIER = 100;

  const effectLevelPin = document.querySelector(`.effect-level__pin`);
  const effectLevelDepth = document.querySelector(`.effect-level__depth`);

  const slider = {};

  const onEffectLevelPinMouseDown = (evt, callback) => {
    evt.preventDefault();
    let startCoordX = evt.clientX;

    const onEffectLevelPinMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shiftX = startCoordX - moveEvt.clientX;
      const pinMaxPose = effectLevelPin.parentElement.offsetWidth;
      const newPinPos = effectLevelPin.offsetLeft - shiftX;
      if (newPinPos >= 0 && newPinPos <= pinMaxPose) {

        effectLevelPin.style.left = `${newPinPos}px`;

        const levelValue = Math.round(effectLevelPin.offsetLeft / pinMaxPose * PERCENT_MULTIPLIER);

        effectLevelDepth.style.width = `${levelValue}%`;

        startCoordX = moveEvt.clientX;

        callback(levelValue);
      }
    };

    const onEffectLevelPinMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onEffectLevelPinMouseMove);
      document.removeEventListener(`mouseup`, onEffectLevelPinMouseUp);
    };

    document.addEventListener(`mousemove`, onEffectLevelPinMouseMove);
    document.addEventListener(`mouseup`, onEffectLevelPinMouseUp);
  };

  slider.initSlider = (callback) => {
    effectLevelPin.addEventListener(`mousedown`, (evt) => {
      if (typeof callback === `function`) {
        onEffectLevelPinMouseDown(evt, callback);
      }
    });
  };

  window.slider = slider;
})();
