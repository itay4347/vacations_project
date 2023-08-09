import bcrypt from 'bcrypt';

const saltRounds = 10;

//this function takes the user password and hash it into a value that is set by this library algorithem.
export const hash = (text:string):Promise<string> => {
 
    return new Promise((resolve,reject) => {
        bcrypt.genSalt(saltRounds,(err,salt) => {
            if(err){
                reject(err);
            }
            bcrypt.hash(text,salt,(err,hash) => {
                if(err){
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
}

//this function takes the hashed passwored saved on the database and compare it with the password
//value from the credentials.
export const compareHash = (originalHash:string,storedHash:string):Promise<boolean> => {

    return new Promise((resolve,reject) => {
        bcrypt.compare(originalHash,storedHash,(err,result) => {
            if(err){
                reject(err);
            }
            resolve(result);
        });
    });
}