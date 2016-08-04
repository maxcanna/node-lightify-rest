/**
 * Created by massimilianocannarozzo on 01/08/16.
 */

const request = require('request-promise')
    , errors = require('request-promise/errors')
    , BPromise = require('bluebird');

class Request {
    constructor(options) {
        options = Object.assign({region: 'eu'}, options);

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

    doRequest(options) {
        return new BPromise((resolve, reject) => {
            this.request.get({
                    method: options.method,
                    qs: options.qs,
                    url: options.url,
                    headers: {
                        'authorization': this.token,
                        'Api-Version': '1.0.0',
                    },
                })
                .catch(errors.StatusCodeError, (function (e) {
                    if (e.response.body.errorCode === 5003) {
                        return this._authenticate();
                    }
                }).bind(this))
                .then((function (data) {
                    return data ? data : this.request.get({
                        method: options.method,
                        qs: options.qs,
                        url: options.url,
                        headers: {
                            'authorization': this.token,
                            'Api-Version': '1.0.0',
                        },
                    });
                }).bind(this))
                .then(function (data) {
                    resolve(data);
                })
                .catch(errors.RequestError, e => {
                    reject(e);
                });
        });
    }
}

module.exports = Request;
module.exports.REGION_EU = 'eu';
module.exports.REGION_US = 'us';
