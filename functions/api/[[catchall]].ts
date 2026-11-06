import workerHandler from '../../src/server/cloudflare-worker';

export interface PagesFunctionContext {
  request: Request;
  env: Record<string, any>;
  params: Record<string, string | string[]>;
  waitUntil: (promise: Promise<any>) => void;
  next: () => Promise<Response>;
  data: Record<string, any>;
}

/**
 * Cloudflare Pages Functions Handler
 * Routes all /api/* requests to the Cloudflare Worker handler
 */
export const onRequest = async (context: PagesFunctionContext): Promise<Response> => {
  return workerHandler.fetch(context.request, context.env, context);
};
