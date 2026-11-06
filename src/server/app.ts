import express, { Request, Response } from 'express';
import cors from 'cors';
import { storage } from './storage';
import { DEFAULT_WEDDING_DATA } from '../shared/defaultData';
import { RSVPRecord, WishMessage } from '../shared/types';

export const app = express();

app.use(cors());
app.use(express.json());

// 1. Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Wedding API Backend',
  });
});

// 2. Wedding Data (Info, Timeline, Events, Couple)
app.get('/api/wedding-info', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: storage.getWeddingData(),
  });
});

// Admin Wedding Configuration Update
app.put('/api/admin/wedding-config', (req: Request, res: Response) => {
  const { pin, config } = req.body;

  // Simple PIN check (default '123456')
  const validPin = process.env.ADMIN_PIN || '123456';
  if (pin !== validPin) {
    res.status(401).json({
      success: false,
      message: 'Mã PIN quản trị không chính xác!',
    });
    return;
  }

  if (!config) {
    res.status(400).json({
      success: false,
      message: 'Dữ liệu cấu hình không hợp lệ.',
    });
    return;
  }

  const updated = storage.updateWeddingData(config);
  res.json({
    success: true,
    message: 'Cập nhật thông tin đám cưới thành công!',
    data: updated,
  });
});

// 3. Wishes / Sổ Lưu Bút
app.get('/api/wishes', (req: Request, res: Response) => {
  const wishes = storage.getWishes();
  res.json({
    success: true,
    total: wishes.length,
    data: wishes,
  });
});

app.post('/api/wishes', (req: Request, res: Response) => {
  const { name, relationRole, content, badge } = req.body;

  if (!name || !content) {
    res.status(400).json({
      success: false,
      message: 'Vui lòng nhập tên và lời chúc mừng của bạn.',
    });
    return;
  }

  const newWish = storage.addWish({
    name: String(name).trim(),
    relationRole: String(relationRole || 'Khách quý').trim(),
    content: String(content).trim(),
    badge: badge ? String(badge).trim() : 'Khách mời',
  });

  res.status(201).json({
    success: true,
    message: 'Gửi lời chúc thành công!',
    data: newWish,
  });
});

app.post('/api/wishes/:id/like', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const updated = storage.likeWish(String(id));
  if (!updated) {
    res.status(404).json({ success: false, message: 'Không tìm thấy lời chúc' });
    return;
  }
  res.json({ success: true, data: updated });
});

// 4. RSVP / Xác Nhận Tham Dự
app.get('/api/rsvp', (req: Request, res: Response) => {
  const rsvps = storage.getRSVPs();
  const attendingCount = rsvps
    .filter(r => r.attending === 'yes')
    .reduce((sum, r) => sum + (r.attendeesCount || 1), 0);

  res.json({
    success: true,
    totalRecords: rsvps.length,
    totalAttendingGuests: attendingCount,
    data: rsvps,
  });
});

app.post('/api/rsvp', (req: Request, res: Response) => {
  const { guestName, role, attending, attendeesCount, phone, dietRequirement, message } = req.body;

  if (!guestName) {
    res.status(400).json({
      success: false,
      message: 'Vui lòng nhập tên của quý khách.',
    });
    return;
  }

  const record = storage.addRSVP({
    guestName: String(guestName).trim(),
    role: role || 'ban',
    attending: attending || 'yes',
    attendeesCount: Number(attendeesCount) || 1,
    phone: phone ? String(phone).trim() : undefined,
    dietRequirement: dietRequirement ? String(dietRequirement).trim() : undefined,
    message: message ? String(message).trim() : undefined,
  });

  // If the guest also left a warm message, automatically add it to the wishing wall!
  if (message && message.trim().length > 3) {
    storage.addWish({
      name: String(guestName).trim(),
      relationRole: role === 'anh' ? 'Anh/Chị' : role === 'co' || role === 'chu' ? 'Cô/Chú' : 'Khách quý',
      content: String(message).trim(),
      badge: 'Xác nhận tham dự',
    });
  }

  res.status(201).json({
    success: true,
    message: 'Cảm ơn quý khách đã gửi phản hồi tham dự!',
    data: record,
  });
});

