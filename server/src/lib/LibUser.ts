import LibConfig from '../config';
require('dotenv').config();
import LibPg from './LibPg';
import LibCrypto from './LibCrypto';
//import { exit } from 'process';

const  LibUser = {
  getItems :async function(){
    try {
      const text = `
       SELECT * FROM public."User" ORDER BY id DESC LIMIT 100
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
      console.log(res.rows);
      return res.rows;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems:' +err);
    }          
  },    
  getItem :async function(id: number){
    try {
      const text = `
      SELECT * FROM public."Task" where id = ${id}
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
      const data = res.rows[0];
//      console.log(data);
      return data;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem:' +err);
    }    
  },
  /**
  * addUser
  * @param req: any
  *
  * @return object
  */  
  addUser :async function(req: any){
    try {
//console.log(req);
      const body = req;
      const hashed_password = LibCrypto.encode(body.password);
//console.log(hashed_password);
      const text = `
      INSERT INTO public."User" (name, email, "password", "createdAt", "updatedAt") 
      VALUES($1, $2, $3, current_timestamp, current_timestamp) RETURNING *
      `;      
      const values = [body.name, body.email,  hashed_password]
      const result = await LibPg.execute(text, values);
//console.log(result);
      const ret = { ret: LibConfig.OK_CODE, data: result}
      return ret;
    } catch (err) {
      console.error(err);
      throw new Error('Error , addUser: '+ err);
    }    
  },
  updateTask :async function(args: any){
  },  
  deleteTask :async function(args: any){
  },
  /**
  * login
  * @param req: any
  *
  * @return object
  */   
  validUser :async function(req: any)
  {
    try{
//console.log(req);
      const retArr = { ret: LibConfig.NG_CODE, data: {}}
      const body = req;
      //User
      const text = `
      SELECT * FROM public."User" where email = '${body.email}'
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
      if(res.rows.length < 1) {
        return retArr;
      }
      const user = res.rows[0];
      //valid
      const hash_password = LibCrypto.decrypt(user.password);
//console.log(hash_password);          
      if (
        body.email === user.email
        && (hash_password === body.password)
      ) {
        retArr.ret = LibConfig.OK_CODE;
        retArr.data = user;
      }
      return retArr;
    } catch (err) {
      console.log(err);
      throw new Error('Error, login');
    }    
  },            
}
export default LibUser;

