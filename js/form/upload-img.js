'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const uploadFileInput = window.form.uploadFileInput;
const imgUploadPreview = window.pictureSize.imgUploadPreview;

const imgUploadThumbnails = document.querySelectorAll(`.effects__preview`);

uploadFileInput.addEventListener(`change`, () => {
  const file = uploadFileInput.files[0];
  const fileType = file.type.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileType.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      imgUploadPreview.src = reader.result;
      imgUploadThumbnails.forEach((elem) => {
        elem.style.backgroundImage = `url("${reader.result}")`;
      });
    });

    reader.readAsDataURL(file);
  }
});
