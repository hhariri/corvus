/**
 * Author: Hadi Hariri
 * Copyright: Copyright (c) 2011 Hadi Hariri and Contributors
 * License: Licensed under BSD Modified
 * Date: 12/3/11
 * Time: 7:19 PM
 */

var http = require('http');

var corvus = exports;


corvus.DocumentStore = function DocumentStore(host, port, database) {

    this.host = host;
    this.port = port || 8080;
    this.database = database || 'default';

};

function Error(statusCode, statusMessage) {
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    return this;
}

// TODO: Refactor to use common request method
corvus.DocumentStore.prototype.getDoc = function (docId, callback) {

    function normalizeDocPath(docId) {

        if (docId.slice(0, '/docs'.length).toUpperCase() != '/DOCS') {
            if (docId.slice(0, 1) == '/') {
                return '/docs' + docId;
            }
            return '/docs/' + docId;
        }
        return docId;
    }

    var options = {
        host:this.host,
        port:this.port,
        path:normalizeDocPath(docId),
        method:'GET'
    };
    var request = http.request(options);

    request.on('response', function (response) {

        var body = "";

        response.setEncoding('utf8');

        response.on('data', function (chunk) {

            body += chunk;
        });

        response.on('end', function () {
            if (response.statusCode === 200) {
                try {
                    return callback(JSON.parse(body), null);
                } catch (e) {
                    return callback(null, new Error(500, 'Error Parsing JSON: ' + e));
                }
            }
            return callback(null, new Error(response.statusCode, response.StatusMessage));
        });
    });

    request.on('error', function (error) {
        callback(null, new Error(500, error));
    });
    request.end();

};

corvus.DocumentStore.prototype.putDoc = function (docId, doc, callback) {

    var options = {
        host:this.host,
        port:this.port,
        path:docId,
        method:'PUT'
    };
    var request = http.request(options, function (res) {

        res.setEncoding('utf8');


        res.on('data', function (chunk) {
            if (res.statusCode === 201) {
                callback(JSON.parse(chunk), null);
            }
            else {
                callback(null, { 'StatusCode':res.statusCode, 'StatusMessage':chunk});
            }
        });
        res.on('error', function (error) {
            callback(null, error);
        });
    });


    request.write(JSON.stringify(doc));
    request.end();


};