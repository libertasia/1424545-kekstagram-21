'use strict';

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
  return objArray.some((element) => propertyValue === element[propertyName]);
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
    callback(evt);
  }
};

util.keyboard = keyboard;

window.util = util;
