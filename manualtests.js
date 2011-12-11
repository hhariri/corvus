/**
 * User: hadi
 * Date: 12/11/11
 * Time: 7:06 PM
 */


var corvus = require('./corvus.js');

var session = new corvus.DocumentStore().openSession();

session.load('a', function (doc) {

    console.log(doc);

});