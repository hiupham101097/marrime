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
 * High-performance edge routing of all /api/* requests to the Worker handler
 */
export const onRequest = async (context: PagesFunctionContext): Promise<Response> => {
  // Fast-path OPTIONS preflight requests directly at the edge
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  return workerHandler.fetch(context.request, context.env, context);
};
