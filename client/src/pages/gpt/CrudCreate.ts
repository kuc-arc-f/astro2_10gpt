import LibCrud from '../../lib/LibCrud';
import LibAuth from '../../lib/LibAuth';
import LibConfig from '../../lib/LibConfig';
import { trpc } from '../../utils/trpc';
//
const Crud = {
  /**
   * addItem:
   * @param key: any
   *
   * @return
   */
  addItem : async function() : Promise<any>
  {
    try{
      let ret = false;
      const title = document.querySelector<HTMLInputElement>('#title');
      const item = {
        title: title?.value,
        content : '',
        userId:  0,
      }
console.log(item);
      const todo: any = await trpc.todo.create.mutate(item);
console.log(todo);
      if(todo.ret !== LibConfig.OK_CODE) {
        return ret;
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error("Error, addItem");
      console.error(e);
      throw new Error('Error , addItem');
    }
  },  
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      const valid = await LibCrud.validLogin();
//console.log("valid=", valid);
      if(valid === false) {
//        alert("NG, valid Login");
      }
      //btn
      const button: any = document.querySelector('#btn_save');
      button.addEventListener('click', async () => {
        const result = await this.addItem();
        console.log("result=", result);
        window.location.href = '/gpt';
      }); 
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
Crud.startProc();

export default Crud;
