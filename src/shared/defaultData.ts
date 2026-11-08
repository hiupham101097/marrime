import {
  WeddingData,
  WishMessage,
  WeddingMusicConfig,
  GalleryPhotoItem,
  WeddingSectionsConfig,
  WeddingDonateConfig,
} from './types';

export const DEFAULT_SECTIONS_CONFIG: WeddingSectionsConfig = {
  showGuestCard: true,
  showCouple: true,
  showGallery: true,
  showTimeline: true,
  showLoveMessages: true,
  showDresscode: true,
  showEvents: true,
  showRSVP: true,
  showWishes: true,
  showDonateBox: true,
};

export const DEFAULT_DONATE_CONFIG: WeddingDonateConfig = {
  enabled: true,
  title: 'Hộp Mừng Cưới & Chúc Phúc Tùy Tâm',
  subtitle: 'Tình cảm và lời chúc của bạn là món quà quý giá nhất. Nếu ở xa không thể về dự tiệc, bạn có thể gửi quà chúc phúc tùy tâm tới Dâu & Rể tại đây.',
  revealMode: 'on_completion_only',
  showQr: true,
  thankYouMessage: 'Dâu & Rể xin chân thành cảm ơn tình cảm và món quà thương quý của bạn!',
};

export interface AuthorDonateConfig {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrImageUrl: string;
  title: string;
  subtitle: string;
  message: string;
}

export const AUTHOR_DONATE_CONFIG: AuthorDonateConfig = {
  bankName: 'ACB (Ngân Hàng Á Châu)',
  accountNumber: '7909707',
  accountHolder: 'PHẠM MINH HIẾU',
  qrImageUrl: '/images/author-qr.jpg',
  title: 'Tặng Tác Giả Ly Cà Phê Chúc Phúc ☕',
  subtitle: 'Nền tảng thiệp cưới mở & miễn phí cho dâu rể',
  message:
    'Marrime là nền tảng tạo thiệp cưới miễn phí. Nếu bạn thấy thiệp đẹp và hữu ích cho hôn lễ của mình, bạn có thể gửi tặng một ly cà phê chúc phúc tới tác giả. Ủng hộ hoàn toàn tùy tâm, không gửi cũng không sao, thiệp cưới của hai bạn vẫn hoạt động vĩnh viễn và hoàn toàn miễn phí!',
};

export const DEFAULT_GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    id: 'g-1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    title: 'Ánh Nhìn Ngập Tràn Yêu Thương',
    category: 'royal',
    caption: 'Trong lễ đường trang nghiêm, em là cô dâu xinh đẹp nhất trần đời.',
  },
  {
    id: 'g-2',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
    title: 'Nắm Chặt Tay Nhau',
    category: 'vows',
    caption: 'Bàn tay ấm che chở nhau qua mọi thăng trầm giông bão cuộc đời.',
  },
  {
    id: 'g-3',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    title: 'Nụ Cười Ngày Chung Đôi',
    category: 'moments',
    caption: 'Nụ cười rạng rỡ của niềm hạnh phúc trọn vẹn và tự hào.',
  },
  {
    id: 'g-4',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop',
    title: 'Lời Hẹn Ước Trăm Năm',
    category: 'vows',
    caption: 'Chiếc nhẫn ước hẹn gắn kết hai cuộc đời thành một thể không thể tách rời.',
  },
  {
    id: 'g-5',
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop',
    title: 'Hoàng Hôn Nơi Biển Vắng',
    category: 'moments',
    caption: 'Chuyến đi lưu giữ thanh xuân rực rỡ và những cái ôm dịu dàng.',
  },
  {
    id: 'g-6',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop',
    title: 'Vũ Điệu Hạnh Phúc',
    category: 'royal',
    caption: 'Bản hòa ca của tình yêu đơm hoa kết trái dưới sự chúc phúc của gia đình.',
  },
];

export const SAMPLE_PHOTO_LIBRARY = {
  heroBackgrounds: [
    {
      name: 'Lễ Đường Hoàng Gia',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
    },
    {
      name: 'Nắng Hoàng Hôn Lãng Mạn',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop',
    },
    {
      name: 'Cổng Hoa Vườn Cổ Tích',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2000&auto=format&fit=crop',
    },
    {
      name: 'Bãi Biển Trắng Mộng Mơ',
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2000&auto=format&fit=crop',
    },
  ],
  groomAvatars: [
    {
      name: 'Âu Phục Lịch Lãm',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Vest Đen Cổ Điển',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Nụ Cười Rạng Rỡ',
      url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    },
  ],
  brideAvatars: [
    {
      name: 'Váy Cưới Dịu Dàng',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Voan Cài Tóc Lãng Mạn',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Nàng Thơ Tươi Tắn',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    },
  ],
  galleryMoments: [
    {
      name: 'Ánh Nhìn Yêu Thương',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Nắm Chặt Tay Nhau',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Nụ Cười Chung Đôi',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Nhẫn Cưới Hẹn Ước',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Hoàng Hôn Biển Vắng',
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Vũ Điệu Hạnh Phúc',
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop',
    },
  ],
};

export const PRESET_MUSIC_TRACKS: WeddingMusicConfig[] = [
  {
    trackId: 'canon_in_d',
    title: 'Canon in D (Acoustic Piano & Harp Hòa Tấu)',
    artist: 'Johann Pachelbel',
    url: '', // Uses built-in synthesized harp & acoustic piano
  },
  {
    trackId: 'a_thousand_years',
    title: 'A Thousand Years (Violin & Piano Hòa Tấu)',
    artist: 'The Piano Guys / Christina Perri',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-wedding-love-112199.mp3',
  },
  {
    trackId: 'beautiful_in_white',
    title: 'Beautiful In White (Acoustic Guitar & Piano)',
    artist: 'Shane Filan',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=wedding-melody-acoustic-10255.mp3',
  },
  {
    trackId: 'until_i_found_you',
    title: 'Until I Found You (Dreamy Romantic Strings)',
    artist: 'Stephen Sanchez',
    url: 'https://cdn.pixabay.com/download/audio/2023/02/28/audio_550e55711b.mp3?filename=gentle-wedding-acoustic-140885.mp3',
  },
  {
    trackId: 'custom',
    title: 'Nhạc MP3 Tùy Chỉnh Của Dâu Rể',
    artist: 'Tự Tải Lên / Tự Nhập Link',
    url: '',
  },
];

// ==========================================
// 1. ROYAL VELVET PRESET (Cung Điện Châu Âu Quý Tộc)
// ==========================================
export const ROYAL_VELVET_DATA: WeddingData = {
  theme: 'burgundy',
  template: 'royal',
  envelopeStyle: 'royal_velvet',
  waxSealMonogram: 'T & P',
  typographyFont: 'playfair',
  animationEffect: 'golden_stardust',
  enableMouseTrail: true,
  heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
  gallery: DEFAULT_GALLERY_PHOTOS,
  music: PRESET_MUSIC_TRACKS[0],
  groom: {
    role: 'Chú Rể',
    name: 'Nguyễn Tuấn Anh',
    shortName: 'Tuấn Anh',
    title: 'Kỹ Sư Phần Mềm',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Nguyễn Văn Hùng',
      mother: 'Lê Thị Thu Thảo',
    },
    hometown: 'Hà Nội',
    description: 'Một chàng trai hướng nội nhưng luôn tràn ngập sự chân thành và kiên định. Trong mắt anh, tìm được Mai Phương là điều may mắn nhất đời mình.',
    bankInfo: {
      bankName: 'Vietcombank (VCB)',
      accountNumber: '1018899889',
      accountHolder: 'NGUYEN TUAN ANH',
    },
  },
  bride: {
    role: 'Cô Dâu',
    name: 'Trần Mai Phương',
    shortName: 'Mai Phương',
    title: 'Nhà Thiết Kế Đồ Họa',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Trần Minh Đức',
      mother: 'Phạm Thị Bích Ngọc',
    },
    hometown: 'Đà Nẵng',
    description: 'Một cô gái dịu dàng, yêu thiên nhiên và cái đẹp. Nụ cười của Phương là nguồn năng lượng xua tan mọi mỏi mệt trong cuộc sống.',
    bankInfo: {
      bankName: 'Techcombank (TCB)',
      accountNumber: '19036789012345',
      accountHolder: 'TRAN MAI PHUONG',
    },
  },
  weddingDate: '2026-11-20T11:00:00+07:00',
  weddingDateFormatted: 'Chủ Nhật, 20 Tháng 11 Năm 2026',
  events: [
    {
      id: 'le-thanh-hon',
      title: 'Lễ Thành Hôn & Tiệc Cưới',
      date: '20/11/2026',
      time: '11:00 SA',
      dayOfWeek: 'Chủ Nhật',
      lunarDate: 'Ngày 12 Tháng 10 Năm Bính Ngọ',
      venueName: 'Trung Tâm Hội Nghị & Tiệc Cưới Riverside Palace',
      hallName: 'Sảnh Grand Ballroom (Tầng 3)',
      address: '360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh',
      googleMapsUrl: 'https://maps.google.com/?q=Riverside+Palace+360D+Ben+Van+Don+Quan+4+Ho+Chi+Minh',
    },
    {
      id: 'le-vu-quy',
      title: 'Lễ Vu Quy (Tại Tư Gia Nhà Gái)',
      date: '20/11/2026',
      time: '08:00 SA',
      dayOfWeek: 'Chủ Nhật',
      lunarDate: 'Ngày 12 Tháng 10 Năm Bính Ngọ',
      venueName: 'Tư Gia Nhà Gái',
      hallName: 'Tư Gia Ấm Cúng',
      address: 'Số 88 Đường Nguyễn Trãi, Phường 3, Quận 5, TP. Hồ Chí Minh',
      googleMapsUrl: 'https://maps.google.com/?q=88+Nguyen+Trai+Quan+5+Ho+Chi+Minh',
    },
  ],
  timeline: [
    {
      id: 'milestone-1',
      year: '2020',
      dateStr: '15.10.2020',
      title: 'Lần Đầu Chạm Ánh Mắt',
      subtitle: 'Quán cà phê nhỏ góc phố Phan Chu Trinh',
      story: 'Một buổi chiều thu Hà Nội se lạnh, giữa tiếng nhạc Trịnh êm êm và hương cà phê ấm, chúng mình tình cờ ngồi chung chiếc bàn sát cửa kính vì quán đông khách. Từ những câu chuyện bâng quơ về cuốn sách đang đọc, hai trái tim xa lạ bỗng tìm thấy những nhịp đập đồng điệu đến diệu kỳ.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
      tag: 'Khoảnh Khắc Bắt Đầu',
      location: 'Hà Nội',
    },
    {
      id: 'milestone-2',
      year: '2021',
      dateStr: '14.02.2021',
      title: 'Lời Tỏ Tình Dưới Cơn Mưa Đầu Mùa',
      subtitle: 'Bờ hồ Tây lộng gió',
      story: 'Ngày Valentine đầu tiên bên nhau, chiếc ô nhỏ không che nổi những hạt mưa bụi, nhưng bàn tay ấm của anh đã đủ che chở cho trái tim em. "Làm người yêu anh nhé?" - câu hỏi ngập ngừng nhưng chứa chan tất cả chân thành. Và cái gật đầu của em đã bắt đầu một hành trình yêu thương rực rỡ.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop',
      tag: 'Lời Hẹn Ước',
      location: 'Hồ Tây, Hà Nội',
    },
    {
      id: 'milestone-3',
      year: '2023',
      dateStr: '28.08.2023',
      title: 'Hành Trình Ngắm Hoàng Hôn Xa Xôi',
      subtitle: 'Chuyến đi khám phá Phú Quốc',
      story: 'Chúng mình đã cùng nhau đi qua những bờ cát trắng, ngắm hoàng hôn đỏ rực buông xuống biển cả. Qua từng chuyến đi, từng lần thấu hiểu những mỏi mệt hay bất đồng nhỏ nhặt, chúng mình nhận ra đối phương chính là nơi chốn bình yên nhất để trở về sau mọi giông gió ngoài kia.',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop',
      tag: 'Cùng Nhau Trưởng Thành',
      location: 'Phú Quốc',
    },
    {
      id: 'milestone-4',
      year: '2025',
      dateStr: '24.12.2025',
      title: 'Khoảnh Khắc "Em Đồng Ý - Yes, I Do!"',
      subtitle: 'Đêm Giáng Sinh nhiệm màu',
      story: 'Dưới ánh đèn lung linh của cây thông Noel và trong sự chứng kiến của những người bạn thân thương nhất, anh quỳ gối trao chiếc nhẫn ước hẹn. Giọt nước mắt hạnh phúc lăn trên má Phương cùng lời đồng ý nghẹn ngào: "Em muốn cùng anh đi hết cuộc đời này!"',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop',
      tag: 'Cầu Hôn',
      location: 'TP. Hồ Chí Minh',
    },
    {
      id: 'milestone-5',
      year: '2026',
      dateStr: '20.11.2026',
      title: 'Ngày Chung Đôi - Hạnh Phúc Trọn Vẹn',
      subtitle: 'Về chung một mái nhà',
      story: 'Sau hơn 6 năm gắn bó, hôm nay chúng mình chính thức trao nhau chiếc nhẫn cưới, cùng bước vào một chương mới thiêng liêng. Cảm ơn vì đã luôn là mảnh ghép hoàn hảo nhất của nhau.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
      tag: 'Lễ Thành Hôn',
      location: 'Riverside Palace',
    },
  ],
  loveStoryMessages: [
    {
      author: 'Chú Rể - Tuấn Anh',
      recipient: 'Gửi Em - Người Bạn Đời Tri Kỷ',
      quote: '"Được yêu em là điều dịu dàng nhất mà cuộc sống này đã ban tặng cho anh."',
      content: 'Cảm ơn em đã bước vào thế giới của anh, kiên nhẫn thấu hiểu những bộn bề công việc và luôn tiếp thêm cho anh niềm tin mỗi ngày. Anh không hứa một cuộc đời không có sóng gió, nhưng anh hứa sẽ luôn đứng trước gió để che chở cho em, luôn là bờ vai vững chắc nhất mỗi khi em mệt mỏi. Trân trọng và yêu em bằng cả sinh mệnh này.',
      dateStr: '20.11.2026',
    },
    {
      author: 'Cô Dâu - Mai Phương',
      recipient: 'Gửi Anh - Điểm Tựa Bình Yên Của Em',
      quote: '"Thế giới ngoài kia rộng lớn bao la, nhưng chỉ cần bên anh, nơi đâu cũng là nhà."',
      content: 'Cảm ơn anh vì đã luôn bao dung cho những nét trẻ con của em, luôn nhớ từng sở thích nhỏ nhặt và chưa bao giờ buông tay em ngay cả lúc khó khăn nhất. Em tin rằng, khi hai ta cùng chung một chí hướng, cùng giữ trọn ngọn lửa yêu thương, chúng mình sẽ viết nên một tổ ấm ngập tràn tiếng cười và sự bình yên.',
      dateStr: '20.11.2026',
    },
  ],
  thankYouNote: {
    title: 'Lời Tri Ân Sâu Sắc & Lời Cảm Ơn',
    message: 'Hôn lễ của chúng con sẽ không thể trọn vẹn nếu thiếu đi sự hiện diện, tình thương và lời chúc phúc quý báu từ đấng sinh thành, họ hàng hai bên nội ngoại, cùng toàn thể quý cô chú, anh chị và các bạn bè thân quý. Sự hiện diện và lời chúc của mọi người là món quà cưới vô giá, là động lực để chúng con cùng nhau vun đắp một gia đình nhỏ hạnh phúc và bền vững mai sau.',
    signatures: 'Tuấn Anh & Mai Phương kính chúc',
  },
  sectionsConfig: { ...DEFAULT_SECTIONS_CONFIG },
  donateConfig: { ...DEFAULT_DONATE_CONFIG },
};

// ==========================================
// 2. BLUSH RIBBON PRESET (Hồng Phấn Nơ Lụa & Vườn Cổ Tích)
// ==========================================
export const BLUSH_RIBBON_DATA: WeddingData = {
  theme: 'rose',
  template: 'fairytale',
  envelopeStyle: 'blush_ribbon',
  waxSealMonogram: 'T & N',
  typographyFont: 'cormorant',
  animationEffect: 'rose_petals',
  enableMouseTrail: true,
  heroImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop',
  gallery: [
    {
      id: 'br-1',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
      title: 'Khu Vườn Cổ Tích Mùa Xuân',
      category: 'royal',
      caption: 'Giữa ngàn cánh hoa hồng nở rộ, anh nhìn thấy cả bầu trời dịu dàng trong mắt em.',
    },
    {
      id: 'br-2',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
      title: 'Chiếc Váy Trắng & Dải Nơ Hồng',
      category: 'moments',
      caption: 'Nụ cười e ấp của nàng thơ bên vòm hoa mẫu đơn ngát hương.',
    },
    {
      id: 'br-3',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop',
      title: 'Dưới Giàn Hoa Thủy Vu',
      category: 'vows',
      caption: 'Nguyện cùng em dạo bước qua bốn mùa hoa nở, mãi mãi chẳng rời.',
    },
    {
      id: 'br-4',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      title: 'Điệu Khiêu Vũ Ban Chiều',
      category: 'moments',
      caption: 'Từng bước nhảy xoay tròn theo tiếng vĩ cầm êm dịu của hoàng hôn Paris.',
    },
  ],
  music: PRESET_MUSIC_TRACKS[1], // A Thousand Years
  groom: {
    role: 'Chú Rể',
    name: 'Lê Minh Trí',
    shortName: 'Minh Trí',
    title: 'Kiến Trúc Sư Cảnh Quan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Lê Hoàng Nam',
      mother: 'Nguyễn Ngọc Lan',
    },
    hometown: 'Đà Lạt',
    description: 'Chàng kiến trúc sư lãng mạn, yêu hoa cỏ và sự tinh tế. Với Trí, Thảo Nhi chính là nguồn cảm hứng thơ mộng nhất cho mọi công trình anh kiến tạo.',
    bankInfo: {
      bankName: 'MB Bank',
      accountNumber: '0988776655',
      accountHolder: 'LE MINH TRI',
    },
  },
  bride: {
    role: 'Cô Dâu',
    name: 'Đặng Thảo Nhi',
    shortName: 'Thảo Nhi',
    title: 'Nhiếp Ảnh Gia Nghệ Thuật',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Đặng Quốc Dũng',
      mother: 'Huỳnh Mai Chi',
    },
    hometown: 'TP. Hồ Chí Minh',
    description: 'Một tâm hồn nghệ thuật bay bổng, yêu những gam màu pastel và những điều giản đơn dịu ngọt. Nhi tìm thấy ở Trí sự ấm áp và bình yên vô bờ.',
    bankInfo: {
      bankName: 'ACB',
      accountNumber: '2468101214',
      accountHolder: 'DANG THAO NHI',
    },
  },
  weddingDate: '2026-12-12T17:30:00+07:00',
  weddingDateFormatted: 'Thứ Bảy, 12 Tháng 12 Năm 2026',
  events: [
    {
      id: 'le-thanh-hon-rose',
      title: 'Lễ Thành Hôn & Dạ Tiệc Hoa Hồng',
      date: '12/12/2026',
      time: '17:30 CH',
      dayOfWeek: 'Thứ Bảy',
      lunarDate: 'Ngày 04 Tháng 11 Năm Bính Ngọ',
      venueName: 'Khách Sạn 5 Sao Park Hyatt Saigon',
      hallName: 'Sảnh Ballroom Vườn Pháp Thơ Mộng',
      address: 'Số 2 Công Trường Lam Sơn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      googleMapsUrl: 'https://maps.google.com/?q=Park+Hyatt+Saigon+2+Cong+Truong+Lam+Son',
    },
    {
      id: 'le-vu-quy-rose',
      title: 'Lễ Rước Dâu Truyền Thống',
      date: '12/12/2026',
      time: '09:00 SA',
      dayOfWeek: 'Thứ Bảy',
      lunarDate: 'Ngày 04 Tháng 11 Năm Bính Ngọ',
      venueName: 'Biệt Thự Hoa Hồng Tư Gia',
      hallName: 'Vườn Mẫu Đơn Ấm Cúng',
      address: 'Khu Biệt Thự Thảo Điền, Thành phố Thủ Đức, TP. Hồ Chí Minh',
      googleMapsUrl: 'https://maps.google.com/?q=Thao+Dien+Thu+Duc+Ho+Chi+Minh',
    },
  ],
  timeline: [
    {
      id: 'milestone-br-1',
      year: '2021',
      dateStr: '20.03.2021',
      title: 'Gặp Gỡ Tại Tiệm Hoa Phố Núi',
      subtitle: 'Đà Lạt mộng mơ trong sương sớm',
      story: 'Trí đi tìm những chậu cẩm tú cầu cho công trình mới, Nhi đang say mê bấm máy lưu giữ giọt sương trên nụ hoa. Ánh mắt chạm nhau giữa hương thơm hoa cỏ, mở ra câu chuyện tình đẹp như một khúc hoan ca.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
      tag: 'Cơ Duyên Diệu Kỳ',
      location: 'Đà Lạt',
    },
    {
      id: 'milestone-br-2',
      year: '2024',
      dateStr: '12.12.2024',
      title: 'Lời Cầu Hôn Giữa Đồi Hoa Oải Hương',
      subtitle: 'Khoảnh khắc hoàng hôn tím ngát',
      story: 'Trí thắt dải ruy băng lụa hồng quanh hộp nhẫn kim cương và quỳ gối dưới ánh chiều tà. Nhi mỉm cười trong nước mắt hạnh phúc và khẽ gật đầu: "Yes, I will love you for a thousand years!"',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop',
      tag: 'Chiếc Nhẫn Hẹn Ước',
      location: 'Đồi Hoa Đà Lạt',
    },
  ],
  loveStoryMessages: [
    {
      author: 'Chú Rể - Minh Trí',
      recipient: 'Gửi Nàng Thơ Của Anh - Thảo Nhi',
      quote: '"Em là dải lụa mềm mại nhất tô điểm cho cuộc sống bộn bề của anh trở nên rực rỡ."',
      content: 'Cảm ơn em đã đem đến cho anh niềm tin và những nụ cười trong trẻo nhất. Anh hứa sẽ luôn chăm sóc khu vườn tình yêu của chúng ta, để mỗi ngày trôi qua đều ngát hương hạnh phúc.',
      dateStr: '12.12.2026',
    },
    {
      author: 'Cô Dâu - Thảo Nhi',
      recipient: 'Gửi Chàng Tri Kỷ - Minh Trí',
      quote: '"Yêu anh là điều ngọt ngào nhất em từng chọn lựa trong cuộc đời."',
      content: 'Cảm ơn anh vì sự kiên nhẫn, bàn tay luôn siết chặt tay em qua mọi lối đi. Hãy cùng em viết tiếp những trang truyện cổ tích ngọt ngào này anh nhé!',
      dateStr: '12.12.2026',
    },
  ],
  thankYouNote: {
    title: 'Lời Cảm Ơn Chân Thành Từ Đáy Lòng',
    message: 'Tình yêu và sự hiện diện của quý vị là những đóa hoa thơm ngát nhất điểm tô cho ngày cưới của chúng con. Xin chân thành cảm ơn những lời chúc phúc ngọt ngào đã tiếp thêm sức mạnh cho tổ ấm nhỏ của Minh Trí & Thảo Nhi.',
    signatures: 'Minh Trí & Thảo Nhi đồng kính tạ',
  },
  sectionsConfig: { ...DEFAULT_SECTIONS_CONFIG },
  donateConfig: {
    ...DEFAULT_DONATE_CONFIG,
    title: 'Hộp Chúc Phúc & Món Quà Yêu Thương',
    subtitle: 'Khu vườn hạnh phúc của chúng mình càng ngát hương nhờ sự chúc phúc của bạn. Món quà tùy tâm là niềm vui to lớn đối với dâu rể.',
  },
};

// ==========================================
// 3. MODERN MINIMAL PRESET (Bắc Âu & Giấy Mỹ Thuật Viền Vàng)
// ==========================================
export const MODERN_MINIMAL_DATA: WeddingData = {
  theme: 'gold',
  template: 'modern',
  envelopeStyle: 'modern_minimal',
  waxSealMonogram: 'N • H',
  typographyFont: 'montserrat',
  animationEffect: 'golden_stardust',
  enableMouseTrail: true,
  heroImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2000&auto=format&fit=crop',
  gallery: [
    {
      id: 'mm-1',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop',
      title: 'Nét Cắt Kiến Trúc Tối Giản',
      category: 'royal',
      caption: 'Vẻ đẹp thuần khiết của tình yêu được tôn vinh qua từng đường nét tinh tế không tì vết.',
    },
    {
      id: 'mm-2',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      title: 'Khoảnh Khắc Tĩnh Lặng',
      category: 'vows',
      caption: 'Không ồn ào khoa trương, tình yêu của chúng tôi vững chãi như một tác phẩm nghệ thuật.',
    },
    {
      id: 'mm-3',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
      title: 'Đường Chỉ Mạ Vàng',
      category: 'moments',
      caption: 'Ánh sáng phản chiếu trên mặt nhẫn tối giản biểu trưng cho sự gắn kết vĩnh cửu.',
    },
  ],
  music: PRESET_MUSIC_TRACKS[3], // Until I Found You
  groom: {
    role: 'Chú Rể',
    name: 'Hoàng Nhật Nam',
    shortName: 'Nhật Nam',
    title: 'Giám Đốc Sáng Tạo',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Hoàng Anh Tuấn',
      mother: 'Vũ Minh Trang',
    },
    hometown: 'Hà Nội',
    description: 'Chủ nghĩa hoàn hảo và tối giản trong từng suy nghĩ. Điềm đạm, sâu sắc và luôn dành cho Thanh Hằng sự trân trọng tuyệt đối.',
    bankInfo: {
      bankName: 'VPBank',
      accountNumber: '9988112233',
      accountHolder: 'HOANG NHAT NAM',
    },
  },
  bride: {
    role: 'Cô Dâu',
    name: 'Vũ Thanh Hằng',
    shortName: 'Thanh Hằng',
    title: 'Biên Tập Viên Thời Trang',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Vũ Đình Trọng',
      mother: 'Trần Kim Oanh',
    },
    hometown: 'Hà Nội',
    description: 'Sắc sảo, hiện đại và tràn đầy năng lượng tươi mới. Đối với Hằng, Nhật Nam chính là mảnh ghép trọn vẹn và chuẩn mực nhất.',
    bankInfo: {
      bankName: 'TPBank',
      accountNumber: '03456789999',
      accountHolder: 'VU THANH HANG',
    },
  },
  weddingDate: '2027-01-18T18:00:00+07:00',
  weddingDateFormatted: 'Thứ Hai, 18 Tháng 01 Năm 2027',
  events: [
    {
      id: 'le-thanh-hon-minimal',
      title: 'Lễ Thành Hôn & Dạ Tiệc Bắc Âu',
      date: '18/01/2027',
      time: '18:00 CH',
      dayOfWeek: 'Thứ Hai',
      lunarDate: 'Ngày 11 Tháng 12 Năm Bính Ngọ',
      venueName: 'Capella Hanoi Hotel',
      hallName: 'Sảnh Grand Opera & Terrace',
      address: 'Số 11 Lê Phụng Hiểu, Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội',
      googleMapsUrl: 'https://maps.google.com/?q=Capella+Hanoi+11+Le+Phung+Hieu',
    },
  ],
  timeline: [
    {
      id: 'milestone-mm-1',
      year: '2022',
      dateStr: '10.05.2022',
      title: 'Cái Bắt Tay Đầu Tiên Trong Triển Lãm',
      subtitle: 'Bảo tàng Mỹ thuật Đương đại',
      story: 'Hai người cùng dừng lại trước một bức tranh sơn dầu đơn sắc. Cuộc trò chuyện về hình khối và ánh sáng đã kéo dài suốt cả buổi tối.',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop',
      tag: 'Đồng Điệu',
      location: 'Hà Nội',
    },
  ],
  loveStoryMessages: [
    {
      author: 'Chú Rể - Nhật Nam',
      recipient: 'Gửi Thanh Hằng - Người Bạn Đồng Hành',
      quote: '"Sự đơn giản đỉnh cao chính là tìm thấy một người vừa vặn với tâm hồn mình."',
      content: 'Cảm ơn em đã cùng anh xây đắp một phong cách sống tinh tế, nơi mỗi ngày trôi qua đều ý nghĩa và bình yên.',
      dateStr: '18.01.2027',
    },
    {
      author: 'Cô Dâu - Thanh Hằng',
      recipient: 'Gửi Nhật Nam - Chỗ Dựa Vững Vàng',
      quote: '"Bên anh, mọi sự phức tạp của thế giới đều trở nên nhẹ nhàng."',
      content: 'Em tin vào sự lựa chọn của trái tim mình. Cùng nhau hoàn thiện bức tranh cuộc đời phía trước nhé anh!',
      dateStr: '18.01.2027',
    },
  ],
  thankYouNote: {
    title: 'Lời Cảm Tạ Trang Trọng',
    message: 'Sự hiện diện thanh lịch và những lời chúc tốt đẹp của quý khách là niềm vinh dự sâu sắc cho ngày vui của gia đình chúng tôi.',
    signatures: 'Nhật Nam & Thanh Hằng trân trọng cảm ơn',
  },
  sectionsConfig: { ...DEFAULT_SECTIONS_CONFIG },
  donateConfig: {
    ...DEFAULT_DONATE_CONFIG,
    title: 'Hộp Quà Mừng Cưới Tinh Tế',
    subtitle: 'Sự hiện diện và lời chúc của bạn là điều trân quý nhất. Bạn cũng có thể gửi món quà chúc phúc tinh tế tới hai bạn tại đây.',
  },
};

// ==========================================
// 4. EMERALD BRASS PRESET (Xanh Lục Bảo & Con Dấu Đồng Cổ Điển)
// ==========================================
export const EMERALD_BRASS_DATA: WeddingData = {
  theme: 'emerald',
  template: 'vintage',
  envelopeStyle: 'emerald_brass',
  waxSealMonogram: 'H & L',
  typographyFont: 'cormorant',
  animationEffect: 'mixed_romance',
  enableMouseTrail: true,
  heroImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2000&auto=format&fit=crop',
  gallery: [
    {
      id: 'eb-1',
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop',
      title: 'Hơi Thở Vương Giả Cổ Điển',
      category: 'royal',
      caption: 'Sắc xanh ngọc lục bảo thâm trầm kết hợp ánh đồng thau đúc mang đến vẻ đẹp vĩnh cửu.',
    },
    {
      id: 'eb-2',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      title: 'Huy Chương Tình Yêu Vĩnh Hằng',
      category: 'vows',
      caption: 'Lời thề hẹn trăm năm được đóng dấu son bằng con dấu đồng gia tộc uy nghiêm.',
    },
  ],
  music: PRESET_MUSIC_TRACKS[2], // Beautiful in White
  groom: {
    role: 'Chú Rể',
    name: 'Đỗ Khắc Huy',
    shortName: 'Khắc Huy',
    title: 'Luật Sư Cao Cấp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Đỗ Trọng Nghĩa',
      mother: 'Phạm Thị Hoài Thu',
    },
    hometown: 'Huế',
    description: 'Bản lĩnh, đĩnh đạc và mang cốt cách quý ông cổ điển. Tình yêu với Thùy Linh là lời hứa trọn đời không bao giờ phai nhạt.',
    bankInfo: {
      bankName: 'BIDV',
      accountNumber: '12410001234567',
      accountHolder: 'DO KHAC HUY',
    },
  },
  bride: {
    role: 'Cô Dâu',
    name: 'Phạm Thùy Linh',
    shortName: 'Thùy Linh',
    title: 'Giảng Viên Âm Nhạc Cổ Điển',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Phạm Quang Vinh',
      mother: 'Hoàng Bích Liên',
    },
    hometown: 'Hải Phòng',
    description: 'Dịu dàng, đài các với tâm hồn yêu những giai điệu cổ điển. Bên cạnh Khắc Huy, Linh luôn cảm thấy an tâm và được chở che tuyệt đối.',
    bankInfo: {
      bankName: 'VietinBank',
      accountNumber: '108866554433',
      accountHolder: 'PHAM THUY LINH',
    },
  },
  weddingDate: '2027-02-28T10:30:00+07:00',
  weddingDateFormatted: 'Chủ Nhật, 28 Tháng 02 Năm 2027',
  events: [
    {
      id: 'le-thanh-hon-emerald',
      title: 'Lễ Thành Hôn Trang Trọng',
      date: '28/02/2027',
      time: '10:30 SA',
      dayOfWeek: 'Chủ Nhật',
      lunarDate: 'Ngày 22 Tháng Giêng Năm Đinh Mùi',
      venueName: 'Dinh Độc Lập (Reunification Palace Gardens)',
      hallName: 'Sảnh Khánh Tiết Cổ Điển',
      address: '135 Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
      googleMapsUrl: 'https://maps.google.com/?q=Reunification+Palace+135+Nam+Ky+Khoi+Nghia',
    },
  ],
  timeline: [
    {
      id: 'milestone-eb-1',
      year: '2023',
      dateStr: '15.09.2023',
      title: 'Hòa Nhạc Thính Phòng Mùa Thu',
      subtitle: 'Nhà Hát Thành Phố',
      story: 'Tiếng đàn dương cầm thánh thót của Thùy Linh đã làm rung động trái tim người luật sư điềm tĩnh. Sau buổi diễn, bó hoa ly trắng đầu tiên đã mở ra một mối lương duyên trời ban.',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop',
      tag: 'Định Mệnh',
      location: 'TP. Hồ Chí Minh',
    },
  ],
  loveStoryMessages: [
    {
      author: 'Chú Rể - Khắc Huy',
      recipient: 'Gửi Hiền Thê - Thùy Linh',
      quote: '"Có những giá trị vượt thời gian, và tình yêu anh dành cho em chính là điều bất biến."',
      content: 'Trân quý từng phút giây được bên em. Nguyện suốt đời che chở, yêu thương và cùng em xây đắp truyền thống gia đình mẫu mực.',
      dateStr: '28.02.2027',
    },
    {
      author: 'Cô Dâu - Thùy Linh',
      recipient: 'Gửi Phu Quân - Khắc Huy',
      quote: '"Hạnh phúc là khi tìm thấy một tâm hồn đồng điệu để nương tựa cả cuộc đời."',
      content: 'Cảm ơn anh vì sự vững chãi và thấu hiểu. Em nguyện cùng anh đi qua mọi thăng trầm của năm tháng.',
      dateStr: '28.02.2027',
    },
  ],
  thankYouNote: {
    title: 'Lời Cảm Ơn Gia Tộc & Quan Khách',
    message: 'Chúng con xin cúi đầu cảm tạ công sinh thành dưỡng dục của hai bên cha mẹ, cùng lòng ưu ái quý báu của toàn thể quý vị khách quý đã đến chứng kiến giây phút thiêng liêng này.',
    signatures: 'Khắc Huy & Thùy Linh bái tạ',
  },
  sectionsConfig: { ...DEFAULT_SECTIONS_CONFIG },
  donateConfig: {
    ...DEFAULT_DONATE_CONFIG,
    title: 'Hòm Thư Mừng Cưới Tri Ân',
    subtitle: 'Đôi uyên ương xin cảm tạ tấm lòng và lời chúc phúc của quý khách. Mọi sự chúc phúc và quà mừng là niềm vinh hạnh của gia tộc.',
  },
};

// ==========================================
// 5. TRADITIONAL SILK PRESET (Hỷ Sự Áo Dài Truyền Thống Việt Nam - Song Hỷ 囍)
// ==========================================
export const TRADITIONAL_SILK_DATA: WeddingData = {
  theme: 'crimson_gold',
  template: 'traditional',
  envelopeStyle: 'traditional_silk',
  waxSealMonogram: '囍',
  typographyFont: 'cormorant',
  animationEffect: 'golden_stardust',
  enableMouseTrail: true,
  heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2000&auto=format&fit=crop',
  gallery: DEFAULT_GALLERY_PHOTOS,
  music: PRESET_MUSIC_TRACKS[1],
  groom: {
    role: 'Chú Rể',
    name: 'Hoàng Trọng Nam',
    shortName: 'Trọng Nam',
    title: 'Kiến Trúc Sư Di Sản',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Hoàng Trọng Nghĩa',
      mother: 'Vũ Thị Minh Hạnh',
    },
    hometown: 'Thăng Long - Hà Nội',
    description: 'Chàng trai yêu văn hóa truyền thống, trân trọng nét đẹp gia phong và luôn dành trọn lòng hiếu kính, yêu thương cho tổ ấm.',
    bankInfo: {
      bankName: 'Vietcombank (VCB)',
      accountNumber: '9988776655',
      accountHolder: 'HOANG TRONG NAM',
    },
  },
  bride: {
    role: 'Cô Dâu',
    name: 'Lê Ngọc Ánh',
    shortName: 'Ngọc Ánh',
    title: 'Giảng Viên Mỹ Thuật',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Lê Văn Khang',
      mother: 'Nguyễn Thị Bích Trâm',
    },
    hometown: 'Cố Đô Huế',
    description: 'Nàng thơ xứ Huế đoan trang thùy mị, duyên dáng trong tà áo dài truyền thống và luôn mang lại sự an yên cho người bạn đời.',
    bankInfo: {
      bankName: 'BIDV',
      accountNumber: '12345678999',
      accountHolder: 'LE NGOC ANH',
    },
  },
  weddingDate: '2026-12-08T11:00:00+07:00',
  weddingDateFormatted: 'Thứ Ba, 08 Tháng 12 Năm 2026',
  events: [
    {
      id: 'le-thanh-hon-trad',
      title: 'Lễ Thành Hôn & Tiệc Mừng Hạnh Phúc',
      date: '08/12/2026',
      time: '11:00 SA',
      dayOfWeek: 'Thứ Ba',
      lunarDate: 'Ngày 29 Tháng 10 Năm Bính Ngọ (Hoàng Đạo)',
      venueName: 'Trung Tâm Yến Tiệc Hoàng Cung Grand',
      hallName: 'Đại Sảnh Long Phụng Hòa Minh (Tầng 2)',
      address: 'Số 18 Đường Hoàng Hoa Thám, Ba Đình, Hà Nội',
      googleMapsUrl: 'https://maps.google.com/?q=Hoang+Hoa+Tham+Ba+Dinh+Ha+Noi',
    },
    {
      id: 'le-vu-quy-trad',
      title: 'Lễ Vu Quy & Xuất Giá',
      date: '08/12/2026',
      time: '07:30 SA',
      dayOfWeek: 'Thứ Ba',
      lunarDate: 'Ngày 29 Tháng 10 Năm Bính Ngọ',
      venueName: 'Tư Gia Nhà Gái',
      hallName: 'Gian Thờ Gia Tiên',
      address: 'Phố Cổ Kim Mã, Ba Đình, Hà Nội',
      googleMapsUrl: 'https://maps.google.com/?q=Kim+Ma+Ba+Dinh+Ha+Noi',
    },
  ],
  timeline: [
    {
      id: 'trad-1',
      year: '2021',
      dateStr: '10.10.2021',
      title: 'Duyên Phận Ban Đầu',
      subtitle: 'Triển lãm gốm sứ & áo dài Hà Nội',
      story: 'Cuộc gặp gỡ tình cờ giữa chàng kiến trúc sư phục dựng di sản và cô giảng viên mỹ thuật đã kết nên mối lương duyên thắm đượm bản sắc Việt.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
      tag: 'Khởi Duyên',
      location: 'Hà Nội',
    },
    {
      id: 'trad-2',
      year: '2024',
      dateStr: '02.09.2024',
      title: 'Lời Hẹn Ước Trăm Năm',
      subtitle: 'Bến thuyền Sông Hương êm đềm',
      story: 'Dưới ánh trăng rằm xứ Huế, lời nguyện ước cùng nhau kết tóc xe tơ, sống trọn đạo phu thê nghĩa tình son sắt.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
      tag: 'Giao Ước',
      location: 'Huế',
    },
  ],
  loveStoryMessages: [
    {
      author: 'Hoàng Trọng Nam',
      recipient: 'Gửi Hiền Thê Ngọc Ánh',
      quote: '"Loan phụng hòa minh, sắt cầm hảo hợp — Trọn kiếp này nguyện che chở nương tử chu toàn."',
      content: 'Cảm ơn nàng đã đến, mang theo nét dịu hiền và sự ấm áp làm rạng rỡ cả mái nhà chúng ta.',
      dateStr: '08.12.2026',
    },
    {
      author: 'Lê Ngọc Ánh',
      recipient: 'Gửi Phu Quân Trọng Nam',
      quote: '"Thuận vợ thuận chồng, tát biển đông cũng cạn — Nguyện cùng chàng đi hết đoạn đường trần thế."',
      content: 'Bên chàng, thiếp luôn thấy bình yên và niềm tin son sắt vào một tương lai rạng ngời.',
      dateStr: '08.12.2026',
    },
  ],
  thankYouNote: {
    title: 'Cảm Tạ Ân Tình Hai Họ & Bằng Hữu',
    message: 'Hai con xin thành kính tạ ơn công đức cù lao của cha mẹ hai bên, cùng sự hiện diện quý báu của cô dì chú bác, anh chị em và bạn hữu thân thương đã đến chúc phúc cho ngày trăm năm viên mãn!',
    signatures: 'Trọng Nam & Ngọc Ánh kính lạy',
  },
  sectionsConfig: { ...DEFAULT_SECTIONS_CONFIG },
  donateConfig: {
    ...DEFAULT_DONATE_CONFIG,
    title: 'Hòm Mừng Cưới Chúc Phúc Tùy Tâm',
    subtitle: 'Tình cảm và lời chúc của quan khách là món quà quý nhất. Quý khách ở xa có thể gửi thiệp mừng chúc phúc tới dâu rể tại đây.',
  },
};

// ==========================================
// 6. INDOCHINE HERITAGE PRESET (Đông Dương Hoài Niệm & Nghệ Thuật Di Sản)
// ==========================================
export const INDOCHINE_HERITAGE_DATA: WeddingData = {
  theme: 'indochine_moss',
  template: 'indochine',
  envelopeStyle: 'indochine_kraft',
  waxSealMonogram: 'Đ & H',
  typographyFont: 'playfair',
  animationEffect: 'golden_stardust',
  enableMouseTrail: true,
  heroImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop',
  gallery: DEFAULT_GALLERY_PHOTOS,
  music: PRESET_MUSIC_TRACKS[2],
  groom: {
    role: 'Chú Rể',
    name: 'Đặng Minh Đức',
    shortName: 'Minh Đức',
    title: 'Nhiếp Ảnh Gia Nghệ Thuật',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Đặng Quốc Huy',
      mother: 'Ngô Thục Quyên',
    },
    hometown: 'Sài Gòn Xưa',
    description: 'Chàng trai say mê nét đẹp kiến trúc Đông Dương, say mê những cuộn phim analog và ánh mắt của người thương.',
    bankInfo: {
      bankName: 'Techcombank',
      accountNumber: '1903882299',
      accountHolder: 'DANG MINH DUC',
    },
  },
  bride: {
    role: 'Cô Dâu',
    name: 'Hà Thu Hương',
    shortName: 'Thu Hương',
    title: 'Giám Đốc Sáng Tạo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Hà Thế Vinh',
      mother: 'Lâm Bích Hợp',
    },
    hometown: 'Hà Nội',
    description: 'Cô gái mang nét thanh lịch cổ điển của tiểu thư Tràng An, sâu sắc và tinh tế trong từng nếp sống.',
    bankInfo: {
      bankName: 'MBBank',
      accountNumber: '0988776655',
      accountHolder: 'HA THU HUONG',
    },
  },
  weddingDate: '2026-11-28T17:30:00+07:00',
  weddingDateFormatted: 'Thứ Bảy, 28 Tháng 11 Năm 2026',
  events: [
    {
      id: 'indochine-sunset-party',
      title: 'Dạ Tiệc Cưới Đông Dương Sunset Gala',
      date: '28/11/2026',
      time: '05:30 CH',
      dayOfWeek: 'Thứ Bảy',
      lunarDate: 'Ngày 19 Tháng 10 Năm Bính Ngọ',
      venueName: 'Biệt Thự Cổ Indochine Riverside Villa',
      hallName: 'Sân Vườn Di Sản Bến Sông',
      address: 'Số 12 Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức, TP. HCM',
      googleMapsUrl: 'https://maps.google.com/?q=Thao+Dien+Thu+Duc+Ho+Chi+Minh',
    },
  ],
  timeline: [
    {
      id: 'indo-1',
      year: '2022',
      dateStr: '20.04.2022',
      title: 'Chạm Nhau Qua Ống Kính',
      subtitle: 'Quán cà phê Pháp cổ khu Chợ Lớn',
      story: 'Tấm hình chụp vội một chiều nắng nghiêng qua ô cửa gạch bông Đông Dương đã lưu giữ nụ cười của nàng thơ suốt những năm tháng thanh xuân.',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop',
      tag: 'Kỷ Niệm',
      location: 'Sài Gòn',
    },
  ],
  loveStoryMessages: [
    {
      author: 'Minh Đức',
      recipient: 'Gửi Thu Hương',
      quote: '"Thời gian có thể phủ mờ vạn vật, nhưng tình yêu anh dành cho em sẽ như nét chạm trổ son vàng."',
      content: 'Mỗi ngày trôi qua bên em đều là một tác phẩm nghệ thuật quý giá mà anh trân trọng nhất đời.',
      dateStr: '28.11.2026',
    },
  ],
  thankYouNote: {
    title: 'Tri Ân Khách Quý & Người Thân',
    message: 'Chân thành cảm ơn sự hiện diện và những lời chúc phúc ấm áp của quý khách trong không gian hoài niệm thân mật của hai gia đình.',
    signatures: 'Minh Đức & Thu Hương kính tạ',
  },
  sectionsConfig: { ...DEFAULT_SECTIONS_CONFIG },
  donateConfig: {
    ...DEFAULT_DONATE_CONFIG,
    title: 'Hộp Quà Chúc Mừng Hoài Niệm',
  },
};

// ==========================================
// 7. RUSTIC BOTANICAL PRESET (Rustic Bohemian & Khu Vườn Địa Đàng Tự Nhiên)
// ==========================================
export const RUSTIC_BOTANICAL_DATA: WeddingData = {
  theme: 'rustic_sage',
  template: 'rustic',
  envelopeStyle: 'rustic_twine',
  waxSealMonogram: '🌿',
  typographyFont: 'cormorant',
  animationEffect: 'rose_petals',
  enableMouseTrail: true,
  heroImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2000&auto=format&fit=crop',
  gallery: DEFAULT_GALLERY_PHOTOS,
  music: PRESET_MUSIC_TRACKS[3],
  groom: {
    role: 'Chú Rể',
    name: 'Phan Quốc Bảo',
    shortName: 'Quốc Bảo',
    title: 'Chuyên Gia Lâm Nghiệp & Cảnh Quan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Phan Văn Cương',
      mother: 'Đỗ Thị Lan Phương',
    },
    hometown: 'Đà Lạt Mộng Mơ',
    description: 'Chàng trai yêu tự do, rừng thông và cây cỏ. Khao khát lớn nhất là dựng một ngôi nhà nhỏ nơi sườn đồi cùng người mình yêu.',
    bankInfo: {
      bankName: 'ACB',
      accountNumber: '2468101214',
      accountHolder: 'PHAN QUOC BAO',
    },
  },
  bride: {
    role: 'Cô Dâu',
    name: 'Vũ Mai Lan',
    shortName: 'Mai Lan',
    title: 'Chuyên Gia Trị Liệu Thiên Nhiên',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Vũ Đình Toàn',
      mother: 'Tô Thị Thanh Thúy',
    },
    hometown: 'Đà Lạt',
    description: 'Cô gái dịu ngọt như hương hoa cỏ sớm mai, luôn mang lại nguồn năng lượng chữa lành và niềm vui trong trẻo.',
    bankInfo: {
      bankName: 'VPBank',
      accountNumber: '9876543210',
      accountHolder: 'VU MAI LAN',
    },
  },
  weddingDate: '2026-12-15T16:00:00+07:00',
  weddingDateFormatted: 'Thứ Ba, 15 Tháng 12 Năm 2026',
  events: [
    {
      id: 'rustic-outdoor-vow',
      title: 'Lễ Trao Lời Hẹn Ước & Tiệc Sân Vườn Pine Hill',
      date: '15/12/2026',
      time: '04:00 CH',
      dayOfWeek: 'Thứ Ba',
      lunarDate: 'Ngày 07 Tháng 11 Năm Bính Ngọ',
      venueName: 'Khu Nghỉ Dưỡng Rừng Thông Pine Hill Garden',
      hallName: 'Đồi Thông Hoàng Hôn (Outdoor Lawn)',
      address: 'Đường Hoa Cẩm Tú Cầu, Phường 3, TP. Đà Lạt, Lâm Đồng',
      googleMapsUrl: 'https://maps.google.com/?q=Da+Lat+Lam+Dong',
    },
  ],
  timeline: [
    {
      id: 'rustic-1',
      year: '2023',
      dateStr: '12.05.2023',
      title: 'Hẹn Hò Dưới Tán Rừng Thông',
      subtitle: 'Đỉnh đồi chè Cầu Đất',
      story: 'Giữa biển mây bồng bềnh và ngọn gió cao nguyên se lạnh, chiếc áo khoác trao vội đã sưởi ấm hai trái tim gắn kết trọn đời.',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop',
      tag: 'Tự Nhiên',
      location: 'Đà Lạt',
    },
  ],
  loveStoryMessages: [
    {
      author: 'Quốc Bảo',
      recipient: 'Gửi Mai Lan',
      quote: '"Như cây rừng tìm về đất mẹ, cả cuộc đời anh tìm thấy bình yên khi có em kề bên."',
      content: 'Cảm ơn em vì đã cùng anh vun trồng nên khu vườn hạnh phúc ngập tràn sắc hoa này.',
      dateStr: '15.12.2026',
    },
  ],
  thankYouNote: {
    title: 'Gửi Lời Biết Ơn Từ Khu Vườn Tình Yêu',
    message: 'Cảm ơn bạn bè và gia đình đã không quản ngại đường xa đến giữa thiên nhiên hùng vĩ để chung vui cùng hai đứa mình!',
    signatures: 'Quốc Bảo & Mai Lan thân thương',
  },
  sectionsConfig: { ...DEFAULT_SECTIONS_CONFIG },
  donateConfig: {
    ...DEFAULT_DONATE_CONFIG,
    title: 'Hộp Mừng Cưới Sân Vườn Tùy Tâm',
  },
};

// ==========================================
// 8. EDITORIAL VOGUE PRESET (Tạp Chí Thời Trang Đương Đại - Monochrome High-Fashion)
// ==========================================
export const EDITORIAL_VOGUE_DATA: WeddingData = {
  theme: 'editorial_mono',
  template: 'editorial',
  envelopeStyle: 'editorial_vellum',
  waxSealMonogram: 'V & M',
  typographyFont: 'montserrat',
  animationEffect: 'none',
  enableMouseTrail: false,
  heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
  gallery: DEFAULT_GALLERY_PHOTOS,
  music: PRESET_MUSIC_TRACKS[4],
  groom: {
    role: 'Chú Rể',
    name: 'Michael Vũ',
    shortName: 'Michael',
    title: 'Giám Đốc Nghệ Thuật & Stylist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Vũ Quốc Khánh',
      mother: 'Jennifer Phạm',
    },
    hometown: 'New York / Sài Gòn',
    description: 'Chàng trai mang tư duy thẩm mỹ tối giản đỉnh cao, luôn tìm kiếm vẻ đẹp nguyên bản và cảm xúc chân thật nhất.',
    bankInfo: {
      bankName: 'Standard Chartered',
      accountNumber: '8833001122',
      accountHolder: 'MICHAEL VU',
    },
  },
  bride: {
    role: 'Cô Dâu',
    name: 'Victoria Đoàn',
    shortName: 'Victoria',
    title: 'Nhà Biên Tập Thời Trang',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Đoàn Quang Trí',
      mother: 'Trần Cát Tiên',
    },
    hometown: 'TP. Hồ Chí Minh',
    description: 'Nàng thơ mang phong cách Parisian chic kiêu sa, quyến rũ và sở hữu gu thẩm mỹ thời thượng hàng đầu.',
    bankInfo: {
      bankName: 'HSBC Việt Nam',
      accountNumber: '00192837465',
      accountHolder: 'VICTORIA DOAN',
    },
  },
  weddingDate: '2027-01-16T18:00:00+07:00',
  weddingDateFormatted: 'Thứ Bảy, 16 Tháng 01 Năm 2027',
  events: [
    {
      id: 'vogue-black-tie-gala',
      title: 'Black-Tie Wedding Soirée & Cocktail Reception',
      date: '16/01/2027',
      time: '06:00 CH',
      dayOfWeek: 'Thứ Bảy',
      lunarDate: 'Ngày 09 Tháng 12 Năm Bính Ngọ',
      venueName: 'The Reverie Saigon - Luxury 6-Star Hotel',
      hallName: 'The Grand Ballroom Level 5',
      address: '22-36 Nguyễn Huệ & 57-69F Đồng Khởi, Bến Nghé, Quận 1, TP. HCM',
      googleMapsUrl: 'https://maps.google.com/?q=The+Reverie+Saigon+Nguyen+Hue+Quan+1',
    },
  ],
  timeline: [
    {
      id: 'vogue-1',
      year: '2023',
      dateStr: '24.09.2023',
      title: 'Paris Fashion Week',
      subtitle: 'Quán Café de Flore bên dòng sông Seine',
      story: 'Hai người bạn đồng điệu về ngôn ngữ nghệ thuật và thời trang đã tìm thấy ở nhau sự trọn vẹn của tâm hồn.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
      tag: 'Editorial',
      location: 'Paris, France',
    },
  ],
  loveStoryMessages: [
    {
      author: 'Michael Vũ',
      recipient: 'To Victoria',
      quote: '"Simplicity is the ultimate sophistication, and you are my greatest masterpiece."',
      content: 'You turned my whole world into a poetic runway of love and timeless elegance.',
      dateStr: '16.01.2027',
    },
  ],
  thankYouNote: {
    title: 'Thank You For Being Part Of Our Story',
    message: 'To our family and closest friends, thank you for witnessing our love story in this unforgettable high-fashion evening.',
    signatures: 'Michael & Victoria with love',
  },
  sectionsConfig: { ...DEFAULT_SECTIONS_CONFIG },
  donateConfig: {
    ...DEFAULT_DONATE_CONFIG,
    title: 'Wedding Registry & Voluntary Gift Box',
  },
};

// ==========================================
// 9. KOREAN PASTEL PRESET (Hàn Quốc Thanh Thoát & Lãng Mạn Mộng Mơ)
// ==========================================
export const KOREAN_PASTEL_DATA: WeddingData = {
  theme: 'korean_peach',
  template: 'korean',
  envelopeStyle: 'korean_chiffon',
  waxSealMonogram: 'K & S',
  typographyFont: 'cormorant',
  animationEffect: 'glowing_hearts',
  enableMouseTrail: true,
  heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
  gallery: DEFAULT_GALLERY_PHOTOS,
  music: PRESET_MUSIC_TRACKS[0],
  groom: {
    role: 'Chú Rể',
    name: 'Kim Gia Huy',
    shortName: 'Gia Huy',
    title: 'Nhạc Sĩ Sản Xuất m Nhạc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Kim Văn Thịnh',
      mother: 'Dương Mỹ An',
    },
    hometown: 'Seoul / Đà Nẵng',
    description: 'Chàng trai ấm áp như tách trà gừng ngày mưa, luôn dành những giai điệu ngọt ngào nhất viết riêng cho em.',
    bankInfo: {
      bankName: 'Shinhan Bank Việt Nam',
      accountNumber: '7001928374',
      accountHolder: 'KIM GIA HUY',
    },
  },
  bride: {
    role: 'Cô Dâu',
    name: 'Shin Ngọc My',
    shortName: 'Ngọc My',
    title: 'Chuyên Gia Bánh Ngọt Nghệ Thuật',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Shin Tae Wook',
      mother: 'Võ Kim Ngân',
    },
    hometown: 'Đà Nẵng',
    description: 'Cô gái kẹo ngọt với nụ cười tỏa nắng, thích hoa baby trắng và những điều giản dị trong veo.',
    bankInfo: {
      bankName: 'Techcombank',
      accountNumber: '1903664422',
      accountHolder: 'SHIN NGOC MY',
    },
  },
  weddingDate: '2026-12-25T10:30:00+07:00',
  weddingDateFormatted: 'Thứ Sáu, 25 Tháng 12 Năm 2026',
  events: [
    {
      id: 'korean-sweet-wedding',
      title: 'Lễ Thành Hôn Ngọt Ngào & Tiệc Cưới Giáng Sinh',
      date: '25/12/2026',
      time: '10:30 SA',
      dayOfWeek: 'Thứ Sáu',
      lunarDate: 'Ngày 17 Tháng 11 Năm Bính Ngọ',
      venueName: 'The Pastel White Glasshouse',
      hallName: 'Sảnh Hoa Tuyết & Thủy Tinh (Tầng 2)',
      address: 'Số 99 Đường Bạch Đằng, Hải Châu, TP. Đà Nẵng',
      googleMapsUrl: 'https://maps.google.com/?q=Bach+Dang+Hai+Chau+Da+Nang',
    },
  ],
  timeline: [
    {
      id: 'kor-1',
      year: '2023',
      dateStr: '14.03.2023',
      title: 'Mùa Hoa Anh Đào Nở Rộ',
      subtitle: 'Con đường hoa ven sông Hàn',
      story: 'Dưới cơn mưa hoa anh đào bay lất phất, hai bàn tay khẽ chạm nhau, mở ra câu chuyện tình yêu ngọt ngào như bản tình ca.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
      tag: 'Kẹo Ngọt',
      location: 'Đà Nẵng',
    },
  ],
  loveStoryMessages: [
    {
      author: 'Gia Huy',
      recipient: 'Gửi Bé Bánh Ngọt Ngọc My',
      quote: '"Thế giới ngoài kia dẫu có hối hả đến đâu, chỉ cần về bên em là bình yên dịu dàng nhất."',
      content: 'Anh hứa sẽ luôn làm em mỉm cười mỗi sáng và nắm tay em đi qua mọi mùa đông lạnh giá.',
      dateStr: '25.12.2026',
    },
  ],
  thankYouNote: {
    title: 'Gửi Triệu Trái Tim Yêu Thương',
    message: 'Cảm ơn mọi người đã cùng hai đứa mình thắp sáng ngày vui hạnh phúc nhất trong mùa Giáng sinh ấm áp!',
    signatures: 'Huy & My gửi ngàn nụ hôn',
  },
  sectionsConfig: { ...DEFAULT_SECTIONS_CONFIG },
  donateConfig: {
    ...DEFAULT_DONATE_CONFIG,
    title: 'Hộp Quà Chúc Phúc Trà Sữa & Bánh Ngọt',
  },
};

// ==========================================
// 10. CELESTIAL MIDNIGHT PRESET (Dạ Tiệc Ánh Trăng & Dải Ngân Hà)
// ==========================================
export const CELESTIAL_MIDNIGHT_DATA: WeddingData = {
  theme: 'midnight_star',
  template: 'celestial',
  envelopeStyle: 'celestial_midnight',
  waxSealMonogram: '🌙',
  typographyFont: 'playfair',
  animationEffect: 'golden_stardust',
  enableMouseTrail: true,
  heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
  gallery: DEFAULT_GALLERY_PHOTOS,
  music: PRESET_MUSIC_TRACKS[1],
  groom: {
    role: 'Chú Rể',
    name: 'Lâm Nhật Quang',
    shortName: 'Nhật Quang',
    title: 'Nhà Nghiên Cứu Thiên Văn Học',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Lâm Thế Hùng',
      mother: 'Dương Thanh Thảo',
    },
    hometown: 'Nha Trang Biển Xanh',
    description: 'Chàng trai dành cả thanh xuân ngắm nhìn các vì sao, cho đến ngày tìm thấy vì tinh tú sáng nhất cuộc đời mình.',
    bankInfo: {
      bankName: 'VietinBank',
      accountNumber: '1088997766',
      accountHolder: 'LAM NHAT QUANG',
    },
  },
  bride: {
    role: 'Cô Dâu',
    name: 'Tạ Minh Nguyệt',
    shortName: 'Minh Nguyệt',
    title: 'Nghệ Sĩ Piano Thính Phòng',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    parents: {
      father: 'Tạ Văn Quyết',
      mother: 'Bùi Diệu Hoa',
    },
    hometown: 'Hà Nội',
    description: 'Nàng thơ mang tâm hồn trong trẻo tựa ánh trăng rằm, ngón đàn ngân vang những bản dạ khúc huyền diệu.',
    bankInfo: {
      bankName: 'Techcombank',
      accountNumber: '1903554433',
      accountHolder: 'TA MINH NGUYET',
    },
  },
  weddingDate: '2027-01-22T18:30:00+07:00',
  weddingDateFormatted: 'Thứ Sáu, 22 Tháng 01 Năm 2027',
  events: [
    {
      id: 'celestial-starlight-gala',
      title: 'Dạ Tiệc Ánh Trăng Dưới Ngàn Vì Sao (Moonlight Gala)',
      date: '22/01/2027',
      time: '06:30 CH',
      dayOfWeek: 'Thứ Sáu',
      lunarDate: 'Ngày 15 Tháng 12 Năm Bính Ngọ (Trăng Rằm)',
      venueName: 'The Starlight Sky Bar & Grand Observatory',
      hallName: 'Sảnh Vòm Kính Ngân Hà (Tầng 48)',
      address: 'Số 02 Trần Phú, Phường Lộc Thọ, TP. Nha Trang, Khánh Hòa',
      googleMapsUrl: 'https://maps.google.com/?q=Tran+Phu+Loc+Tho+Nha+Trang',
    },
  ],
  timeline: [
    {
      id: 'cel-1',
      year: '2023',
      dateStr: '15.08.2023',
      title: 'Đêm Ngắm Mưa Sao Băng',
      subtitle: 'Đài thiên văn vịnh Nha Trang',
      story: 'Khi vệt sao băng rực sáng bầu trời đêm, hai điều ước thầm kín trong tim đã hòa làm một: Nguyện cùng nhau đi hết vạn năm ánh sáng.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
      tag: 'Ngân Hà',
      location: 'Nha Trang',
    },
  ],
  loveStoryMessages: [
    {
      author: 'Nhật Quang',
      recipient: 'Gửi Vầng Trăng Minh Nguyệt',
      quote: '"Giữa vũ trụ bao la với hàng tỷ thiên hà, gặp được em là điều kỳ diệu vĩ đại nhất của tạo hóa."',
      content: 'Mỗi nốt nhạc em đàn đều là những vì sao thắp sáng tâm hồn anh.',
      dateStr: '22.01.2027',
    },
  ],
  thankYouNote: {
    title: 'Cảm Tạ Quý Khách Đã Đến Dưới Bầu Trời Sao',
    message: 'Sự hiện diện của quý vị là những đốm sáng lấp lánh nhất thắp sáng dạ tiệc đêm trăng của chúng con.',
    signatures: 'Nhật Quang & Minh Nguyệt cúi đầu cảm tạ',
  },
  sectionsConfig: { ...DEFAULT_SECTIONS_CONFIG },
  donateConfig: {
    ...DEFAULT_DONATE_CONFIG,
    title: 'Hộp Quà Chúc Phúc Ánh Trăng',
  },
};

// ==========================================
// MASTER TEMPLATE CATALOG FOR SELECTION & PREVIEWS
// ==========================================
export interface MasterTemplateItem {
  id: WeddingTemplate;
  presetKey: string;
  name: string;
  subtitle: string;
  category: 'all' | 'traditional' | 'modern' | 'romantic' | 'luxury' | 'nature';
  categoryLabel: string;
  badge?: string;
  tagline: string;
  colors: string[];
  heroImage: string;
  icon: string;
  envelopeStyle: EnvelopeStyle;
  recommendedTheme: WeddingTheme;
  description: string;
}

export const MASTER_TEMPLATE_CATALOG: MasterTemplateItem[] = [
  {
    id: 'traditional',
    presetKey: 'traditional_silk',
    name: 'Hỷ Sự Áo Dài Truyền Thống',
    subtitle: 'Nét Son Hoàng Tộc & Chữ Song Hỷ (囍)',
    category: 'traditional',
    categoryLabel: 'Truyền Thống & Bản Sắc',
    badge: 'Được Yêu Thích Nhất',
    tagline: 'Cung chúc tân lang tân giai nhân loan phụng hòa minh',
    colors: ['#8B111A', '#D4AF37', '#FFFBF0', '#5B060D'],
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
    icon: '囍',
    envelopeStyle: 'traditional_silk',
    recommendedTheme: 'crimson_gold',
    description: 'Sắc đỏ son hoàng gia, viền hoa văn vàng kim, biểu tượng Song Hỷ thiêng liêng và phong bao lì xì cưới gấm đỏ truyền thống.',
  },
  {
    id: 'royal',
    presetKey: 'royal_velvet',
    name: 'Hoàng Gia Quý Tộc Châu Âu',
    subtitle: 'Baroque Gold & Nhung Đỏ Burgundy',
    category: 'luxury',
    categoryLabel: 'Hoàng Gia & Sang Trọng',
    badge: 'Đẳng Cấp 5 Sao',
    tagline: 'Lộng lẫy và trang nghiêm như hôn lễ hoàng gia',
    colors: ['#4A0E17', '#DFB76C', '#FFFDF9', '#24030A'],
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
    icon: '👑',
    envelopeStyle: 'royal_velvet',
    recommendedTheme: 'burgundy',
    description: 'Vương miện vàng, khung baroque cung điện mạ vàng dát lá kim, phong bì nhung sang trọng cùng dấu sáp dập nổi chữ lồng dát vàng.',
  },
  {
    id: 'indochine',
    presetKey: 'indochine_heritage',
    name: 'Đông Dương Hoài Niệm & Di Sản',
    subtitle: 'Gạch Bông Xưa & Xanh Rêu Trầm Mặc',
    category: 'traditional',
    categoryLabel: 'Hoài Niệm & Di Sản',
    badge: 'Độc Bản Nghệ Thuật',
    tagline: 'Mối lương duyên son sắt mang phong vị Sài Gòn - Hà Nội xưa',
    colors: ['#1B382B', '#C5A059', '#F5F0E6', '#2C2622'],
    heroImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
    icon: '🏛️',
    envelopeStyle: 'indochine_kraft',
    recommendedTheme: 'indochine_moss',
    description: 'Họa tiết gạch bông thuộc địa, quạt nan tre, tem thư cổ điển và sắc xanh rêu trầm mặc quý phái.',
  },
  {
    id: 'rustic',
    presetKey: 'rustic_botanical',
    name: 'Rustic Bohemian & Vườn Địa Đàng',
    subtitle: 'Lá Xô Thơm Sage & Nâu Đất Nung Terracotta',
    category: 'nature',
    categoryLabel: 'Sân Vườn & Tự Nhiên',
    badge: 'Xu Hướng Ngoài Trời',
    tagline: 'Không gian cưới sân vườn phóng khoáng và ngập tràn hoa lá',
    colors: ['#4A5D4E', '#B85D43', '#FDFBF7', '#7C5335'],
    heroImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000&auto=format&fit=crop',
    icon: '🌿',
    envelopeStyle: 'rustic_twine',
    recommendedTheme: 'rustic_sage',
    description: 'Cành lá olive, lá bạch đàn, sợi dây thừng cói mộc mạc, giấy thô tự nhiên dành cho tiệc cưới ngoài trời và đồi thông.',
  },
  {
    id: 'editorial',
    presetKey: 'editorial_vogue',
    name: 'Editorial Vogue Tạp Chí Thời Trang',
    subtitle: 'Đen Trắng Tối Giản & High-Fashion Chic',
    category: 'modern',
    categoryLabel: 'Tối Giản & Thời Trang',
    badge: 'Gu Thẩm Mỹ Đỉnh Cao',
    tagline: 'Bố cục tạp chí thời trang đẳng cấp thế giới',
    colors: ['#121212', '#FFFFFF', '#737373', '#F4F4F5'],
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
    icon: '📰',
    envelopeStyle: 'editorial_vellum',
    recommendedTheme: 'editorial_mono',
    description: 'Bìa tạp chí Harper\'s Bazaar thời thượng, typography tương phản sắc sảo, khung ảnh đen trắng phân cực và bìa vellum mờ ảo.',
  },
  {
    id: 'korean',
    presetKey: 'korean_pastel',
    name: 'Hàn Quốc Pastel Thơ Mộng',
    subtitle: 'Hồng Đào Sữa & Voan Lụa Trong Veo',
    category: 'romantic',
    categoryLabel: 'Ngọt Ngào & Lãng Mạn',
    badge: 'Trẻ Trung & Dịu Ngọt',
    tagline: 'Câu chuyện tình yêu ngọt ngào tựa thước phim truyền hình Hàn Quốc',
    colors: ['#FCEAE6', '#FED7AA', '#FDFBF9', '#E11D48'],
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
    icon: '🌸',
    envelopeStyle: 'korean_chiffon',
    recommendedTheme: 'korean_peach',
    description: 'Màu đào sữa pastel thanh thoát, góc bo tròn mềm mại bồng bềnh, ruy băng voan lụa nhẹ tênh và hiệu ứng trái tim bay.',
  },
  {
    id: 'celestial',
    presetKey: 'celestial_midnight',
    name: 'Dạ Tiệc Ánh Trăng & Dải Ngân Hà',
    subtitle: 'Xanh Đêm Thẳm & Ánh Bạc Lấp Lánh',
    category: 'luxury',
    categoryLabel: 'Dạ Tiệc & Huyền Bí',
    badge: 'Mới Ra Mắt 2026',
    tagline: 'Lời nguyện ước vĩnh cửu được ghi danh giữa bầu trời ngàn sao',
    colors: ['#090D1A', '#CBD5E1', '#FDE68A', '#1E293B'],
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
    icon: '✨',
    envelopeStyle: 'celestial_midnight',
    recommendedTheme: 'midnight_star',
    description: 'Dạ tiệc cocktail tối lãng mạn dưới ánh trăng, các chòm sao định mệnh, bụi sao stardust lấp lánh trên nền nhung đêm huyền bí.',
  },
  {
    id: 'fairytale',
    presetKey: 'blush_ribbon',
    name: 'Vườn Hoa Cổ Tích Lãng Mạn',
    subtitle: 'Hoa Hồng Thơ Mộng & Ruy Băng Lụa',
    category: 'romantic',
    categoryLabel: 'Ngọt Ngào & Lãng Mạn',
    badge: 'Kinh Điển Nữ Tính',
    tagline: 'Khởi đầu chuyện tình cổ tích ngập tràn nắng và hoa',
    colors: ['#9D174D', '#F472B6', '#FFF0F5', '#831843'],
    heroImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
    icon: '🕊️',
    envelopeStyle: 'blush_ribbon',
    recommendedTheme: 'rose',
    description: 'Sắc hồng phấn rose pastel kiêu sa, cánh hoa rơi bồng bềnh, ruy băng voan uốn lượn và khung ảnh lưu bút thơ mộng.',
  },
  {
    id: 'modern',
    presetKey: 'modern_minimal',
    name: 'Kiến Trúc Tối Giản Đương Đại',
    subtitle: 'Nâu Ấm Warm Taupe & Be Cát Champagne',
    category: 'modern',
    categoryLabel: 'Tối Giản & Hiện Đại',
    badge: 'Thanh Lịch Tinh Tế',
    tagline: 'Vẻ đẹp của sự tinh giản, trọn vẹn cảm xúc',
    colors: ['#3C3633', '#E0D9D1', '#FAF8F5', '#1C1917'],
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    icon: '💎',
    envelopeStyle: 'modern_minimal',
    recommendedTheme: 'gold',
    description: 'Đường nét thanh thoát, tỷ lệ vàng cân đối, loại bỏ mọi chi tiết rườm rà để tôn vinh trọn vẹn nụ cười cô dâu chú rể.',
  },
  {
    id: 'vintage',
    presetKey: 'emerald_brass',
    name: 'Cổ Điển Ngọc Lục Bảo & Đồng Cổ',
    subtitle: 'Emerald Green & Kim Loại Hoàng Gia',
    category: 'vintage',
    categoryLabel: 'Cổ Điển Quý Phái',
    badge: 'Sang Trọng Vượt Thời Gian',
    tagline: 'Vẻ đẹp quý phái trường tồn theo năm tháng',
    colors: ['#064E3B', '#C5A059', '#FAF5E9', '#022C22'],
    heroImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop',
    icon: '⏳',
    envelopeStyle: 'emerald_brass',
    recommendedTheme: 'emerald',
    description: 'Màu xanh lục bảo sâu thẳm kết hợp viền đồng thau cổ điển, giấy nhuộm hoài niệm và dấu sáp xanh lục bảo sang trọng.',
  },
];

// ==========================================
// PRESET MAP FOR 1-CLICK RESOLUTION
// ==========================================
export const PRESET_WEDDING_PROJECTS: Record<string, WeddingData> = {
  royal_velvet: ROYAL_VELVET_DATA,
  blush_ribbon: BLUSH_RIBBON_DATA,
  modern_minimal: MODERN_MINIMAL_DATA,
  emerald_brass: EMERALD_BRASS_DATA,
  traditional_silk: TRADITIONAL_SILK_DATA,
  indochine_heritage: INDOCHINE_HERITAGE_DATA,
  rustic_botanical: RUSTIC_BOTANICAL_DATA,
  editorial_vogue: EDITORIAL_VOGUE_DATA,
  korean_pastel: KOREAN_PASTEL_DATA,
  celestial_midnight: CELESTIAL_MIDNIGHT_DATA,
  // Template ID aliases for direct query param matching (?template=...)
  royal: ROYAL_VELVET_DATA,
  fairytale: BLUSH_RIBBON_DATA,
  modern: MODERN_MINIMAL_DATA,
  vintage: EMERALD_BRASS_DATA,
  traditional: TRADITIONAL_SILK_DATA,
  indochine: INDOCHINE_HERITAGE_DATA,
  rustic: RUSTIC_BOTANICAL_DATA,
  editorial: EDITORIAL_VOGUE_DATA,
  korean: KOREAN_PASTEL_DATA,
  celestial: CELESTIAL_MIDNIGHT_DATA,
  'tuan-anh-mai-phuong': ROYAL_VELVET_DATA,
};

export const DEFAULT_WEDDING_DATA: WeddingData = ROYAL_VELVET_DATA;

export const INITIAL_WISHES: WishMessage[] = [
  {
    id: 'wish-1',
    name: 'Bác Quang & Bác Lan',
    relationRole: 'Đại diện gia đình',
    content: 'Chúc hai cháu trăm năm hạnh phúc, răng long đầu bạc! Chúc cho mái ấm nhỏ luôn đầy ắp tình yêu thương, thuận hòa và sớm đón tin vui nhé.',
    createdAt: 'Hôm nay lúc 09:30',
    heartCount: 18,
    badge: 'Gia đình',
  },
  {
    id: 'wish-2',
    name: 'Anh Hoàng (Team Tech)',
    relationRole: 'Đồng nghiệp',
    content: 'Chúc mừng người anh em chí cốt đã chính thức có bến đỗ an toàn! Chúc hai vợ chồng luôn đồng hành, cùng nhau chinh phục mọi ước mơ nhé!',
    createdAt: 'Hôm qua lúc 21:15',
    heartCount: 12,
    badge: 'Đồng nghiệp',
  },
  {
    id: 'wish-3',
    name: 'Thùy Chi (Hội Bạn Thân)',
    relationRole: 'Bạn thân cô dâu',
    content: 'Nhìn thấy cô dâu xinh đẹp trong chiếc váy cưới lộng lẫy và nụ cười rạng rỡ của hai bạn, mình xúc động lắm. Mãi mãi ngọt ngào như ngày đầu nhé đôi bạn tuyệt vời!',
    createdAt: 'Hôm qua lúc 19:40',
    heartCount: 24,
    badge: 'Bạn thân',
  },
];
