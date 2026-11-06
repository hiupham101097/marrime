# 💒 Website Cưới Lãng Mạn (Wedding Invitation & Love Journey)

Website thiệp cưới online cao cấp, thiết kế Fullstack với **React.js** (Frontend) và **Node.js** (Backend) nằm chung trong cùng một hệ thống thư mục (`src/`), sẵn sàng triển khai trên nền tảng **Cloudflare Pages / Cloudflare Workers**.

---

## ✨ Điểm Nổi Bật & Tính Năng

1. **💌 Thiệp Cưới Tương Tác (Interactive Envelope Experience):**
   - Khi khách truy cập lần đầu, website hiển thị phong bì thiệp cưới sang trọng với con dấu sáp vàng ánh kim khắc tên dâu rể (A&P).
   - Khi nhấp **"Mở Thiệp"**: Con dấu mở bung, pháo hoa giấy & tim bay tung bay, nhạc cưới acoustic ngân vang, lá thư mời trượt lên và mở ra toàn bộ nội dung website.
   - Có nút **"Mở Lại Thiệp"** để khách xem lại hiệu ứng bất cứ lúc nào.

2. **👫 Chặng Đường & Timeline Tình Yêu (Love Journey):**
   - Hành trình tình yêu qua từng cột mốc đáng nhớ:
     - *2020: Lần đầu chạm ánh mắt (Quán cà phê góc phố Phan Chu Trinh)*
     - *2021: Lời tỏ tình dưới cơn mưa đầu mùa (Hồ Tây)*
     - *2023: Hành trình ngắm hoàng hôn (Phú Quốc)*
     - *2025: Khoảnh khắc "Yes, I Do!" (Đêm Giáng Sinh)*
     - *2026: Ngày Chung Đôi - Hạnh Phúc Trọn Vẹn (Lễ Thành Hôn)*
   - Hình ảnh sắc nét, huy hiệu cột mốc, hiệu ứng phóng to ảnh khi nhấp xem chi tiết.

3. **💌 Những Lời Nhắn Nhủ (Love Letters):**
   - Lời thì thầm chân thành của Chú Rể gửi Cô Dâu.
   - Lời tâm tình sâu sắc của Cô Dâu gửi Chú Rể.
   - Trích dẫn câu nói tình yêu & cam kết trọn đời.

4. **🙏 Lời Tri Ân & Cảm Ơn (Gratitude):**
   - Lời cảm ơn sâu sắc tới công sinh thành dưỡng dục của cha mẹ hai bên.
   - Lời cảm ơn tới anh chị em, bạn bè, đồng nghiệp và quan khách.

5. **🏛️ Thời Gian, Địa Điểm & Sảnh Cưới:**
   - **Sảnh cưới:** **Sảnh Grand Ballroom (Tầng 3)**.
   - **Địa điểm:** Trung Tâm Hội Nghị & Tiệc Cưới Riverside Palace.
   - **Địa chỉ:** 360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh.
   - **Thời gian:** 11:00 SA Chủ Nhật, 20/11/2026 (12/10 Âm lịch).
   - Nút **"Xem Bản Đồ & Chỉ Đường"** (mở Google Maps) và **"Lưu Lịch"** (đồng bộ Google Calendar).

6. **🎯 Cá Nhân Hóa Danh Xưng Khách Mời (Guest Roles):**
   - Tự động thay đổi lời xưng hô trên thiệp theo URL params:
     - `?guest=Tuấn&role=anh` -> *"Kính mời: Anh Tuấn và gia đình"*
     - `?guest=Hương&role=chi` -> *"Kính mời: Chị Hương và gia đình"*
     - `?guest=Lan&role=co` -> *"Kính mời: Cô Lan và gia đình"*
     - `?guest=Hùng&role=chu` -> *"Kính mời: Chú Hùng và gia đình"*
     - `?guest=Thành&role=bac` -> *"Kính mời: Bác Thành và gia đình"*
     - `?guest=Nam&role=ban` -> *"Kính mời: Bạn Nam và người thương"*
   - Có thanh thử nghiệm danh xưng trực quan và nút **"Sao chép link thiệp"** 1 chạm để dâu rể dễ dàng gửi cho từng người.

7. **📝 Xác Nhận Tham Dự (RSVP) & Sổ Lưu Bút Trực Tuyến:**
   - Kết nối trực tiếp với **Node.js Backend API** (`/api/rsvp` và `/api/wishes`).
   - Khách xác nhận số người đi cùng, để lại số điện thoại và lời chúc.
   - Sổ lưu bút trực tuyến cập nhật ngay lập tức và hỗ trợ thả tim yêu thương.

8. **🎁 Hộp Mừng Cưới Online (VietQR):**
   - Tab mừng cưới Chú rể & Cô dâu với mã VietQR tự động, số tài khoản và nút sao chép STK nhanh chóng.

9. **🌸 Hiệu Ứng Yêu Thương & Âm Nhạc:**
   - Cánh hoa hồng rơi và trái tim lượn lờ (sử dụng Canvas hiệu năng cao, có nút bật/tắt).
   - Nhạc nền acoustic Canon in D tự động phát khi mở thiệp, có thanh điều khiển đĩa than quay và âm lượng.
   - Font chữ chuẩn **Inter** kết hợp serif sang trọng.

---

## 🏗️ Cấu Trúc Dự Án (Src Chung Hệ Thống)

```
marrime/
├── src/
│   ├── client/                    # Frontend React.js
│   │   ├── components/            # Các khối giao diện thiệp cưới
│   │   │   ├── EnvelopeModal.tsx        # Phong bì mở đầu tương tác
│   │   │   ├── HeroSection.tsx          # Bìa cưới & đếm ngược
│   │   │   ├── GuestInvitationCard.tsx  # Thiệp cá nhân hóa (Bạn/Anh/Chị/Cô/Chú)
│   │   │   ├── CoupleSection.tsx        # Giới thiệu Chú rể & Cô dâu
│   │   │   ├── TimelineSection.tsx      # Chặng đường tình yêu qua từng mốc
│   │   │   ├── LoveMessagesSection.tsx  # Lời hẹn ước & nhắn nhủ
│   │   │   ├── ThankYouSection.tsx      # Lời tri ân sâu sắc
│   │   │   ├── EventDetailsSection.tsx  # Thời gian, địa điểm, sảnh cưới
│   │   │   ├── RSVPSection.tsx          # Xác nhận tham dự (kết nối Node.js BE)
│   │   │   ├── WishingWallSection.tsx   # Sổ lưu bút trực tuyến & thả tim
│   │   │   ├── GiftBoxModal.tsx         # Hộp mừng cưới online (VietQR)
│   │   │   ├── FloatingEffects.tsx      # Cánh hoa hồng & tim bay
│   │   │   └── MusicPlayer.tsx          # Trình phát nhạc đĩa than
│   │   ├── hooks/                 # Hooks xử lý âm thanh & danh xưng khách
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css              # Tailwind & font Inter
│   ├── server/                    # Backend Node.js
│   │   ├── app.ts                 # Express API routes
│   │   ├── node-server.ts         # Server Node.js (phục vụ local & server)
│   │   ├── cloudflare-worker.ts   # Edge handler cho Cloudflare
│   │   └── storage.ts             # Quản lý lưu trữ RSVP & Wishes (JSON db)
│   └── shared/                    # Dữ liệu & Type dùng chung
│       ├── types.ts               # Interfaces TypeScript
│       └── defaultData.ts         # Dữ liệu đám cưới mẫu đầy cảm xúc
├── functions/                     # Cloudflare Pages Functions adapter
│   └── api/
│       └── [[catchall]].ts
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── wrangler.toml                  # Cấu hình máy chủ Cloudflare
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy

### 1. Chạy Môi Trường Phát Triển (Local Development)
Chạy đồng thời cả Frontend (Vite) và Backend (Node.js):
```bash
npm run dev
```
- **Frontend React:** `http://localhost:5173`
- **Backend Node.js API:** `http://localhost:3001`
- Frontend đã được cấu hình proxy tự động chuyển tiếp các request `/api/*` sang Node.js server.

### 2. Build Dự Án
```bash
npm run build
```
Lệnh này sẽ biên dịch:
- Frontend React vào thư mục `dist/`
- Cloudflare Edge Worker vào `dist/worker.js`

### 3. Chạy Toàn Bộ Bằng Node.js Server (Fullstack Production)
```bash
npm start
```
Node.js sẽ khởi động tại `http://localhost:3001`, phục vụ toàn bộ website giao diện lẫn các API backend `/api/rsvp`, `/api/wishes`, `/api/wedding-info`.

---

## ☁️ Triển Khai Lên Máy Chủ Cloudflare

Dự án đã được tích hợp sẵn cấu hình Cloudflare Pages Functions & `wrangler.toml`:

### Cách 1: Triển khai qua Wrangler CLI
1. Đăng nhập Cloudflare:
   ```bash
   npx wrangler login
   ```
2. Build và deploy lên Cloudflare Pages:
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name=wedding-invitation
   ```

### Cách 2: Triển khai tự động qua GitHub + Cloudflare Pages Dashboard
1. Đẩy mã nguồn lên repository GitHub của bạn.
2. Truy cập **Cloudflare Dashboard** -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Cài đặt thông số build:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Bấm **Save and Deploy**. Cloudflare sẽ tự động build giao diện và kích hoạt hệ thống API thông qua thư mục `functions/`.

---

## ⚙️ Tuỳ Biến Thông Tin Đám Cưới
Bạn chỉ cần mở tệp [defaultData.ts](file:///f:/App_hoan_thien/marrime/src/shared/defaultData.ts) để chỉnh sửa:
- Tên cô dâu & chú rể, hình đại diện, quê quán, thông tin tài khoản ngân hàng.
- Thời gian, sảnh tiệc cưới, địa chỉ và link bản đồ.
- Các mốc kỷ niệm trong Timeline (năm, ngày, tiêu đề, câu chuyện, hình ảnh kỷ niệm).
- Lời nhắn nhủ và lời tri ân gửi phụ huynh & người thân.

