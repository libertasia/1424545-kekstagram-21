'use strict';

(function () {
  const effectLevelPin = document.querySelector(`.effect-level__pin`);
  const effectLevelDepth = document.querySelector(`.effect-level__depth`);

  const slider = {};

  const onEffectLevelPinMouseDown = function (evt, callback) {
    evt.preventDefault();
    let startCoordX = evt.clientX;

    const onEffectLevelPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shiftX = startCoordX - moveEvt.clientX;
      const pinMaxPose = effectLevelPin.parentElement.offsetWidth;
      const newPinPos = effectLevelPin.offsetLeft - shiftX;
      if (newPinPos >= 0 && newPinPos <= pinMaxPose) {

        effectLevelPin.style.left = `${newPinPos}px`;

        const levelValue = Math.round(effectLevelPin.offsetLeft / pinMaxPose * 100);

        effectLevelDepth.style.width = `${levelValue}%`;

        startCoordX = moveEvt.clientX;

        callback(levelValue);
      }
    };

    const onEffectLevelPinMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onEffectLevelPinMouseMove);
      document.removeEventListener(`mouseup`, onEffectLevelPinMouseUp);
    };

    document.addEventListener(`mousemove`, onEffectLevelPinMouseMove);
    document.addEventListener(`mouseup`, onEffectLevelPinMouseUp);
  };

  slider.initSlider = function (callback) {
    effectLevelPin.addEventListener(`mousedown`, function (evt) {
      if (typeof callback === `function`) {
        onEffectLevelPinMouseDown(evt, callback);
      }
    });
  };

  window.slider = slider;
})();
