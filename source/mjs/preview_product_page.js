import PreviewForm from '/mjs/wc/preview-form.js';

const mdConverter = new window.showdown.Converter();

function buildProductDescription(description) {
  document.querySelector('.product_description').innerHTML = mdConverter.makeHtml(description);
}

function buildExtraContent(fields) {
  const productName = fields.title;
  const arrayTemplateFields = [
    {
      keyName: 'aboutThisProduct',
      title: `About our ${ productName }`
    },
    {
      keyName: 'orderInformation',
      title: `Ordering ${ productName }`
    },
    {
      keyName: 'paymentAndDeliveryDetails',
      title: `Payment and delivery information`
    },
  ];
  let htmlStringExtraContent = '';

  arrayTemplateFields.forEach(({keyName, title}) => {
    if (fields[keyName]) {
      htmlStringExtraContent += `
        <details open class="product_info_section">
          <summary class="heading heading_subheading">${ title }</summary>
          ${ documentToHtmlString(fields[keyName]) }
        </details>
      `;
    }
  });

  document.querySelector('.product_info').insertAdjacentHTML('beforeend', htmlStringExtraContent);
}

function parameterize(string) {
  return string.replace(/[^a-zA-Z\d]/g, '-');
}

function buildPage(fields) {
  buildProductDescription(fields.description)
  buildExtraContent(fields);
  document.body.classList.add(`page_product_${parameterize(fields.slug)}`);
}

window.buildPage = buildPage;
window.customElements.define('preview-form', PreviewForm);
