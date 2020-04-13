const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

(async() => {
  const files = await imagemin(
      ['img/*.jpg'],
      {
        destination: 'resized',
        plugins: [imageminMozjpeg({quality: 75})]
      }
  );
  console.log(files);
})();