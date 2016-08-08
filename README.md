# node-lightify-rest
[![](https://img.shields.io/npm/dt/node-lightify-rest.svg?maxAge=2592000)](https://www.npmjs.com/package/node-lightify-rest) [![](https://img.shields.io/npm/v/node-lightify-rest.svg?maxAge=2592000)](https://www.npmjs.com/package/node-lightify-rest) [![](https://www.versioneye.com/user/projects/579f48ef72d75c0039f7a287/badge.svg)](https://www.versioneye.com/user/projects/579f48ef72d75c0039f7a287) [![](https://img.shields.io/travis/maxcanna/node-lightify-rest.svg?maxAge=2592000)](https://travis-ci.org/maxcanna/node-lightify-rest/) [![](https://img.shields.io/codeclimate/github/maxcanna/node-lightify-rest.svg?maxAge=2592000)](https://codeclimate.com/github/maxcanna/node-lightify-rest) [![](https://img.shields.io/npm/l/node-lightify-rest.svg?maxAge=2592000)](https://github.com/maxcanna/node-lightify-rest/blob/master/LICENSE)

Node.js library to use [Osram Lightify REST API](https://eu.lightify-api.org/lightify/)

## Install

``$ npm i node-lightify-rest``

## Usage

```javascript
var Lightify = require('node-lightify-rest');

var lightify = new Lightify({
    'username': 'user@example.com',
    'password': 'thisisaverylongandsecurepassword',
    'serial': 'OSR0000000A',
    'region': Lightify.Regions.eu, //For Europe or Lightify.Regions.us for US, CA, AUS
});

lightify
    .getDevices()
    .then(console.log)
    .catch(console.error);
```

## Documentation
[Osram Lightify REST API official documentation](https://eu.lightify-api.org/lightify/)

### Parameters
| Name | Data type | Description | Example
|------|-----------|-------------|--------|
| apiVersion | string | API version | 1.0.0 |
| color | string | Hex Color | FF0000 |
| ctemp | number | Color temperature | 1000 to 8000 |
| hue | number | Hue | 1.000 to 360.000 |
| idx | number | Index of the device | 1 |
| level | number | Dimming level | 0.000 to 1.000 |
| onoff | number | On/Off state | 0 or 1 |
| recallSceneId | string | Recall Scene Id | 1, 2-1 |
| saturation | number | Saturation | 0.000 to 1.000 |
| time | number | Transition time in 1/10th of a second | 100 |

## API
All API methods are available using corresponding method of `Lightify` class.

[Examples](https://github.com/maxcanna/node-lightify-rest/tree/master/examples) may be found in `examples` directory.

## Contributing
Contributions are very welcome!

Note that submitting a PR you agree to license your contribution to this project under the [GPL License](https://github.com/maxcanna/node-lightify-rest/blob/master/LICENSE).

Code style are enforced using automated checks.

## Troubleshooting
Make sure that the firmware version of your gateway is `WLAN 1.1.2.101` or greater.

## License

Published under the [GPL License](https://github.com/maxcanna/node-lightify-rest/blob/master/LICENSE).
