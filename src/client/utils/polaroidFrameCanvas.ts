/**
 * Luxury Wedding Polaroid Frame Canvas Engine
 * Generates an ultra-high resolution (1080x1350, 4:5 vertical) vintage gold-foil
 * Polaroid frame with couple monogram, date, guest caption, and decorative filigree.
 */

export interface PolaroidOptions {
  imageUrl: string;
  groomName: string;
  brideName: string;
  weddingDateFormatted?: string;
  venueName?: string;
  uploaderName?: string;
  tableNumber?: string;
  caption?: string;
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

export async function generatePolaroidDataUrl(opts: PolaroidOptions): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not supported');

  // 1. Polaroid Textured Cream Background
  ctx.fillStyle = '#FFFDF9';
  ctx.fillRect(0, 0, 1080, 1350);

  // 2. Subtle Outer Drop Shadow Simulation & Double Gold Foil Outer Border
  ctx.strokeStyle = '#DFB76C';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, 1020, 1290);

  ctx.strokeStyle = 'rgba(223, 183, 108, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(38, 38, 1004, 1274);

  // 3. Gold Corner Filigree Accents
  ctx.fillStyle = '#A2682A';
  ctx.font = '20px serif';
  ctx.fillText('✦', 45, 58);
  ctx.fillText('✦', 1020, 58);
  ctx.fillText('✦', 45, 1305);
  ctx.fillText('✦', 1020, 1305);

  // 4. Main Photo Window (940 x 940)
  const photoX = 70;
  const photoY = 70;
  const photoSize = 940;

  // Background for photo window before image loads
  ctx.fillStyle = '#F5F2EB';
  ctx.fillRect(photoX, photoY, photoSize, photoSize);

  try {
    const photo = await loadImage(opts.imageUrl);

    // Draw image centered & cropped to square
    const minSide = Math.min(photo.naturalWidth, photo.naturalHeight);
    const sx = (photo.naturalWidth - minSide) / 2;
    const sy = (photo.naturalHeight - minSide) / 2;

    ctx.drawImage(photo, sx, sy, minSide, minSide, photoX, photoY, photoSize, photoSize);
  } catch (err) {
    console.warn('Failed to load image into polaroid:', err);
    ctx.fillStyle = '#8B1A32';
    ctx.font = '24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('MARRIME ATELIER PHOTO', 540, 540);
  }

  // Inner Photo Gold Border
  ctx.strokeStyle = 'rgba(223, 183, 108, 0.7)';
  ctx.lineWidth = 2;
  ctx.strokeRect(photoX, photoY, photoSize, photoSize);

  // 5. Polaroid Bottom Text Ribbon (Y: 1040 -> 1300)
  const cleanGroom = opts.groomName || 'Tuấn Anh';
  const cleanBride = opts.brideName || 'Mai Phương';

  // Couple Monogram Crest
  ctx.textAlign = 'center';
  ctx.fillStyle = '#8B1A32';
  ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
  ctx.fillText(`${cleanGroom} & ${cleanBride}`, 540, 1075);

  // Subtitle
  ctx.fillStyle = '#A2682A';
  ctx.font = '600 16px "Montserrat", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText(
    `KỶ NIỆM NGÀY CHUNG ĐÔI • ${opts.weddingDateFormatted || '20.11.2026'}`,
    540,
    1110
  );

  // Custom Caption or Uploader Signature
  if (opts.caption) {
    ctx.fillStyle = '#3B0E1B';
    ctx.font = 'italic 20px "Playfair Display", Georgia, serif';
    ctx.letterSpacing = '0px';
    ctx.fillText(`"${opts.caption}"`, 540, 1160);
  }

  // Footer Credit
  const uploaderText = opts.uploaderName
    ? `Chụp bởi: ${opts.uploaderName} ${opts.tableNumber ? `(Bàn ${opts.tableNumber})` : ''}`
    : `${opts.venueName || 'Riverside Palace Grand Ballroom'}`;

  ctx.fillStyle = '#8C7862';
  ctx.font = '14px sans-serif';
  ctx.fillText(uploaderText, 540, 1220);

  // Atelier Seal watermark at bottom
  ctx.fillStyle = '#DFB76C';
  ctx.font = '12px sans-serif';
  ctx.fillText('✦ MARRIME ROYAL WEDDING ATELIER ✦', 540, 1265);

  return canvas.toDataURL('image/jpeg', 0.95);
}

export async function downloadPolaroidImage(opts: PolaroidOptions): Promise<void> {
  const dataUrl = await generatePolaroidDataUrl(opts);
  const link = document.createElement('a');
  link.download = `polaroid_wedding_${opts.groomName}_${opts.brideName}.jpg`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
