import { addAbortSignal } from "stream";
require('dotenv').config();

const { Pool, Client } = require('pg')
//
const LibPg = {
  /**
  * getPool
  * @param
  *
  * @return object
  */    
  getPool: function()
  {
    try{
      const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
      });
      return pool;    
    } catch (e) {
      console.error(e);
      throw new Error('Error , getPool');
    }    
  },
  /**
  * getClient
  * @param
  *
  * @return object
  */    
  getClient: function(): any
  {
    try{
      const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
      })
      client.connect();
      return client;      
    } catch (err) {
      console.log(err);
      throw new Error('Error, getClient');
    }
  },
  /**
  * execute
  * @param text :string
  * @param values: any
  *
  * @return Promise<any>
  */    
   execute: async function(text :string, values: any): Promise<any>
   {
    try{
      const client = this.getClient();
      const res = await client.query(text, values);
      client.end();
      const result = res.rows[0];
      return result;     
    } catch (err) {
      console.log(err);
      throw new Error('Error, execute');
    }
  },
  /**
  * execute
  * @param text :string
  * @param values: any
  *
  * @return Promise<any>
  */    
   get: async function(text :string): Promise<any>
   {
    try{
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
      const data = res.rows;
      return data;     
    } catch (err) {
      console.log(err);
      throw new Error('Error, execute');
    }
  },
}
export default LibPg;
