/**
 * Created by massimilianocannarozzo on 04/08/16.
 */

"use strict";
const Request = require('./lib/request')
    , BPromise = require('bluebird');

const checkParameters = function (parameters) {
    Object.keys(parameters).forEach(parameter => {
        if (Lightify.Parameters[parameter] === undefined) {
            throw new Error('Invalid parameter ' + parameter);
        }
    });
};

class Lightify {
    constructor(options) {
        if (options.username === undefined || options.password === undefined || options.serial === undefined) {
            throw new Error('Missing options');
        }

        this.request = new Request({
            'username': options.username,
            'password': options.password,
            'serial': options.serial,
            'region': options.region,
        });
    }

    turnOn(idx) {
        return this.setDeviceParameters({idx: idx, onoff: 1});
    }

    turnOff(idx) {
        return this.setDeviceParameters({idx: idx, onoff: 0});
    }

    setDeviceParameters(parameters) {
        try {
            checkParameters(parameters);
        } catch (e) {
            return BPromise.reject(e.message);
        }
        return this.request.doRequest({
            method: 'GET',
            url: parameters.idx ? 'device/set' : 'device/all/set',
            qs: parameters,
        });
    }

    turnOnGroup(idx) {
        return this.setGroupParameters({idx: idx, onoff: 1});
    }

    turnOffGroup(idx) {
        return this.setGroupParameters({idx: idx, onoff: 0});
    }

    setGroupParameters(parameters) {
        try {
            checkParameters(parameters);
        } catch (e) {
            return BPromise.reject(e.message);
        }
        if (parameters.idx === undefined) {
            return BPromise.reject('Missing ' + Lightify.Parameters.idx);
        }

        return this.request.doRequest({
            method: 'GET',
            url: 'group/set',
            qs: parameters,
        });
    }

    getDevices() {
        return this.request.doRequest({
            method: 'GET',
            url: 'devices',
        });
    }

    getDevice(idx) {
        if (idx === undefined) {
            return BPromise.reject('Missing ' + Lightify.Parameters.idx);
        }

        return this.request.doRequest({
            method: 'GET',
            url: `devices/${idx}`,
        });
    }

    getGateway() {
        return this.request.doRequest({
            method: 'GET',
            url: 'gateway',
        });
    }

    getGroups() {
        return this.request.doRequest({
            method: 'GET',
            url: 'groups',
        });
    }

    getApiVersion() {
        return this.request.doRequest({
            method: 'GET',
            url: 'version',
        });
    }
}

Lightify.Regions = Request.Regions;

Lightify.Parameters = {
    idx: 'idx',
    color: 'color',
    ctemp: 'ctemp',
    hue: 'hue',
    level: 'level',
    onoff: 'onoff',
    saturation: 'saturation',
    time: 'time',
};

module.exports = Lightify;
