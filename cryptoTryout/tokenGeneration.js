const randomstring = require("randomstring");
const crypto = require('crypto');
const uuid = require('uuid/v1');
const secret = 'My guy';
const url = 'lacleanupsites.com';
const tempUserName = 'Flo';

console.log(randomstring.generate(8));

console.log(uuid());
//console.log(uuid('hi'));
//console.log(uuid(randomstring.generate(4)));




let login_token = uuid().

const hashed_token = crypto.createHash('sha512',secret).update(login_token).digest('base64');

const token_object = {
	'when':new Date(),
	'hashedToken': hashed_token,
};
