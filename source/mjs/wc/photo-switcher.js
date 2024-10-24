class PhotoSwitcher extends HTMLElement {
  #dialog = null;

  #createDialog() {
    if (!document.querySelector('#dialog_photo')) {
      this.#dialog = document.querySelector('#tmpl_dialog_photo_fullscreen').content.children[0].cloneNode(true);
      document.body.append(this.#dialog);
    } else {
      this.#dialog = document.querySelector('#dialog_photo');
    }
  }

  #updateDialog(photoUrl, photoAlt, photoDescription) {
    this.#dialog.querySelector('img').src = photoUrl;
    this.#dialog.querySelector('img').alt = photoAlt;
    if (photoDescription) this.#dialog.querySelector('p').textContent = photoDescription;
  }

  #handleAnchorClick(event) {
    const clickedAnchor = event.target.closest('a');
    if (clickedAnchor) {
      event.preventDefault();
      this.#updateDialog('', '', '');
      let url = clickedAnchor.href;
      let alt = clickedAnchor.querySelector('img').alt;
      let caption = clickedAnchor.querySelector('figcaption');
      let desc = caption ? clickedAnchor.querySelector('figcaption').textContent : '';

      this.#updateDialog(url, alt, desc);
      this.#dialog.showModal();
    }
  }
  connectedCallback() {
    this.#createDialog();
    this.addEventListener('click', this.#handleAnchorClick.bind(this));
  }
}

window.customElements.define('photo-switcher', PhotoSwitcher);
