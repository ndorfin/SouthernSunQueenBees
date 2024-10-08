const params = new URL(window.location).searchParams;
const paramsObj = {
  entryId: params.get('id'),
  environment: params.get('environment'),
  space: params.get('space'),
  token: params.get('token')
};
const API_ENDPOINT = `https://preview.contentful.com/spaces/${paramsObj.space}/environments/${paramsObj.environment}/entries/${paramsObj.entryId}?access_token=${paramsObj.token}`;

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
