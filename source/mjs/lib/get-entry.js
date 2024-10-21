import CONSTANTS from './constants.js';

const LS_CREDENTIALS = JSON.parse(window.localStorage.getItem(CONSTANTS.CONTENTFUL.LOCAL_STORAGE_KEY));
const params = new URL(window.location).searchParams;
const paramsObj = {
  entryId: params.get('id'),
  space: params.get('space') || LS_CREDENTIALS['space'],
  token: params.get('token') || LS_CREDENTIALS['token']
};
const API_ENDPOINT = `https://preview.contentful.com/spaces/${ paramsObj.space }/environments/${ CONSTANTS.CONTENTFUL.ENVIRONMENT }/entries/${ paramsObj.entryId }?access_token=${ paramsObj.token }`;

async function getEntry() {
  return await fetch(API_ENDPOINT)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
}

export default getEntry;
