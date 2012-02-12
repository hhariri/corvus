var corvus = require('../lib/corvus.js'),
    assert = require('assert');


describe('Getting Documents', function () {

    describe('when getting a document that exists', function () {

        it('should return the document', function (done) {

            var documentStore = new corvus.DocumentStore('192.168.56.130', 8080);
            documentStore.getDoc('/albums/626', function(doc, error) {
                assert.notEqual(doc, null);
                assert.equal(error, null);
                done();
            });
        });
    });

    describe('when getting a document that does not exist', function () {

        it('should return 404 document not found', function (done) {

            var documentStore = new corvus.DocumentStore('192.168.56.130', 8080);
            documentStore.getDoc('/strange', function (doc, error) {
                assert.notEqual(error, null);
                assert.equal(error.statusCode, 404);
                done();
            });
        });
    })
});

