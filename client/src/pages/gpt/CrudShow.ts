import LibCrud from '../../lib/LibCrud';

const Crud = {
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
        const res = await LibCrud.delete(Number(id));
console.log(res);
        window.location.href = '/trpc';	
      }); 
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
Crud.startProc();

export default Crud;
