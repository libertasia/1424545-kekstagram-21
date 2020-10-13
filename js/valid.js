'use strict';
// Валидация хеш-тегов:

(function () {
  hashtagsInput.addEventListener(`input`, function (evt) {
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
})();
