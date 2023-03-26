import LibAuth from '../../lib/LibAuth';
import LibConfig from '../../lib/LibConfig';
import { trpc } from '../../utils/trpc';
//
const User = {
  /**
   * create:
   * @param key: any
   *
   * @return
   */
  create : async function() : Promise<any>
  {
    try{
      let ret = false;
      const name = document.querySelector<HTMLInputElement>('#name');
      const password = document.querySelector<HTMLInputElement>('#password');
      const email = document.querySelector<HTMLInputElement>('#email');
      const item = {
        name: name?.value,
        email: email?.value,
        password: password?.value,
      }
//console.log(item);
      const user:any = await trpc.user.userCreate.mutate(item);
//console.log(user);
      if(user.ret !== LibConfig.OK_CODE) {
        console.error("error, trpc.user.userCreate");
        throw new Error("error, trpc.user.userCreate");
      }
      window.location.href = '/login';
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
    }
  },
}

export default User;
