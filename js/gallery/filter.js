'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500; // ms
  const PICTURES_COUNT = 10;

  const getRandomInt = window.util.getRandomInt;
  const renderPictures = window.pictures.render;
  const isPropertyValueUsed = window.util.isPropertyValueUsed;
  const debounce = window.util.debounce;

  const filtersForm = document.querySelector(`.img-filters__form`);

  const filtersType = {
    'filter-default': defaultFilter,
    'filter-random': randomFilter,
    'filter-discussed': discussedFilter
  };

  const generateRandomPictures = (count) => {
    const randomPictures = [];
    let picture = {};
    for (let i = 0; i < count; i++) {
      do {
        picture = window.pictures.picturesData[getRandomInt(0, window.pictures.picturesData.length - 1)];
      }
      while (isPropertyValueUsed(`id`, picture.id, randomPictures));

      randomPictures.push(picture);
    }
    return randomPictures;
  };

  const generateDiscussedPictures = (data) => {
    const discussedPictures = data.slice(0);
    return discussedPictures.sort((a, b) => b.comments.length - a.comments.length
    );
  };

  const setActiveBtn = (btn) => {
    const prevBtn = document.querySelector(`.img-filters__button--active`);
    if (prevBtn !== btn) {
      prevBtn.classList.remove(`img-filters__button--active`);
      btn.classList.add(`img-filters__button--active`);
    }
  };

  const defaultFilter = () => {
    return window.pictures.picturesData;
  };

  const randomFilter = () => {
    return generateRandomPictures(PICTURES_COUNT);
  };

  const discussedFilter = () => {
    return generateDiscussedPictures(window.pictures.picturesData);
  };

  const onFiltersFormClick = ({target}) => {
    let currentFilter = target.id;
    const filteredData = filtersType[currentFilter]();

    setActiveBtn(target);
    renderPictures(filteredData);
  };

  filtersForm.addEventListener(`click`, debounce(onFiltersFormClick, DEBOUNCE_INTERVAL));
})();
