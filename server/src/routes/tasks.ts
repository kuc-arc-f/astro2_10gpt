import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
//
import LibTask from '../lib/LibTask';

//type
//
export const taskRouter = router({
  hello: publicProcedure.query(() => { return 'Hello World-444';}),  
  /**
   * getTaskList
   * @param
   *
   * @return
   */  
  getTaskList: publicProcedure.query(async () => {
    const items = await LibTask.getItems();
//console.log(items);
    return items;
  }),
  /**
   * 
   * @param
   *
   * @return
   */   
  search: publicProcedure
  .input(z.object({
    search_key: z.string(),
  }))
  .mutation(async (req) => {
//console.log(req.input.search_key);
    const items = await LibTask.search(req.input.search_key);
//console.log(item);
    return items;
  }),   
  /**
   * taskCreate
   * @param
   *
   * @return
   */  
  taskCreate: publicProcedure
  .input(z.object({
    title: z.string(),
    content: z.string(),
    userId: z.number(),
  }))
  .mutation(async (req) => {
//console.log(req.input.title);
    const item = {
      title: req.input.title,
      content: ""
    }
//console.log(item);
    const result = await LibTask.addTask(item);
console.log(result);
    return result;
  }),
  /**
   * 
   * @param
   *
   * @return
   */  
  update: publicProcedure
  .input(z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    userId: z.number(),
  }))
  .mutation(async (req) => {
//console.log(req.input.title);
    const item = {
      id: req.input.id,
      title: req.input.title,
      content: "",
      userId: 0,
    }
console.log(item);
    const result = await LibTask.update(item);
console.log(result);
    return result;
  }),  
  /**
   * getTask
   * @param
   *
   * @return
   */   
  getTask: publicProcedure
  .input((val: unknown) => {
    if (typeof val === 'string') return val;
    throw new Error(`Invalid input: ${typeof val}`);
  })
  .query(async (req) => {
//console.log(req.input);
    const result = await LibTask.getItem(Number(req.input));
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

