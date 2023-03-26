import LibTest from '../../lib/LibTest';

const Test = {
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
        alert("NG, valid Login");
        location.href = '/login';
      }
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
Test.startProc();

export default Test;
