/**
 * Created by massimilianocannarozzo on 04/08/16.
 */

var Lightify = require('./../index');

var lightify = new Lightify({
    'username': '',
    'password': '',
    'serial': '',
    'region': Lightify.Regions.eu,
});

lightify
    .getDevices()
    .then(console.log)
    .catch(console.error);
