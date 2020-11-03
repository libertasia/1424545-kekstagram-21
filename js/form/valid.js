'use strict';
// Валидация хеш-тегов:

const InvalidMessage = {
  HASHTAG_INVALID: `
  Не удовлетворяет условиям:
  1. хэш-тег начинается с символа # (решётка);
  2. строка после решётки должна состоять из букв и чисел;
  3. хеш-тег не может состоять только из одной решётки;
  4. максимальная длина одного хэш-тега 20 символов, включая решётку;
  5. хэш-теги разделяются пробелами;`,
  HASHTAG_DUPLICATE: `хэш-теги нечувствительны к регистру, один и тот же хэш-тег не может быть использован дважды;`,
  TOO_MANY_HASHTAGS: `нельзя указать больше пяти хэш-тегов;`
};
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_VALIDITY_REGEX = RegExp(`^#[a-zA-Z0-9а-яА-ЯёЁ]{1,19}$`);

const hashtagsInput = window.form.hashtagsInput;

hashtagsInput.addEventListener(`input`, (evt) => {
  const hashtagsArray = evt.target.value.toLowerCase().split(` `);
  const isInvalidHashtagInArray = !hashtagsArray.every((item) => ((item) === `` || HASHTAG_VALIDITY_REGEX.test(item)));
  const isDuplicateHashtagInArray = !hashtagsArray.every((item, index, array) => (array.indexOf(item) === index));

  if (hashtagsArray.length > MAX_HASHTAGS_COUNT) {
    hashtagsInput.setCustomValidity(InvalidMessage.TOO_MANY_HASHTAGS);
  } else if (isInvalidHashtagInArray) {
    hashtagsInput.setCustomValidity(InvalidMessage.HASHTAG_INVALID);
  } else if (isDuplicateHashtagInArray) {
    hashtagsInput.setCustomValidity(InvalidMessage.HASHTAG_DUPLICATE);
  } else {
    hashtagsInput.setCustomValidity(``);
  }
});

