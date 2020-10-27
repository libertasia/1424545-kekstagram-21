'use strict';

(function () {
  const PICTURES_COUNT = 10;

  const getRandomInt = window.util.getRandomInt;
  const renderPictures = window.picture.renderPictures;

  const defaultBtn = document.querySelector(`#filter-default`);
  const randomBtn = document.querySelector(`#filter-random`);
  const discussedBtn = document.querySelector(`#filter-discussed`);

  const isPropertyValueUsed = (propertyName, propertyValue, objArray) => {
    for (let i = 0; i < objArray.length; i++) {
      if (propertyValue === objArray[i][propertyName]) {
        return true;
      }
    }
    return false;
  };

  const generateRandomPictures = (count) => {
    const randomPictures = [];
    let picture = {};
    for (let i = 0; i < count; i++) {
      do {
        picture = window.picture.picturesData[getRandomInt(0, window.picture.picturesData.length - 1)];
      }
      while (isPropertyValueUsed(`id`, picture.id, randomPictures));

      randomPictures.push(picture);
    }
    return randomPictures;
  };

  const getRank = (picture) => {
    return picture.comments.length;
  };

  const sortPictures = (pictures) => {
    const sortedPictures = pictures.sort((left, right) => {
      const rankDiff = getRank(right) - getRank(left);
      return rankDiff;
    });
    return sortedPictures;
  };

  const generateDiscussedPictures = () => {
    return sortPictures(window.picture.picturesData);
  };

  const setActiveBtn = (btn) => {
    const prevBtn = document.querySelector(`.img-filters__button--active`);
    if (prevBtn !== btn) {
      prevBtn.classList.remove(`img-filters__button--active`);
      btn.classList.add(`img-filters__button--active`);
    }
  };

  const onDefaultBtnClick = (evt) => {
    setActiveBtn(evt.target);
    renderPictures(window.picture.picturesData);
  };

  const onRandomBtnClick = (evt) => {
    setActiveBtn(evt.target);
    renderPictures(generateRandomPictures(PICTURES_COUNT));
  };

  const onDiscussedBtnClick = (evt) => {
    setActiveBtn(evt.target);
    renderPictures(generateDiscussedPictures());
  };

  defaultBtn.addEventListener(`click`, onDefaultBtnClick);
  randomBtn.addEventListener(`click`, window.debounce(onRandomBtnClick));
  discussedBtn.addEventListener(`click`, onDiscussedBtnClick);

})();
