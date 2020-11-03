'use strict';

const URL_LOAD = `https://21.javascript.pages.academy/kekstagram/data`;
const URL_SAVE = `https://21.javascript.pages.academy/kekstagram`;
const TIMEOUT_IN_MS = 10000;

const HttpRequest = {
  GET: `GET`,
  POST: `POST`
};

const StatusCode = {
  OK: 200
};
const backend = {};

backend.onLoadErrorCallback = (errorMessage) => {
  const node = document.createElement(`div`);
  node.classList.add(`error-message`);

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const createRequestObject = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  return xhr;
};

backend.load = (onLoad, onError) => {
  const xhr = createRequestObject(onLoad, onError);

  xhr.open(HttpRequest.GET, URL_LOAD);
  xhr.send();
};

backend.save = (data, onLoad, onError) => {
  const xhr = createRequestObject(onLoad, onError);

  xhr.open(HttpRequest.POST, URL_SAVE);
  xhr.send(data);
};

window.backend = backend;
