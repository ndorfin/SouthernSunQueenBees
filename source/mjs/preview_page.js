import PreviewForm from '/mjs/wc/preview-form.js';

const mdConverter = new window.showdown.Converter();

function buildMasthead(pageHeading, mastheadText) {
  const mastheadContent = document.querySelector('.masthead_content');
  let mastheadString = `
    <h1 class="heading heading_page faux_column">
      ${ pageHeading }
    </h1>
  `;

  if (mastheadText) {
    mastheadString += `
      <div class="faux_column">
        ${ mdConverter.makeHtml(mastheadText) }
      </div>
    `;
  }

  mastheadContent.innerHTML = mastheadString;
}

function buildIntro(introText) {
  document.querySelector('.header_masthead').insertAdjacentHTML('afterend', `
    <div class="page_intro">
      ${ mdConverter.makeHtml(introText) }
    </div>
  `);
}

function buildPageContent(content) {
  let container = document.querySelector('.page_content');
  container.innerHTML = mdConverter.makeHtml(content);
}

function parameterize(string) {
  return string.replace(/[^a-zA-Z\d]/g, '-');
}

function buildPage(fields) {
  buildMasthead(fields.pageHeaading, fields.mastheadText);
  buildIntro(fields.intro);
  buildPageContent(fields.bodyOfContent);
  document.body.classList.add(`page_${parameterize(fields.url)}`);
}

window.buildPage = buildPage;
window.customElements.define('preview-form', PreviewForm);
