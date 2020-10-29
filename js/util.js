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

  util.isPropertyValueUsed = (propertyName, propertyValue, objArray) => {
    for (let i = 0; i < objArray.length; i++) {
      if (propertyValue === objArray[i][propertyName]) {
        return true;
      }
    }
    return false;
  };

  util.debounce = (cb, interval = 500) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, interval);
    };
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
