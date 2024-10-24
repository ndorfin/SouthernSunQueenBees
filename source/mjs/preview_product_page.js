import PreviewForm from './wc/preview-form.js';

function parameterize(string) {
  return string.replace(/[^a-zA-Z\d]/g, '-');
}

function buildPage(fields) {
  document.body.classList.add(`page_product_${parameterize(fields.url)}`);
}

window.buildPage = buildPage;
window.customElements.define('preview-form', PreviewForm);
