var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs = require('fs');
var jsonFile = require('./jsonSites.json');
var table = document.createElement("table");
var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

for (var i = 0; i < jsonFile.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i][col[j]];
            }
        }
var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

/*
function jsonToTable(json,classes){
	//everything goes here
}
    $.getJSON(url,
    function (json) {
        var tr;
        for (var i = 0; i < json.length; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + json[i].User_Name + "</td>");
            tr.append("<td>" + json[i].score + "</td>");
            tr.append("<td>" + json[i].team + "</td>");
            $('table').append(tr);
        }
    });
*/
