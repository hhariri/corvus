var corvus = require('../corvus.js'),
    assert = require('assert');


describe('Getting Documents', function () {

    describe('when getting a document given a valid docId', function () {

        it('should fire a callback with the valid document', function (done) {

            var documentStore = new corvus.DocumentStore('192.168.56.130', 8080);
            documentStore.getDoc('/docs/albums/626', function(doc, error) {
                assert.notEqual(doc, null);
                done();
            });
        });
    });

    describe('when getting a document given an invalid docId', function () {

        it('should fire an error with error message', function (done) {

            var documentStore = new corvus.DocumentStore('192.168.56.130', 8080);
            documentStore.getDoc('/doesnt/exist', function (doc, error) {
                assert.notEqual(error, null);
                done();
            });
        });
    })
});

