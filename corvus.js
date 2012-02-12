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
// TODO: Refactor to use common request method
// TODO: Refactor to not require /docs/
corvus.DocumentStore.prototype.getDoc = function (docId, callback) {

    function normalizeDocPath(docId) {

        if (docId.slice(0, '/docs'.length).toUpperCase() != '/DOCS') {
            if (docId.slice(0, 1) == '/') {
                return '/docs' + docId;
            } else {
                return '/docs/' + docId;
            }
        } else {
            return docId;
        }
    }

    var options = {
        host: this.host,
        port: this.port,
        path: normalizeDocPath(docId),
        method: 'GET'
    };
    var request = http.request(options);

    request.on('response', function (response) {

        var obj;
        var error = false;

        response.setEncoding('utf8');

        response.on('data', function (chunk) {

            try {
                obj = JSON.parse(chunk);
                error = false;
            } catch (e) {
                error = true;
            }
        });

        // TODO: Improve this. Distinguish between bad parsing of JSON and other errors
        response.on('end', function () {
            if (error || response.statusCode !== 200) {
                callback(null, { statusCode: response.statusCode, statusMessage: response.statusMessage});
            } else {
                callback(obj, null);
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
        res.on('error', function (error) {
           callback(null, error);
        });
    });


    request.write(JSON.stringify(doc));
    request.end();


};