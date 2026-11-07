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
  bankName: 'MBBank (Ngân Hàng Quân Đội)',
  accountNumber: '101019978888',
  accountHolder: 'PHAM MINH HIEU',
  qrImageUrl: 'https://api.vietqr.io/image/970422-101019978888-compact2.jpg?accountName=PHAM%20MINH%20HIEU&addInfo=Chuc%20Mung%20Marrime',
  title: 'Tặng Tác Giả Ly Cà Phê Chúc Phúc ☕',
  subtitle: 'Nền tảng thiệp cưới mở & miễn phí cho dâu rể',
  message: 'Marrime là nền tảng tạo thiệp cưới miễn phí. Nếu bạn thấy thiệp đẹp và hữu ích cho hôn lễ của mình, bạn có thể gửi tặng một ly cà phê chúc phúc tới tác giả. Ủng hộ hoàn toàn tùy tâm, không gửi cũng không sao, thiệp cưới của hai bạn vẫn hoạt động vĩnh viễn và hoàn toàn miễn phí!',
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
// PRESET MAP FOR 1-CLICK RESOLUTION
// ==========================================
export const PRESET_WEDDING_PROJECTS: Record<string, WeddingData> = {
  royal_velvet: ROYAL_VELVET_DATA,
  blush_ribbon: BLUSH_RIBBON_DATA,
  modern_minimal: MODERN_MINIMAL_DATA,
  emerald_brass: EMERALD_BRASS_DATA,
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
