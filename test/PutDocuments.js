var corvus = require('../lib/corvus.js');
var assert = require('assert');

describe('Putting documents', function () {

    describe('when putting a document with valid Id and body', function () {

        it('should return the document Id', function (done) {

            var documentStore = new corvus.DocumentStore('192.168.56.130', 8080);
            var doc = { Firstname: 'Joe', Lastname: 'Smith'};
            documentStore.putDoc('/docs/customer1', doc, function (docDetails, error) {
                assert.equal(docDetails.Key, 'customer1');
                assert.notEqual(docDetails.ETag, null);
                assert.equal(error, null);
                done();
            });
        });

    });
    describe('when putting a document with invalid Id', function () {

        it('should return an error', function (done) {
            var documentStore = new corvus.DocumentStore('192.168.56.130', 8080);
            var doc = { Firstname: 'Joe', Lastname: 'Smith'};
            documentStore.putDoc('/docs', doc, function (docDetails, error) {
                assert.equal(error.statusCode, 400);
                done();
            });

        });
    });
});