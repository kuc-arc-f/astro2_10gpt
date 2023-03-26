import LibTest from '../../lib/LibTest';
import { trpc } from '../../utils/trpc';

const Test = {
  /**
   * createUser
   * @param
   *
   * @return
   */ 
  createUser: async function() {
    try{
      const createdUser = await trpc.user.userCreate.mutate({ name: 'sachinraja' });
    } catch (e) {
        console.error(e);
    }
  },
  createTask: async function() {
    try{
      const task = await trpc.task.taskCreate.mutate({ title: 'sachinraja' });
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
      const valid = await LibTest.validLogin();
console.log("valid=", valid);
      if(valid === false) {
//        alert("NG, valid Login");
      }
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
Test.startProc();

export default Test;
