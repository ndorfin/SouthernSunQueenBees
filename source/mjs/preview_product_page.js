import getEntry from './lib/get-entry.js';

await getEntry().then(({fields}) => {

  document.body.classList.add(`page_${parameterize(fields.url)}`);
});
