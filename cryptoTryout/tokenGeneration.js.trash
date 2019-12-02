const randomstring = require("randomstring");
const crypto = require('crypto');
const uuid = require('uuid/v1');
const secret = 'My guy';
const url = 'lacleanupsites.com';
const tempUserName = 'Flo';
const API_PORT = '6969';
const express = require('express');


//console.log(randomstring.generate(8));

//console.log(uuid());
//console.log(uuid('hi'));
//console.log(uuid(randomstring.generate(4)));
//for (i = 0; i < 20; i++){
//	console.log(uuid());
//}

let tempUuid = uuid();
console.log(tempUuid);
let login_token = uuid() + parseInt(new Date().getTime()).toString(36);
console.log(login_token);
const hashed_token = crypto.createHash('sha512').update(login_token).digest('base64');
console.log(hashed_token);

let tempTimeStamp = new Date();

const token_object = {
	whew: tempTimeStamp),
	expires: new Date(tempTimeStap.getHours() + 1),
	'hashedToken':hashed_token,
};




/*
let login_token = uuid().

const hashed_token = crypto.createHash('sha512',secret).update(login_token).digest('base64');

const token_object = {
	'when':new Date(),
	'hashedToken': hashed_token,
};
*/
