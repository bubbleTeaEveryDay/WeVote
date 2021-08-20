const axios=  require('axios');

let headersList = {
  Accept: '*/*',
  'User-Agent': 'Thunder Client (https://www.thunderclient.io)',
};

let reqOptions = {
  url: 'https://60ef0447f587af00179d387b.mockapi.io/election/4/candidate/4',
  method: 'GET',
  headers: headersList,
};

axios.request(reqOptions).then(function (response) {
  console.log(response);
});