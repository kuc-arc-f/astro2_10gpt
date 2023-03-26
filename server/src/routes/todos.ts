import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
//
import LibTask from '../lib/LibTask';
import LibTodo from '../lib/LibTodo';

//type
//
export const todoRouter = router({
  hello: publicProcedure.query(() => { return 'Hello World-444';}),  
  /**
   *
   * @param
   *
   * @return
   */  
  getList: publicProcedure.query(async () => {
    const items = await LibTodo.getItems();
//console.log(items);
    return items;
  }),  
  /**
   * create
   * @param
   *
   * @return
   */  
  create: publicProcedure
  .input(z.object({
    title: z.string(),
    content: z.string(),
    userId: z.number(),
  }))
  .mutation(async (req) => {
//console.log(req.input.title);
    const userId = 1;
    const title = req.input.title;
    const description = req.input.content;
    const dueDate = new Date();
    const completed = true;
    const result = await LibTodo.createTodo(
      userId,
      title,
      description,
      dueDate,
      completed,
    );
console.log(result);
    return result;
  }),
  /**
   * getTask
   * @param
   *
   * @return
   */   
  get: publicProcedure
  .input((val: unknown) => {
    if (typeof val === 'string') return val;
    throw new Error(`Invalid input: ${typeof val}`);
  })
  .query(async (req) => {
console.log(req.input);
    const result = await LibTodo.getItem(Number(req.input));
//console.log(result);
    return result;
  }),   
  /**
   *
   * @param
   *
   * @return
   */   
  deleteTask: publicProcedure
  .input((val: unknown) => {
    if (typeof val === 'string') return val;
    throw new Error(`Invalid input: ${typeof val}`);
  })
  .mutation(async (req) => {
console.log("input=", req.input);
    const result = await LibTask.deleteTask(Number(req.input));
//console.log(result);
    return result;
  }),  
});

