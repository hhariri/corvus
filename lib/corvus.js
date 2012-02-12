/**
 * Author: Hadi Hariri
 * Copyright: Copyright (c) 2012 Hadi Hariri and Contributors
 * License: Licensed under MIT
 * Date: 10/02/12
 * Time: 1:20 PM
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

// TODO: Make this a private function to not have to pass host, port and eventually the database
corvus.DocumentStore.prototype._submitRequest = function (verb, expectedResult, docId, requestBody, callback) {

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
        host: this.host,
        port: this.port,
        path:normalizeDocPath(docId),
        method: verb
    };

    var request = http.request(options);

    request.on('response', function (response) {

        var body = "";

        response.setEncoding('utf8');

        response.on('data', function (chunk) {

            body += chunk;
        });

        response.on('end', function () {
            if (response.statusCode === expectedResult) {
                if (body.length > 0) {
                    try {
                        return callback(JSON.parse(body), null);
                    } catch (e) {
                        return callback(null, new Error(500, 'Error Parsing JSON: ' + e));
                    }
                }
                return callback({ content: 'No content'}, null);
            }
            return callback(null, new Error(response.statusCode, response.statusMessage));
        });
    });

    request.on('error', function (error) {
        callback(null, new Error(500, error));
    });

    if (requestBody != null) {
        request.write(JSON.stringify(requestBody));
    }
    request.end();

}

corvus.DocumentStore.prototype.getDoc = function (docId, callback) {

   return this._submitRequest('GET', 200, docId, null, callback)
};

corvus.DocumentStore.prototype.putDoc = function (docId, doc, callback) {

    return this._submitRequest('PUT', 201, docId, doc, callback);

};

corvus.DocumentStore.prototype.postDoc = function (doc, callback) {

    return this._submitRequest('POST', 201, '/docs', doc, callback);
};

corvus.DocumentStore.prototype.deleteDoc = function (docId, callback) {

    return this._submitRequest('DELETE', 204, docId, null, callback);
};
