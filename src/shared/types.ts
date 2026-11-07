export type GuestRole = 'ban' | 'anh' | 'chi' | 'em' | 'co' | 'chu' | 'bac' | 'dong_nghiep' | 'gia_dinh';

export interface GuestGreetingConfig {
  prefix: string;
  salutation: string;
  defaultComplement: string;
}

export interface GuestInfo {
  name: string;
  role: GuestRole;
  customGreeting?: string;
  tableNumber?: string;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  dateStr: string;
  title: string;
  subtitle: string;
  story: string;
  image: string;
  tag: string;
  location?: string;
}

export interface CoupleMember {
  role: 'Chú Rể' | 'Cô Dâu';
  name: string;
  shortName: string;
  title: string;
  avatar: string;
  parents: {
    father: string;
    mother: string;
  };
  hometown: string;
  description: string;
  socialLink?: string;
  bankInfo: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    qrImage?: string;
  };
}

export interface LoveMessage {
  author: string;
  recipient: string;
  content: string;
  quote?: string;
  dateStr?: string;
}

export interface WeddingEventSchedule {
  id: string;
  title: string;
  date: string;
  time: string;
  dayOfWeek: string;
  lunarDate: string;
  venueName: string;
  hallName: string;
  address: string;
  mapEmbedUrl?: string;
  googleMapsUrl: string;
}

export type WeddingTheme =
  | 'burgundy'
  | 'rose'
  | 'gold'
  | 'navy'
  | 'emerald'
  | 'lavender'
  | 'crimson_gold'
  | 'indochine_moss'
  | 'rustic_sage'
  | 'editorial_mono'
  | 'korean_peach'
  | 'midnight_star';

export type WeddingTemplate =
  | 'royal'
  | 'vintage'
  | 'modern'
  | 'fairytale'
  | 'traditional'
  | 'indochine'
  | 'rustic'
  | 'editorial'
  | 'korean'
  | 'celestial';

export type EnvelopeStyle =
  | 'royal_velvet'
  | 'blush_ribbon'
  | 'modern_minimal'
  | 'emerald_brass'
  | 'traditional_silk'
  | 'indochine_kraft'
  | 'rustic_twine'
  | 'editorial_vellum'
  | 'korean_chiffon'
  | 'celestial_midnight';

export type AnimationEffect =
  | 'mixed_romance'
  | 'rose_petals'
  | 'golden_stardust'
  | 'glowing_hearts'
  | 'winter_snow'
  | 'traditional_lanterns'
  | 'botanical_leaves'
  | 'none';

export type TypographyFont =
  | 'playfair'
  | 'cormorant'
  | 'inter_serif'
  | 'montserrat'
  | 'editorial_sans'
  | 'traditional_calligraphy';

export interface GalleryPhotoItem {
  id: string;
  url: string;
  title: string;
  category: 'royal' | 'moments' | 'vows';
  caption: string;
}

export interface WeddingMusicConfig {
  trackId: string;
  title: string;
  artist: string;
  url?: string;
}

export interface WeddingSectionsConfig {
  showGuestCard: boolean;
  showCouple: boolean;
  showGallery: boolean;
  showTimeline: boolean;
  showLoveMessages: boolean;
  showDresscode: boolean;
  showEvents: boolean;
  showRSVP: boolean;
  showWishes: boolean;
  showDonateBox: boolean;
}

export interface WeddingDonateConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  revealMode: 'on_completion_only' | 'show_always' | 'button_trigger';
  showQr: boolean;
  thankYouMessage: string;
}

export interface WeddingData {
  theme: WeddingTheme;
  template: WeddingTemplate;
  envelopeStyle: EnvelopeStyle;
  waxSealMonogram?: string;
  typographyFont?: TypographyFont;
  animationEffect?: AnimationEffect;
  enableMouseTrail?: boolean;
  heroImage?: string;
  gallery?: GalleryPhotoItem[];
  music: WeddingMusicConfig;
  groom: CoupleMember;
  bride: CoupleMember;
  weddingDate: string; // ISO string for countdown
  weddingDateFormatted: string;
  events: WeddingEventSchedule[];
  timeline: TimelineMilestone[];
  loveStoryMessages: LoveMessage[];
  thankYouNote: {
    title: string;
    message: string;
    signatures: string;
  };
  sectionsConfig?: WeddingSectionsConfig;
  donateConfig?: WeddingDonateConfig;
}

export interface PublishedWeddingProject {
  slug: string;
  secretPin: string;
  title: string;
  data: WeddingData;
  createdAt: string;
  updatedAt: string;
}

export interface RSVPRecord {
  id: string;
  guestName: string;
  role: GuestRole;
  phone?: string;
  attending: 'yes' | 'no' | 'undecided';
  attendeesCount: number;
  dietRequirement?: string;
  message?: string;
  createdAt: string;
}

export interface WishMessage {
  id: string;
  name: string;
  relationRole: string;
  content: string;
  createdAt: string;
  heartCount: number;
  badge?: string;
}

