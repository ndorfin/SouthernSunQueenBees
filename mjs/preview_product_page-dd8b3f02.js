import getEntry from 'lib/get-entry-36957122.js';

await getEntry().then(({fields}) => {

  document.body.classList.add(`page_${parameterize(fields.url)}`);
});
