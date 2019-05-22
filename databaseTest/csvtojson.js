//This leverages a csv converter provided via NPM, all praise NPM
/** csv file
a,b,c
1,2,3
4,5,6
*/
const csvFilePath='testCase.csv'
const csv=require('csvtojson')
const fs = require('fs')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
	let data = JSON.stringify(jsonObj);
	fs.writeFileSync('jsonSites.json', data);
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})
 
// Async / await usage
//const jsonArray=await csv().fromFile(csvFilePath);

