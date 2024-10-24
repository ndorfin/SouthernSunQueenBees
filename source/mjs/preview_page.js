import PreviewForm from '/mjs/wc/preview-form.js';

function buildMasthead(pageHeading, mastheadText, backgroundImage) {
  const mastheadContent = document.querySelector('.masthead_content');

  mastheadContent.innerHTML = `
    <h1 class="heading heading_page faux_column">
      ${ pageHeading }
    </h1>
    <div class="faux_column">
      ${ mastheadText }
    </div>
  `;

  if (backgroundImage) {
    document.querySelector('.header_masthead').style.backgroundImage = `url(${backgroundImage.url}?fm=jpg&fl=progressive&q=70&w=1280)`;
  }
}

function buildIntro(introText) {
  document.querySelector('.header_masthead').insertAdjacentHTML('afterend', `
    <div class="page_intro">
      ${ introText }
    </div>
  `);
}

function buildPageContent(content) {
  let container = document.querySelector('.page_content');
  container.textContent = content;
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
