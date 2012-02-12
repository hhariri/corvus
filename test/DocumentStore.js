var corvus = require('../lib/corvus.js'),
    assert = require('assert');


describe('Document Store', function () {
    describe('when creating a documentStore with host, port and no database', function () {
        it('should create documentStore with default database', function (done) {

            var documentStore = new corvus.DocumentStore('192.168.56.130', 8080);

            assert.equal(documentStore.host, '192.168.56.130');
            assert.equal(documentStore.port, 8080);
            assert.equal(documentStore.database, 'default');


            done();

        });

    });
    describe('when creating a documentStore with host, port and a database', function () {

        it('should create documentStore with specified database', function (done) {

            var documentStore = new corvus.DocumentStore('192.168.56.130', 8080, 'testdb');

            assert.equal(documentStore.host, '192.168.56.130');
            assert.equal(documentStore.port, 8080);
            assert.equal(documentStore.database, 'testdb');


            done();
        });
    });
});

