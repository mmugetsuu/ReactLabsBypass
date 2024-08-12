const { bypassReact } = require('../main/bypass');

bypassReact({
    url: 'https://arizona-rp.com/'
  }).then((html) => console.log(`HTML: ${html}`))
    .catch(err => console.error(err));
