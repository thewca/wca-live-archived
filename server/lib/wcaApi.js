const fetch = require('node-fetch');
const qs = require('qs');
const config = require('config');
const { APIError } = require('rest-api-errors');

// Custom error object for handling WCA Api Errors.
const WcaApiError = function (code, message) {
  APIError.call(this, code, code, message);
  this.WCAError = true;
};

WcaApiError.prototype = Object.create(APIError.prototype);


const wcaFetch = module.exports.wcaFetch = function (url, accessToken) {
  let headers = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return fetch(`${config.domain}/api/v0${url}`, {headers})
    .then((data) => {
      if (data.ok) {
        return data.json();
      } else {
        throw new WcaApiError(data.status, data.statusText);
      }
    });
};

module.exports.getCompetitionsManagedByMe = function (accessToken, start) {
  console.log(32, start)
  return wcaFetch('/competitions?' + qs.stringify({
    managed_by_me: true,
    start
  }), accessToken)
    .catch((err) => {
      throw err;
    });
};

module.exports.getCompetitionWCIF = function (competitionId, accessToken) {
  return wcaFetch(`/competitions/${competitionId}/wcif`, accessToken)
    .catch((err) => {
      if (err.code === 404) {
        throw new WcaApiError(404, `Competition '${competitionId}' not Found`);
      } else {
        throw err;
      }
    });
};
