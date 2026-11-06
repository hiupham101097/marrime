import { DEFAULT_WEDDING_DATA, INITIAL_WISHES } from '../shared/defaultData';
import { RSVPRecord, WishMessage } from '../shared/types';

// In-memory worker cache for Cloudflare edge execution
let edgeWeddingData: any = { ...DEFAULT_WEDDING_DATA };
const edgeProjects: Record<string, any> = {
  'tuan-anh-mai-phuong': {
    slug: 'tuan-anh-mai-phuong',
    secretPin: '123456',
    data: { ...DEFAULT_WEDDING_DATA },
    updatedAt: new Date().toISOString(),
  },
};
const edgeWishes: WishMessage[] = [...INITIAL_WISHES];
const edgeRSVPs: RSVPRecord[] = [];

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
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

      // 2. Wedding Data (Supports query ?w=slug)
      if (pathname === '/api/wedding-info') {
        const querySlug = searchParams.get('w') || searchParams.get('slug') || 'default';
        const project = edgeProjects[querySlug] || edgeProjects['tuan-anh-mai-phuong'];
        return new Response(
          JSON.stringify({
            success: true,
            slug: querySlug,
            data: project ? project.data : edgeWeddingData,
          }),
          { headers: corsHeaders }
        );
      }

      // 3. Publish Wedding Project
      if (pathname === '/api/weddings/publish' && request.method === 'POST') {
        const body: any = await request.json();
        const rawSlug = body.slug || `${body.config?.groom?.shortName || 'groom'}-${body.config?.bride?.shortName || 'bride'}`;
        const slug = rawSlug
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9_-]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '') || 'wedding-' + Date.now();

        const secretPin = body.secretPin || '123456';
        const config = body.config || edgeWeddingData;

        edgeProjects[slug] = {
          slug,
          secretPin,
          data: config,
          updatedAt: new Date().toISOString(),
        };
        edgeWeddingData = config;

        return new Response(
          JSON.stringify({
            success: true,
            message: 'Xuất bản thiệp cưới thành công!',
            slug,
            shareUrl: `https://${url.host}/?w=${slug}`,
            data: config,
          }),
          { headers: corsHeaders }
        );
      }

      // 4. Get Wedding by Slug
      if (pathname.startsWith('/api/weddings/')) {
        const targetSlug = pathname.replace('/api/weddings/', '').trim();
        const project = edgeProjects[targetSlug] || edgeProjects['tuan-anh-mai-phuong'];
        if (project) {
          return new Response(
            JSON.stringify({
              success: true,
              slug: project.slug,
              data: project.data,
            }),
            { headers: corsHeaders }
          );
        }
      }

      // Admin Wedding Config Update
      if (pathname === '/api/admin/wedding-config') {
        if (request.method === 'PUT') {
          const body: any = await request.json();
          const validPin = env?.ADMIN_PIN || '123456';
          if (body.pin !== validPin) {
            return new Response(
              JSON.stringify({ success: false, message: 'Mã PIN quản trị không chính xác!' }),
              { status: 401, headers: corsHeaders }
            );
          }

          if (!body.config) {
            return new Response(
              JSON.stringify({ success: false, message: 'Thiếu dữ liệu cấu hình.' }),
              { status: 400, headers: corsHeaders }
            );
          }

          edgeWeddingData = {
            ...edgeWeddingData,
            ...body.config,
            groom: {
              ...edgeWeddingData.groom,
              ...(body.config.groom || {}),
              parents: {
                ...edgeWeddingData.groom.parents,
                ...(body.config.groom?.parents || {}),
              },
              bankInfo: {
                ...edgeWeddingData.groom.bankInfo,
                ...(body.config.groom?.bankInfo || {}),
              },
            },
            bride: {
              ...edgeWeddingData.bride,
              ...(body.config.bride || {}),
              parents: {
                ...edgeWeddingData.bride.parents,
                ...(body.config.bride?.parents || {}),
              },
              bankInfo: {
                ...edgeWeddingData.bride.bankInfo,
                ...(body.config.bride?.bankInfo || {}),
              },
            },
          };

          return new Response(
            JSON.stringify({
              success: true,
              message: 'Cập nhật cấu hình thành công!',
              data: edgeWeddingData,
            }),
            { status: 200, headers: corsHeaders }
          );
        }
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

