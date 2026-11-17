/**
 * Luxury HTML5 Canvas Visual Invite Card Generator
 * Generates an ultra-refined, high-resolution (1080x1080) royal wedding card
 * with personalized guest name, QR code, and ornate gold accents for Zalo/FB sharing.
 */

export interface InviteCardOptions {
  guestName: string;
  guestRoleLabel: string;
  groomName: string;
  brideName: string;
  ceremonyType: 'LỄ THÀNH HÔN' | 'LỄ VU QUY' | 'LỄ BÁO HỶ';
  weddingDateFormatted: string;
  venueName: string;
  hallName?: string;
  tableNumber?: string;
  inviteUrl: string;
  theme?: 'royal_garnet' | 'ivory_gold';
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image: ' + src));
    img.src = src;
  });
}

export async function generateInviteCardDataUrl(opts: InviteCardOptions): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not supported');

  const isDark = opts.theme !== 'ivory_gold';

  // 1. Background
  if (isDark) {
    const grad = ctx.createRadialGradient(540, 500, 100, 540, 540, 680);
    grad.addColorStop(0, '#5C1626');
    grad.addColorStop(0.65, '#3B0A16');
    grad.addColorStop(1, '#20050C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);
  } else {
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, 1080, 1080);
  }

  // 2. Double Gold Hairline Borders
  ctx.strokeStyle = '#DFB76C';
  ctx.lineWidth = 3;
  ctx.strokeRect(45, 45, 990, 990);

  ctx.strokeStyle = 'rgba(223, 183, 108, 0.45)';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(55, 55, 970, 970);

  // 3. Ornate Corner Filigrees
  const drawCorner = (x: number, y: number, scaleX: number, scaleY: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scaleX, scaleY);
    ctx.strokeStyle = '#DFB76C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(0, 0);
    ctx.lineTo(30, 0);
    ctx.moveTo(8, 22);
    ctx.lineTo(8, 8);
    ctx.lineTo(22, 8);
    ctx.stroke();

    ctx.fillStyle = '#DFB76C';
    ctx.beginPath();
    ctx.arc(8, 8, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawCorner(65, 65, 1, 1);
  drawCorner(1015, 65, -1, 1);
  drawCorner(65, 1015, 1, -1);
  drawCorner(1015, 1015, -1, -1);

  // 4. Atelier Medallion at Top
  ctx.save();
  ctx.translate(540, 140);
  ctx.beginPath();
  ctx.arc(0, 0, 42, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#722235' : '#FFFDF9';
  ctx.fill();
  ctx.strokeStyle = '#DFB76C';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 36, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(223, 183, 108, 0.5)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = 'bold 26px "Playfair Display", Georgia, serif';
  ctx.fillStyle = isDark ? '#FFF0D0' : '#4A1020';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const monogram = `${opts.groomName.charAt(0)}&${opts.brideName.charAt(0)}`;
  ctx.fillText(monogram, 0, 2);
  ctx.restore();

  // 5. Ceremony Banner Title
  ctx.textAlign = 'center';
  ctx.fillStyle = '#DFB76C';
  ctx.font = 'bold 18px sans-serif';
  ctx.letterSpacing = '5px';
  ctx.fillText('TRÂN TRỌNG KÍNH BÁO', 540, 230);

  ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
  ctx.fillStyle = isDark ? '#FFFDF9' : '#4A1020';
  ctx.letterSpacing = '3px';
  ctx.fillText(opts.ceremonyType, 540, 280);

  // Decorative hairline divider
  ctx.strokeStyle = 'rgba(223, 183, 108, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(380, 310);
  ctx.lineTo(700, 310);
  ctx.stroke();

  ctx.fillStyle = '#DFB76C';
  ctx.font = '16px serif';
  ctx.fillText('❧ ✦ ☙', 540, 314);

  // 6. Guest Personalization Cartouche
  const cartoucheY = 370;
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.03)';
  ctx.beginPath();
  ctx.roundRect(140, cartoucheY, 800, 110, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(223, 183, 108, 0.6)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = '#DFB76C';
  ctx.font = 'bold 15px sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('THÂN MỜI QUÝ KHÁCH', 540, cartoucheY + 34);

  ctx.fillStyle = isDark ? '#FFF7E6' : '#2C0611';
  ctx.font = 'bold 34px "Playfair Display", Georgia, serif';
  ctx.letterSpacing = '1px';
  const guestTitle = `${opts.guestName} ${opts.guestRoleLabel ? `(${opts.guestRoleLabel})` : ''}`;
  ctx.fillText(guestTitle, 540, cartoucheY + 78);

  // 7. Couple Names
  ctx.fillStyle = '#DFB76C';
  ctx.font = 'italic 20px "Playfair Display", Georgia, serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('Chung vui cùng gia đình & hai nhân vật chính', 540, 535);

  ctx.fillStyle = isDark ? '#FFFFFF' : '#4A1020';
  ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
  ctx.letterSpacing = '2px';
  ctx.fillText(`${opts.groomName}  &  ${opts.brideName}`, 540, 595);

  // 8. Event Details (Date & Venue)
  ctx.fillStyle = '#DFB76C';
  ctx.font = 'bold 22px sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText(`📅  ${opts.weddingDateFormatted}`, 540, 660);

  ctx.fillStyle = isDark ? '#E5D6C8' : '#5A4A42';
  ctx.font = '19px sans-serif';
  const venueLine = `${opts.venueName}${opts.hallName ? ` • ${opts.hallName}` : ''}`;
  ctx.fillText(venueLine, 540, 700);

  if (opts.tableNumber) {
    ctx.fillStyle = '#FFDE8A';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(`📍 Vị trí bàn tiệc dành riêng: ${opts.tableNumber}`, 540, 735);
  }

  // 9. QR Code (Load dynamic high-res QR code)
  const qrSize = 150;
  const qrX = 540 - qrSize / 2;
  const qrY = 780;

  try {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      opts.inviteUrl
    )}&margin=10`;
    const qrImg = await loadImage(qrUrl);

    // Draw white container for QR
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 12);
    ctx.fill();
    ctx.strokeStyle = '#DFB76C';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
  } catch {
    // If QR image fetch fails, draw placeholder
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX, qrY, qrSize, qrSize);
  }

  // 10. QR Instruction & Brand Footer
  ctx.fillStyle = '#DFB76C';
  ctx.font = 'bold 15px sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('QUÉT MÃ MỞ THIỆP 3D & XÁC NHẬN THAM DỰ', 540, 975);

  ctx.fillStyle = 'rgba(223, 183, 108, 0.6)';
  ctx.font = '12px sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('MARRIME ATELIER • HAUTE COUTURE WEDDING STATIONERY', 540, 1005);

  return canvas.toDataURL('image/png', 0.95);
}

export async function downloadInviteCard(opts: InviteCardOptions, filename?: string): Promise<void> {
  const dataUrl = await generateInviteCardDataUrl(opts);
  const link = document.createElement('a');
  link.href = dataUrl;
  const safeName = opts.guestName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  link.download = filename || `thiep_moi_${safeName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
