/**
 * Automated Profanity & Dignity Sentiment Guard
 * Ensures wishes projected on the giant ballroom stage LED wall remain
 * elegant, respectful, and family-friendly.
 */

const BLOCKED_WORDS = [
  'chửi',
  'đm',
  'dm',
  'vcl',
  'vkl',
  'vl',
  'cl',
  'địt',
  'dit',
  'lồn',
  'lon',
  'buồi',
  'buoi',
  'cặc',
  'cac',
  'đéo',
  'deo',
  'mẹ mày',
  'me may',
  'bitch',
  'fuck',
  'shit',
  'asshole',
  'bastard',
  'porn',
  'sex',
  'lừa đảo',
  'scam',
];

export interface ModerationResult {
  isClean: boolean;
  filteredText: string;
  flaggedKeywords: string[];
}

export function moderateWishContent(text: string): ModerationResult {
  if (!text) {
    return { isClean: true, filteredText: '', flaggedKeywords: [] };
  }

  const flagged: string[] = [];
  let sanitized = text;

  for (const word of BLOCKED_WORDS) {
    // Word boundary or space insensitive pattern
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(sanitized)) {
      flagged.push(word);
      sanitized = sanitized.replace(regex, '✦✦✦');
    }
  }

  return {
    isClean: flagged.length === 0,
    filteredText: sanitized,
    flaggedKeywords: flagged,
  };
}
