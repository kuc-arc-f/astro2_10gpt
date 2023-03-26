import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
//
import LibChart from '../lib/LibChart';

//type

//
export const chartRouter = router({
  /**
   * getTaskList
   * @param
   *
   * @return
   */  
  getList: publicProcedure.query(async () => {
    const items = await LibChart.getItems();
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
    const items = await LibChart.search(req.input.search_key);
//console.log(items);
    return items;
  }),   

  /**
   * taskCreate
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
    const item = {
      title: req.input.title,
      content: req.input.content,
      userId: req.input.userId,
    }
//console.log(item);
    const result = await LibChart.create(item);
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
      content: req.input.content,
      userId: 0,
    }
console.log(item);
    const result = await LibChart.update(item);
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
//console.log(req.input);
    const result = await LibChart.get(Number(req.input));
//console.log(result);
    return result;
  }),   
  /**
   *
   * @param
   *
   * @return
   */   
  delete: publicProcedure
  .input((val: unknown) => {
    if (typeof val === 'string') return val;
    throw new Error(`Invalid input: ${typeof val}`);
  })
  .mutation(async (req) => {
console.log("input=", req.input);
    const result = await LibChart.delete(Number(req.input));
//console.log(result);
    return result;
  }),  
});

