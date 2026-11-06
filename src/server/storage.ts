import fs from 'fs';
import path from 'path';
import { RSVPRecord, WishMessage } from '../shared/types';
import { INITIAL_WISHES } from '../shared/defaultData';

export interface StorageData {
  rsvps: RSVPRecord[];
  wishes: WishMessage[];
}

class WeddingStorage {
  private data: StorageData;
  private dbFilePath: string;
  private isPersisted: boolean = false;

  constructor() {
    this.data = {
      rsvps: [],
      wishes: [...INITIAL_WISHES],
    };

    // Attempt to set up JSON file storage for local Node.js environment
    this.dbFilePath = path.resolve(process.cwd(), 'src/server/data/db.json');
    this.initFileStorage();
  }

  private initFileStorage() {
    try {
      const dir = path.dirname(this.dbFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(this.dbFilePath)) {
        const raw = fs.readFileSync(this.dbFilePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.rsvps) this.data.rsvps = parsed.rsvps;
        if (parsed.wishes && parsed.wishes.length > 0) this.data.wishes = parsed.wishes;
        this.isPersisted = true;
      } else {
        this.saveToFile();
        this.isPersisted = true;
      }
    } catch {
      // In serverless / read-only filesystem (e.g. Cloudflare Worker), fallback gracefully to in-memory
      this.isPersisted = false;
    }
  }

  private saveToFile() {
    try {
      if (typeof fs?.writeFileSync === 'function') {
        fs.writeFileSync(this.dbFilePath, JSON.stringify(this.data, null, 2), 'utf-8');
      }
    } catch {
      // In serverless / read-only filesystem, fallback gracefully
    }
  }

  public getRSVPs(): RSVPRecord[] {
    return this.data.rsvps;
  }

  public addRSVP(entry: Omit<RSVPRecord, 'id' | 'createdAt'>): RSVPRecord {
    const newRecord: RSVPRecord = {
      ...entry,
      id: 'rsvp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
    };
    this.data.rsvps.unshift(newRecord);
    this.saveToFile();
    return newRecord;
  }

  public getWishes(): WishMessage[] {
    return this.data.wishes;
  }

  public addWish(entry: Omit<WishMessage, 'id' | 'createdAt' | 'heartCount'>): WishMessage {
    const newWish: WishMessage = {
      ...entry,
      id: 'wish-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: 'Vừa xong',
      heartCount: 1,
    };
    this.data.wishes.unshift(newWish);
    this.saveToFile();
    return newWish;
  }

  public likeWish(id: string): WishMessage | null {
    const wish = this.data.wishes.find(w => w.id === id);
    if (wish) {
      wish.heartCount = (wish.heartCount || 0) + 1;
      this.saveToFile();
      return wish;
    }
    return null;
  }
}

export const storage = new WeddingStorage();

