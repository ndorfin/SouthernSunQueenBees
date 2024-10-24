const LS_CREDENTIAL_KEYS = ['space', 'token'],
      DIALOG_SELECTOR = '#dialog_credentials',
      LOCAL_STORAGE_KEY = 'contentful-credentials';

class PreviewForm extends HTMLElement {

  #getEntry(formData) {
    let CF_ENTRY_URL = 'https://preview.contentful.com';
    /* Build up the Contentful API Entry URL */
    CF_ENTRY_URL += `/entries/${ formData.get('entry_id') }`;
    CF_ENTRY_URL += `/environments/master`;
    CF_ENTRY_URL += `/spaces/${ formData.get('space') }`;
    CF_ENTRY_URL += `?access_token=${ formData.get('token') }`;

    return fetch(CF_ENTRY_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      });
  }

  #saveToLS(formData) {
    /* Create a hash/object that we can store in localStorage */
    let credentialsObject = {};
    LS_CREDENTIAL_KEYS.forEach(keyName => {
      credentialsObject[keyName] = formData.get(keyName);
    })
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(credentialsObject));
  }

  #handleCredentialsSubmit(event) {
    if (event.target.closest(DIALOG_SELECTOR)) {
      event.preventDefault();
      let formData = new FormData(event.target.closest('form'));
      /* Overwrite any previously saved contentful credentials in localStorage */
      this.#saveToLS(formData);
      /* Get the entry's JSON from Contentful */
      this.#getEntry(formData).then(({fields}) => {
        /* Get the calling page's `buildPage` function to render the preview */
        window.buildPage(fields);
        /* We're done with the preview-form's dialog */
        this.querySelector(DIALOG_SELECTOR).close();
      });
    }
  }

  #addCFCredentialsToForm() {
    /* Read from localStorage, for any previously saved parameters */
    const LS_CREDENTIALS = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))
    if (LS_CREDENTIALS) {
      LS_CREDENTIAL_KEYS.forEach(keyName => {
        /* Copy each parameter to the preview form's related field */
        this.querySelector(`[name="${ keyName }"]`).value = LS_CREDENTIALS[keyName];
      })
    }
  }

  #addEntryIdToForm() {
    /* Check if the entry ID is present in the URL */
    const entryId = new URL(window.location).searchParams.get('id');

    /* If so, add it to the preview form */
    if (entryId) this.querySelector('[name="entry_id"]').value = entryId;
  }

  connectedCallback() {
    /* Add any existing parameters to the preview form */
    this.#addEntryIdToForm();
    this.#addCFCredentialsToForm();

    /* Show the preview form dialog */
    this.querySelector(DIALOG_SELECTOR).showModal();

    /* Attach a submit event listener to the preview form */
    this.addEventListener('submit', this.#handleCredentialsSubmit.bind(this));
  }
}

export default PreviewForm;
