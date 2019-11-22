const crypto = require('crypto');


// what salts the password so the same pasword given by two different users wont go to the same hash value

var genRandomString = function(length){                                                                                                                                                                                        return crypto.randomBytes(Math.ceil(length/2))
                            .toString('hex') /** convert to hexadecimal format */
                            .slice(0,length);   /** return required number of characters */
};


// cryptographic  hash for  the user password using sha 512 to protect the users password
// // that way enemy can't get the user's password.

var sha512 = function(password, salt){
                    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
                    hash.update(password);
                    var value = hash.digest('hex');
                    return {
                                  salt:salt,
                                  passwordHash:value
                                                    };
};




// furntion to control the way the paswrod is hash and salted

function saltHashPassword(userpassword) {
            var salt = genRandomString(16); /** Gives us salt of length 16 */
            var passwordData = sha512(userpassword, salt);
            console.log('UserPassword = '+userpassword);
            console.log('Passwordhash = '+passwordData.passwordHash);
            console.log('nSalt = '+passwordData.salt);
}


var userName = 'brosky';
var userPass = '2545LeagueOfLoners';


saltHashPassword(userPass);

userPass =  '2545LeagueOfLoners';

saltHashPassword(userPass);
