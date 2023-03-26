import LibConfig from '../config';
require('dotenv').config();
import LibPg from './LibPg';

const  LibTask = {
  /**
  * 
  * @param
  *
  * @return
  */   
  getItems :async function(){
    try {
      const text = `
       SELECT * FROM public."Task" ORDER BY id DESC LIMIT 1000
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
//console.log(res.rows);
      return res.rows;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems:' +err);
    }          
  },  
  /**
  * 
  * @param
  *
  * @return
  */   
  search :async function(search_key: string) : Promise<any>
  {
    try {
      const text = `
       SELECT * FROM public."Task" 
       WHERE title like '%${search_key}%'
       ORDER BY id DESC
       LIMIT 1000
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
//console.log(res.rows);
      return res.rows;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems:' +err);
    }          
  }, 
  /**
  * 
  * @param
  *
  * @return
  */  
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
  * 
  * @param
  *
  * @return
  */  
  addTask :async function(req: any){
    try {
console.log(req);
      const text = `
      INSERT INTO public."Task" (title, content, "userId", "createdAt", "updatedAt") 
      VALUES($1, $2, 0, current_timestamp, current_timestamp) RETURNING *
      `;      
      const values = [req.title, req.content ]
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();
      const result = res.rows[0];
//console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result 
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , addTask: '+ err);
    }    
  },
  /**
  * 
  * @param
  *
  * @return
  */  
  update :async function(args: any){
    try {
      console.log(args.id);
      const text = `
      UPDATE public."Task" SET title = $1,
      content = $2,
      "updatedAt" = current_timestamp
      WHERE id = $3
      RETURNING *
      `;  
      const client = LibPg.getClient();
      const values = [args.title, args.content, args.id]
      const result = await LibPg.execute(text, values);
//console.log(result);
          client.end();
      return {
        ret: LibConfig.OK_CODE, data: result
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteTask:' +err);
    }     
  },  
  /**
  * 
  * @param
  *
  * @return
  */  
  deleteTask :async function(id: number){
    try {
  console.log(id);
//  return;
      const text = `
      DELETE FROM public."Task" where id = $1
      RETURNING *
      `;
      const client = LibPg.getClient();
      const values = [id]
      const result = await LibPg.execute(text, values);
      client.end();
//console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteTask:' +err);
    }        
  },             
}
export default LibTask;
