import LibConfig from '../config';
require('dotenv').config();
import LibPg from './LibPg';
const crypto = require('crypto')

const key = 'e61454eb27a145019a5f9696c912ad62';
const algorithm = 'aes-256-cbc';
const delimiter = '$';
//
//const ALGORITHM ="aes-256-cbc";
//const PASSWORD ="abcdefg";
//const SALT = "12345678";
//const INPUT_ENCODING = 'utf8';
//const OUTPUT_ENCODING = 'hex';
//
const  LibCrypto = {
  /**
  * encode
  * @param password: string
  *
  * @return string
  */  
  encode : function(originalText: string) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(originalText, 'utf8', 'base64') +
                      cipher.final('base64');
    const ivWithEncrypted = iv.toString('base64') + delimiter + encrypted;
    return ivWithEncrypted;
  },
  /**
  * decrypt
  * @param password: string
  *
  * @return decrypt
  */ 
  decrypt : function(ivWithEncrypted: string) {
    const [iv, encrypted] = ivWithEncrypted.split(delimiter);
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'base64'));
    const decrypted = decipher.update(encrypted, 'base64', 'utf8') +
                      decipher.final('utf8');
    return decrypted;
  },     
  /*
  getHex : function(inputPassword: string)
  {
    try{
      const algorithm = ALGORITHM;
      const password = PASSWORD;
      const salt = SALT;
      const key = crypto.scryptSync(password, salt, 32)
      const iv = crypto.randomBytes(16)
      const cipher = crypto.createCipheriv(algorithm, key, iv)
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      const data = inputPassword;
      const inputEncoding = INPUT_ENCODING
      const outputEncoding = OUTPUT_ENCODING;
      let cipheredData = cipher.update(data, inputEncoding, outputEncoding)
      cipheredData += cipher.final(outputEncoding)
      console.log(`「${data}」を暗号化\n→ ${cipheredData}\n`);
      return cipheredData;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getHex');
    }
  },    
  getPassword : function(cipheredData: string)
  {
    try{
      const algorithm = ALGORITHM;
      const password = PASSWORD;
      const salt = SALT;
      const key = crypto.scryptSync(password, salt, 32)
      const iv = crypto.randomBytes(16)
      const cipher = crypto.createCipheriv(algorithm, key, iv)
      const decipher = crypto.createDecipheriv(algorithm, key, iv)
      const inputEncoding = INPUT_ENCODING
      const outputEncoding = OUTPUT_ENCODING;
      let decipheredData = decipher.update(cipheredData, outputEncoding, inputEncoding)
      decipheredData += decipher.final(inputEncoding)
      console.log(`「${cipheredData}」を復号化\n→ ${decipheredData}\n`)
      return decipheredData;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getPassword');
    }
  },           
  */
 
}
export default LibCrypto;
