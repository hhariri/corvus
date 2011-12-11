/**
 * User: hadi
 * Date: 12/11/11
 * Time: 8:21 PM
 */

var assert = require('assert');
var corvus = require('../corvus.js');


describe('openSession', function(){
  describe('load', function(){
    it('should load a document given valid docId', function(done){

        var session = new corvus.DocumentStore().openSession();

        session.load('a', function (doc) {

            assert.notEqual(doc, null);
            done();
        });
    })
  })
});