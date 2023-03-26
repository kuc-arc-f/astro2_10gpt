// @filename: client.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/src/index';
const trpcUrl = import.meta.env.PUBLIC_TRPC_URL;
//console.log("trpcUrl=", trpcUrl);

// Notice the <AppRouter> generic here.
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: trpcUrl,
    }),
  ],
});
// url: 'http://localhost:4000/trpc',