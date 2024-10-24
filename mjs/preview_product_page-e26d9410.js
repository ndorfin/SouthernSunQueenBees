import PreviewForm from '/mjs/wc/preview-form-996b1261.js';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

function parameterize(string) {
  return string.replace(/[^a-zA-Z\d]/g, '-');
}

function buildPage(fields) {
  document.body.classList.add(`page_product_${parameterize(fields.url)}`);
}

window.buildPage = buildPage;
window.customElements.define('preview-form', PreviewForm);
