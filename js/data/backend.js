'use strict';

(function () {
  const URL_LOAD = `https://21.javascript.pages.academy/kekstagram/data`;

  const TIMEOUT_IN_MS = 10000;

  const StatusCode = {
    OK: 200
  };


  const backend = {};

  backend.loadErrorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `20px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const createRequestObject = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  backend.load = function (onLoad, onError) {
    const xhr = createRequestObject(onLoad, onError);

    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  };

  window.backend = backend;
})();
