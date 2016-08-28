/**
 * Created by massimilianocannarozzo on 01/08/16.
 */

"use strict";
const request = require('request-promise')
    , errors = require('request-promise/errors')
    , BPromise = require('bluebird');

class Request {
    constructor(options) {
        options = Object.assign({region: Request.Regions.eu}, options);

        if (Request.Regions[options.region] === undefined) {
            throw new Error('Invalid region');
        }

        if (options.username === undefined || options.password === undefined || options.serial === undefined) {
            throw new Error('Missing options');
        }

        this.region = options.region;
        this.username = options.username;
        this.password = options.password;
        this.serial = options.serial;
        this.token = '';
        this.request = request.defaults({
            baseUrl: `https://${this.region}.lightify-api.org/lightify/services/`,
            json: true
        });
    }

    _authenticate() {
        return new BPromise((resolve, reject) => {
            this.request.post({
                    url: 'session',
                    body: {
                        'username': this.username,
                        'password': this.password,
                        'serialNumber': this.serial,
                    },
                })
                .then((function (data) {
                    this.token = data['securityToken'];
                    resolve();
                }).bind(this))
                .catch(e => {
                    reject(e);
                });
        });
    }

    _requestData(options) {
        return this.request({
            method: options.method,
            qs: options.qs,
            url: options.url,
            headers: {
                'authorization': this.token,
                'Api-Version': '1.0.0',
            },
        });
    }

    doRequest(options) {
        return new BPromise((resolve, reject) => {
            this._requestData(options)
                .catch(errors.StatusCodeError, (function (e) {
                    if (e.response.body.errorCode === 5003) {
                        return this._authenticate();
                    }
                    reject(e.response.body.errorMessage);
                }).bind(this))
                .then((function (data) {
                    return data ? data : this._requestData(options);
                }).bind(this))
                .then(resolve)
                .catch(errors.StatusCodeError, e => {
                    reject(e.response.body.errorMessage);
                })
                .catch(errors.RequestError, reject);
        });
    }
}

Request.Regions = {
    eu: 'eu',
    us: 'us',
};

module.exports = Request;
