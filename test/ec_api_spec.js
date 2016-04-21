var EC = require('../lib/ec_api');
var ec = new EC(process.env.EC_API_KEY, {
  endpoint: 'https://api-sandbox.ecenglish.com/'
});

describe('EC API client unit tests', function() {
  this.timeout(20000);

  it.skip('Makes a proper request');
  it.skip('testConnection');
  it.skip('schools');
  it.skip('products');
  it.skip('offerings');
  it.skip('availabilityDates');
  it.skip('referenceData');
  it.skip('offices');
});