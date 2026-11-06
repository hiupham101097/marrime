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

export interface WeddingData {
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

