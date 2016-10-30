/**
 * Created by massimilianocannarozzo on 06/08/16.
 */

var Lightify = require('node-lightify-rest');

var lightify = new Lightify({
    'username': '',
    'password': '',
    'serial': '',
    'region': Lightify.Regions.eu,
});

var green = {};
var white = {};
var red = {};

red[Lightify.Parameters.idx] = 3;
red[Lightify.Parameters.color] = 'CE2B37';
red[Lightify.Parameters.time] = 20;

white[Lightify.Parameters.idx] = 2;
white[Lightify.Parameters.color] = 'F1F2F1';
white[Lightify.Parameters.time] = 20;

green[Lightify.Parameters.idx] = 1;
green[Lightify.Parameters.color] = '009246';
green[Lightify.Parameters.time] = 20;

lightify
    .getDevices()
    .then(function (devices) {
        if (devices.count < 3) {
            throw new Error('This demo requires at least 3 devices');
        }
    })
    .then(function () {
        return lightify.turnOn();
    })
    .then(function () {
        return lightify.setDeviceParameters(green);
    })
    .then(function () {
        return lightify.setDeviceParameters(white);
    })
    .then(function () {
        return lightify.setDeviceParameters(red);
    })
    .catch(console.error);
