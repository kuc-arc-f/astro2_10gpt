import LibCookie from './LibCookie';
import LibConfig from './LibConfig';
//
const Layout = {
  /**
   *
   * @param key: any
   *
   * @return
   */  
  startProc : async function() : Promise<any>
  {
console.log("#Layout.startProc");
    let ret = false;
    const parsedUrl = new URL(window.location.href);
//console.log(parsedUrl);
    if(!(parsedUrl.pathname === '/login' || parsedUrl.pathname === '/basic_login')) 
    {
console.log("pathname=", parsedUrl.pathname);
      const key = LibConfig.COOKIE_KEY_AUTH;
      const auth = LibCookie.get_cookie(key);
      if(typeof auth === "undefined" || auth === null)
      {
        location.href = '/basic_login';
      }
      console.log(key, auth);      
    }
    return ret;
  }
}
Layout.startProc();

export default Layout;
