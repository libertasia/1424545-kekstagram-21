'use strict';

(function () {
  const Key = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  const util = {};

  const keyboard = {};

  util.getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  keyboard.doIfEscEvent = (evt, callback) => {
    if (evt.key === Key.ESC) {
      callback();
    }
  };

  keyboard.doIfEnterEvent = (evt, callback) => {
    if (evt.key === Key.ENTER) {
      callback();
    }
  };

  util.keyboard = keyboard;

  window.util = util;
})();
