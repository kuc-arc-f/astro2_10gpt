import LibCrud from '../../lib/LibCrud';
import LibConfig from '../../lib/LibConfig';
import { trpc } from '../../utils/trpc';

const Crud = {
  /**
   * delete:
   * @param key: any
   *
   * @return
   */   
  delete : async function(id: number) : Promise<any>
  {
    try{
      let item = {};
      item = await trpc.todo.delete.mutate(String(id));
console.log(item);
      return item;
    } catch (e) {
      console.error(e);
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
      const elm: any = document.querySelector('#item_id');
      const id = elm?.value;
console.log("id=", id);
      const button: any = document.querySelector('#btn_delete');
      button.addEventListener('click', async () => {
        const res = await this.delete(Number(id));
console.log(res);
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
