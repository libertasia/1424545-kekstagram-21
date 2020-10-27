'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 1000; // ms

  window.debounce = (cb) => {
    const lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
