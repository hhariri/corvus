# Corvus
## An Asynchronous NodeJS HTTP Client for RavenDB

Corvus is a node package for accessing RavenDB using its HTTP API.


### Installation

<code>
npm install corvus
</code>

Corvus does not have any dependencies other than nodejs and the mocha testing framework (only for development)

### Usage

<code>
var documentStore = new DocumentStore('192.168.0.101', 8080);<br/>
var doc = { Name: 'Joe Smith', Email: 'joe@smith.com }<br/>
documentStore.postDoc(doc, function (docDetails, error) {<br/>
    console.log("Doc created with key: " + docDetails.Key);<br/>
});
</code>

### Currently supported functionality

* GET, POST, PUT, DELETE

### In the works

* PATCH
* Support for non-default database
* More things...


