import { DEFAULT_WEDDING_DATA, INITIAL_WISHES } from '../shared/defaultData';
import { RSVPRecord, WishMessage } from '../shared/types';

// In-memory worker cache for Cloudflare edge execution
const edgeWishes: WishMessage[] = [...INITIAL_WISHES];
const edgeRSVPs: RSVPRecord[] = [];

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json; charset=utf-8',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 1. Health
      if (pathname === '/api/health') {
        return new Response(
          JSON.stringify({
            status: 'ok',
            runtime: 'Cloudflare Worker / Pages Function',
            timestamp: new Date().toISOString(),
          }),
          { headers: corsHeaders }
        );
      }

      // 2. Wedding Data
      if (pathname === '/api/wedding-info') {
        return new Response(
          JSON.stringify({
            success: true,
            data: DEFAULT_WEDDING_DATA,
          }),
          { headers: corsHeaders }
        );
      }

      // 3. Wishes
      if (pathname === '/api/wishes') {
        if (request.method === 'GET') {
          return new Response(
            JSON.stringify({
              success: true,
              total: edgeWishes.length,
              data: edgeWishes,
            }),
            { headers: corsHeaders }
          );
        }

        if (request.method === 'POST') {
          const body: any = await request.json();
          if (!body.name || !body.content) {
            return new Response(
              JSON.stringify({ success: false, message: 'Vui lòng nhập tên và lời chúc.' }),
              { status: 400, headers: corsHeaders }
            );
          }

          const newWish: WishMessage = {
            id: 'cf-wish-' + Date.now(),
            name: body.name.trim(),
            relationRole: body.relationRole || 'Khách quý',
            content: body.content.trim(),
            createdAt: 'Vừa xong',
            heartCount: 1,
            badge: body.badge || 'Khách mời',
          };

          edgeWishes.unshift(newWish);
          return new Response(
            JSON.stringify({ success: true, message: 'Gửi lời chúc thành công!', data: newWish }),
            { status: 201, headers: corsHeaders }
          );
        }
      }

      // 4. RSVP
      if (pathname === '/api/rsvp') {
        if (request.method === 'GET') {
          return new Response(
            JSON.stringify({
              success: true,
              totalRecords: edgeRSVPs.length,
              data: edgeRSVPs,
            }),
            { headers: corsHeaders }
          );
        }

        if (request.method === 'POST') {
          const body: any = await request.json();
          if (!body.guestName) {
            return new Response(
              JSON.stringify({ success: false, message: 'Vui lòng nhập họ và tên.' }),
              { status: 400, headers: corsHeaders }
            );
          }

          const newRSVP: RSVPRecord = {
            id: 'cf-rsvp-' + Date.now(),
            guestName: body.guestName.trim(),
            role: body.role || 'ban',
            attending: body.attending || 'yes',
            attendeesCount: Number(body.attendeesCount) || 1,
            phone: body.phone?.trim(),
            dietRequirement: body.dietRequirement?.trim(),
            message: body.message?.trim(),
            createdAt: new Date().toISOString(),
          };

          edgeRSVPs.unshift(newRSVP);

          if (body.message && body.message.trim().length > 3) {
            edgeWishes.unshift({
              id: 'cf-wish-from-rsvp-' + Date.now(),
              name: body.guestName.trim(),
              relationRole: 'Khách quý',
              content: body.message.trim(),
              createdAt: 'Vừa xong',
              heartCount: 1,
              badge: 'Xác nhận tham dự',
            });
          }

          return new Response(
            JSON.stringify({ success: true, message: 'Xác nhận thành công!', data: newRSVP }),
            { status: 201, headers: corsHeaders }
          );
        }
      }

      // 5. Fallback to Static Assets (For Cloudflare Workers with Assets)
      if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
        return env.ASSETS.fetch(request);
      }

      return new Response(
        JSON.stringify({ error: 'Endpoint not found' }),
        { status: 404, headers: corsHeaders }
      );
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: err.message || 'Server error' }),
        { status: 500, headers: corsHeaders }
      );
    }
  },
};

