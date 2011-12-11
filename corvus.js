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


corvus.DocumentStore = function DocumentStore(url) {

    
};

corvus.DocumentStore.prototype.initialize = function () {


};

corvus.DocumentStore.prototype.openSession = function () {

    return {

        load: function (docId, callback) {

            var client = http.createClient(8080, '192.168.56.130');

            var request = client.request('GET', '/docs/albums/626', {'Host': '127.0.0.1'});


            request.end();

            request.on('response', function (response) {

                response.setEncoding('utf8');

                response.on('data', function (chunk) {

                    callback(chunk);

                });

            });

        }



    }

};

