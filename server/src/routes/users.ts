import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
//LibUser
import LibUser from '../lib/LibUser';
//
//type
interface User {
  id: string;
  name: string;
}
const userList: User[] = [
  {
    id: '1',
    name: 'User_1st',
  },
];
//type
//
export const userRouter = router({
  hello: publicProcedure.query(() => { return 'Hello World-444';}),  
  helloName: publicProcedure
    .input(z.object({ name: z.string(), age: z.number() }))
    .query(({ input }) => {
      return {
        name: `Hello World ${input.name}`,
        age: input.age,
      };
  }),  
  /**
   * userById
   * @param
   *
   * @return
   */   
  userById: publicProcedure
  .input((val: unknown) => {
    if (typeof val === 'string') return val;
    throw new Error(`Invalid input: ${typeof val}`);
  })
  .query((req) => {
    const input = req.input;
    const user = userList.find((it) => it.id === input);
    return user;
  }),
  /**
   *
   * @param
   *
   * @return
   */   
  userCreate: publicProcedure
  .input(z.object({
    name: z.string(),
    password: z.string(),
    email: z.string(),
  }))
  .mutation(async (req) => {
  //console.log(req.input.title);
    const item = {
      name: req.input.name,
      password: req.input.password,
      email: req.input.email,
    }
console.log(item);
    const result = await LibUser.addUser(item);
  console.log(result);
    return result;
  }),
  /**
   *
   * @param
   *
   * @return
   */   
  login: publicProcedure
  .input(z.object({
    password: z.string(),
    email: z.string(),
  }))
  .mutation(async (req) => {
  //console.log(req.input.title);
    const item = {
      password: req.input.password,
      email: req.input.email,
    }
console.log(item);
    const result = await LibUser.validUser(item);
console.log(result);
    return result;
  }),
  /**
   * getUserList
   * @param
   *
   * @return
   */   
  getUserList: publicProcedure.query(() => {
    return userList;
  }),   
  
});

