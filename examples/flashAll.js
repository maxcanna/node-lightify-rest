/**
 * Created by massimilianocannarozzo on 02/08/16.
 */

var Lightify = require('node-lightify-rest');

var lightify = new Lightify({
    'username': '',
    'password': '',
    'serial': '',
    'region': Lightify.Regions.eu,
});

lightify
    .turnOn()
    .then(function () {
        lightify.turnOff();
    })
    .catch(console.error);
