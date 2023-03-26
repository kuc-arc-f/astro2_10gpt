import LibConfig from '../config';
require('dotenv').config();
import LibPg from './LibPg';

const  LibTodo = {
  /**
  * 
  * @param
  *
  * @return
  */   
  getItems :async function(){
    try {
      const text = `
       SELECT * FROM public.todos ORDER BY id DESC LIMIT 1000
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
      const client = LibPg.getClient();
      const query = {
        text: 'SELECT * FROM todos WHERE id = $1',
        values: [id],
      };
      const res = await client.query(query);
      client.end();
      const data = res.rows[0];
console.log(data);
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
  createTodo: async function (
    userId: number,
    title: string,
    description: string,
    dueDate: Date,
    completed: boolean,
  ): Promise<any>
  {
    try {
//console.log(userId);
      const client = LibPg.getClient();
      // TODOテーブルにレコードを登録するSQLクエリ
      const res = await client.query(
        `
        INSERT INTO todos (user_id, title, description, due_date, completed, priority, created_at, updated_at) VALUES
        ($1, $2, $3, NOW(), $4, '1', NOW(), NOW()) RETURNING *
        `
        ,
        [userId, title, description, completed],
      );
      // SQLクエリを実行する
      await client.query('COMMIT'); // トランザクションをコミット
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
  deleteTodoById :async function(id: number)
  {
    try {
  console.log(id);
      const client = LibPg.getClient();
      const query = {
        text: 'DELETE FROM todos WHERE id = $1 RETURNING *',
        values: [id],
      };      
      const result = await client.query(query);
      client.end();
//console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteTodoById:' +err);
    }        
  },             
}
export default LibTodo;
