/**
 * Author: Hadi Hariri
 * Copyright: Copyright (c) 2011 Hadi Hariri and Contributors
 * License: Licensed under BSD Modified
 * Date: 12/3/11
 * Time: 7:19 PM
 */

var http = require('http');
var sys = require('sys');

var corvus = exports;


corvus.DocumentStore = function DocumentStore(host, port, database) {

    this.host = host;
    this.port = port || 8080;
    this.database = database || 'default';

};

corvus.DocumentStore.prototype.getDoc = function (docId, callback) {

    var options = {
        host: this.host,
        port: this.port,
        path: docId,
        method: 'GET'
    };
    var request = http.request(options, function (res) {

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            if (res.statusCode === 200) {
                callback(JSON.parse(chunk), null);
            }
            else {
                callback(null, { 'StatusCode': res.statusCode, 'StatusMessage': chunk});
            }
        });
    });

    request.on('error', function (error) {
       callback(null, error);
    });
    request.end();

};

corvus.DocumentStore.prototype.putDoc = function (docId, doc, callback) {

    var options = {
        host: this.host,
        port: this.port,
        path: docId,
        method: 'PUT'
    };
    var request = http.request(options, function (res) {

        res.setEncoding('utf8');


        res.on('data', function (chunk) {
            if (res.statusCode === 201) {
                callback(JSON.parse(chunk), null);
            }
            else {
                callback(null, { 'StatusCode': res.statusCode, 'StatusMessage': chunk});
            }
        });
    });

    request.on('error', function (error) {
       callback(null, error);
    });

    request.write(JSON.stringify(doc));
    request.end();


};