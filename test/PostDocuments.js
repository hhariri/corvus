var corvus = require('../lib/corvus.js');
var assert = require('assert');

describe('Posting documents', function () {

    describe('when posting a document with body', function () {

        it('should return the document id', function (done) {

            var documentStore = new corvus.DocumentStore('192.168.56.130', 8080);
            var doc = { Firstname: 'Joe', Lastname: 'Smith'};
            documentStore.postDoc(doc, function (docDetails, error) {
                assert.notEqual(docDetails.Key, null);
                assert.notEqual(docDetails.ETag, null);
                done();
            });
        });

    });

});