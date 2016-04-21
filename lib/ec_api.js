var request = require('request'),
    debug = require('debug'),
    _ = require('lodash');

var defaultOptions = {
  endpoint: 'https://api.ecenglish.com/',
  version: 'v1'
};

/**
 * `EC` constructor.
 *
 * @param {String} apiKey - your api key
 * @param {Object} options - an options object
 * @api public
 */
function EC(apiKey, options) {
  // The api key is also required
  if (!apiKey) {
    throw new Error('EC API Key missing');
  }

  this.options = _.defaults(options || {}, EC.defaultOptions);

  this.apiKey = apiKey;
  this.endpoint = this.options.endpoint;
  this.version = this.options.version;
}

EC.defaultOptions = defaultOptions;

/**
 * The main method that makes all the requests to EC.
 * This method deals with the EC api and can be used
 * to make requests to the EC api.
 *
 * @api public
 */
EC.prototype.request = function(method, path, parameters, cb) {

  if (_.isFunction(parameters)) {
    cb = parameters;
  }

  debug('Requesting [%s] %s with data %o', method, this.endpoint + path, parameters);

  var url = this.endpoint + '/' + this.version + '/' + path;

  var requestOptions = {
    method: method,
    url: url
  };

  requestOptions.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-ApiKey': this.apiKey
  };

  if (method === 'GET') {
    requestOptions.qs = parameters;    
  } else {
    requestOptions.body = JSON.stringify(parameters);
  }

  request(requestOptions, function(err, res, data) {
    if (err) return cb(err);

    // Try to parse the data
    var parsed;
    if (data) {
      debug('Recieved response %s', data);

      try {
        parsed = JSON.parse(data);

        if (parsed && (parsed.error || parsed.errors)) {

          // Reject the promise
          return cb("Error response", parsed);
        }
      } catch (exception) {
        return cb("Error parsing response: ", exception);
      }
    }

    return cb(null, parsed || data);
  });
};

EC.prototype.testConnection = function(cb) {
  return this.request('GET', 'TestConnection', cb);
};

EC.prototype.schools = function(options, cb) {
  if (_.isFunction(options)) {
    cb = options;
    options = {};
  }

  this.request('GET', 'product/offerings', options, cb);
};

EC.prototype.products = function(options, cb) {
  if (_.isFunction(options)) {
    cb = options;
    options = {};
  }

  this.request('GET', 'product/products', options, cb);
}

EC.prototype.offerings = function(options, cb) {
  if (_.isFunction(options)) {
    cb = options;
    options = {};
  }

  this.request('GET', 'product/offerings', options, cb);
}

EC.prototype.availabilityDates = function(schoolCode, productCode, options, cb) {
  if (_.isFunction(options)) {
    cb = options;
    options = {};
  }

  var path = 'product/availability-dates/' + schoolCode + '/' + productCode;
  this.request('GET', path, options, cb);
}

EC.prototype.referenceData = function(options, cb) {
  if (_.isFunction(options)) {
    cb = options;
    options = {};
  }

  this.request('GET', 'reference-data', options, cb);
}

EC.prototype.offices = function(options, cb) {
  if (_.isFunction(options)) {
    cb = options;
    options = {};
  }

  this.request('GET', 'agent/offices', options, cb);
}

/**
 * Expose `EC` Library.
 */
module.exports = EC;