import LibAuth from './LibAuth';
import LibConfig from './LibConfig';
import { trpc } from '../utils/trpc';

const LibCrud = {
  /**
   * validLogin:
   * @param key: any
   *
   * @return
   */  
  validLogin : async function() : Promise<any>
  {
    console.log("#validLogin");
    let ret = false;
    const validLogin: boolean = await LibAuth.validLogin();
    if(validLogin !== false) {
      ret = true;
    }
    return ret;
  },
  /**
   * getList:
   * @param key: any
   *
   * @return
   */  
  getList : async function() : Promise<any>
  {
    try{
      let items: any[] = [];
      const url = LibConfig.API_URL + "/chats/index";
      const response = await fetch(url);
      const json = await response.json();
      items = json.data;
console.log(items);
      return items;
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * get:
   * @param key: any
   *
   * @return
   */      
  get : async function(id: number) : Promise<any>
  {
    try{
      let item = {};
      item = await trpc.todo.get.query(String(id));
      console.log(item);      
      return item;
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * delete:
   * @param key: any
   *
   * @return
   */   
  delete : async function(id: number) : Promise<any>
  {
    try{
//      let ret = {};
      let item = {};
      item = await trpc.task.deleteTask.mutate(String(id));
console.log(item);
      return item;
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * update:
   * @param key: any
   *
   * @return
   */   
  update : async function() : Promise<any>
  {
    try{
      const elm: any = document.querySelector('#item_id');
      const id = elm?.value;      
      const name = document.querySelector<HTMLInputElement>('#name');
      const item = {
        id: Number(id),
        title: title?.value,
        content : '',
        userId: 0,
      }
console.log(item);
      const task: any = await trpc.task.update.mutate(item);
console.log(task);
      if(task.ret !== 'OK'){
        throw new Error('Error , update');
      }
      return;
    } catch (e) {
      console.error(e);
    }
  },
}

export default LibCrud;
