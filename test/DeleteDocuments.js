var corvus = require('../lib/corvus.js');
var assert = require('assert');

describe('Deleting documents', function () {

    describe('when deleting a document that exists', function () {

        it('should delete the document', function (done) {
                var documentStore = new corvus.DocumentStore('192.168.56.130', 8080);
                var doc = { Firstname: 'Joe', Lastname: 'Smith'};
                documentStore.putDoc('/docs/customertodelete', doc, function (docDetails, error) {

                    documentStore.deleteDoc('/docs/customertodelete', function (result, error) {
                        assert.equal(result.content, 'No content');
                        assert.equal(null, error);
                        done();

                    });
            });
        });

    });

});