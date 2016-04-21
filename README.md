# ec-api-client
A NodeJS API client for EC's API http://api.ecenglish.com/docs/

## Installation

To install the latest stable release with the command-line tool:
```sh
npm install --save ec-api-client
```

## Usage

```javascript
var EC = require('ec-api-client');

var options = {
  endpoint: 'https://api.ecenglish.com/', //optional
  version: 'v1' //optional, defaults to 'v1'
};

var ec = new EC("your_API_key", options);
```

List of supported methods: 
```javascript
* ec.request
* ec.testConnection
* ec.schools
* ec.products
* ec.offerings
* ec.availabilityDates
* ec.referenceData
* ec.offices
```