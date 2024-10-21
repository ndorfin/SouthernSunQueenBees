import CONSTANTS from './lib/constants.js';

const LS_CREDENTIAL_KEYS = ['space', 'token'],
      DIALOG_SELECTOR = '#dialog_credentials';

class ContentfulCredentials extends HTMLElement {

  #checkLS() {
    const lsValue = JSON.parse(window.localStorage.getItem(CONSTANTS.CONTENTFUL.LOCAL_STORAGE_KEY));
    return !!lsValue && Object.keys(lsValue).length === LS_CREDENTIAL_KEYS.length;
  }

  #saveToLS(formData) {
    let credentialsObject = {};
    LS_CREDENTIAL_KEYS.forEach(keyName => {
      credentialsObject[keyName] = formData.get(keyName);
    })
    window.localStorage.setItem(CONSTANTS.CONTENTFUL.LOCAL_STORAGE_KEY, JSON.stringify(credentialsObject));
  }

  #handleCredentialsSubmit(event) {
    if (event.target.closest(DIALOG_SELECTOR)) {
      event.preventDefault();
      let formData = new FormData(event.target.closest('form'));
      this.#saveToLS(formData);
      this.querySelector(DIALOG_SELECTOR).close();
    }
  }

  connectedCallback() {
    if (!this.#checkLS()) {
      this.querySelector(DIALOG_SELECTOR).showModal();
      this.addEventListener('submit', this.#handleCredentialsSubmit.bind(this));
    }
  }
}

export default ContentfulCredentials;
