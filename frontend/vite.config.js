const path = require('path');
const resolve = dir => path.join(__dirname, dir);

export default {
  alias: {
    '/@assets/': resolve('src/assets'),
    '/@api/': resolve('src/api'),
    '/@components/': resolve('src/components'),
    '/@utils/': resolve('src/utils'),
    '/@views/': resolve('src/views'),
  },
};