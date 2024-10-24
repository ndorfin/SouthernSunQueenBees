import PreviewForm from '/mjs/wc/preview-form-86c1e135.js';

const mdConverter = new window.showdown.Converter();

function buildMasthead(pageHeading, mastheadText, backgroundImage) {
  const mastheadContent = document.querySelector('.masthead_content');

  mastheadContent.innerHTML = `
    <h1 class="heading heading_page faux_column">
      ${ pageHeading }
    </h1>
    <div class="faux_column">
      ${ mdConverter.makeHtml(mastheadText) }
    </div>
  `;

  if (backgroundImage) {
    document.querySelector('.header_masthead').style.backgroundImage = `url(${backgroundImage.url}?fm=jpg&fl=progressive&q=70&w=1280)`;
  }
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
  buildMasthead(fields.pageHeaading, fields.mastheadText, fields.mastheadBackgroundImage);
  buildIntro(fields.intro);
  buildPageContent(fields.bodyOfContent);
  document.body.classList.add(`page_${parameterize(fields.url)}`);
}

window.buildPage = buildPage;
window.customElements.define('preview-form', PreviewForm);
