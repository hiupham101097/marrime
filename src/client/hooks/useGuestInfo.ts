import { useState, useEffect } from 'react';
import { GuestInfo, GuestRole } from '../../shared/types';

export const ROLE_CONFIG: Record<GuestRole, { label: string; prefix: string; pronoun: string; companion: string }> = {
  ban: {
    label: 'Bạn Bè',
    prefix: 'Bạn',
    pronoun: 'bạn',
    companion: 'người thương',
  },
  anh: {
    label: 'Anh',
    prefix: 'Anh',
    pronoun: 'anh',
    companion: 'gia đình',
  },
  chi: {
    label: 'Chị',
    prefix: 'Chị',
    pronoun: 'chị',
    companion: 'gia đình',
  },
  em: {
    label: 'Em',
    prefix: 'Em',
    pronoun: 'em',
    companion: 'người thương',
  },
  co: {
    label: 'Cô',
    prefix: 'Cô',
    pronoun: 'cô',
    companion: 'gia đình',
  },
  chu: {
    label: 'Chú',
    prefix: 'Chú',
    pronoun: 'chú',
    companion: 'gia đình',
  },
  bac: {
    label: 'Bác',
    prefix: 'Bác',
    pronoun: 'bác',
    companion: 'gia đình',
  },
  dong_nghiep: {
    label: 'Đồng Nghiệp',
    prefix: 'Bạn',
    pronoun: 'bạn',
    companion: 'người thương',
  },
  gia_dinh: {
    label: 'Gia Đình',
    prefix: 'Gia đình',
    pronoun: 'gia đình',
    companion: 'người thân',
  },
};

/**
 * Universal salutation formatter that prevents embarrassing duplicate prefixes
 * like "Bạn Bạn và Người Thương", "Anh Anh Tuấn", etc.
 */
export function formatGuestSalutation(guest: GuestInfo): string {
  const rawName = (guest.name || '').trim();
  if (!rawName) return 'Quý Khách';

  const roleData = ROLE_CONFIG[guest.role] || ROLE_CONFIG.ban;
  if (guest.role === 'gia_dinh') {
    return rawName.toLowerCase().startsWith('gia đình') || rawName.toLowerCase().startsWith('gd ')
      ? rawName
      : `Gia đình ${rawName}`;
  }

  const prefix = roleData.prefix;
  const nameLower = rawName.toLowerCase();
  const prefixLower = prefix.toLowerCase();

  // If the rawName starts with the prefix (e.g. "Bạn và Người Thương", "Bạn Linh")
  if (nameLower === prefixLower || nameLower.startsWith(prefixLower + ' ') || nameLower.startsWith(prefixLower + ' &')) {
    return rawName;
  }

  // Also check if rawName starts with any common Vietnamese title
  const allPrefixes = ['bạn', 'anh', 'chị', 'em', 'cô', 'chú', 'bác', 'ông', 'bà', 'gia đình', 'quý khách'];
  for (const p of allPrefixes) {
    if (nameLower === p || nameLower.startsWith(p + ' ') || nameLower.startsWith(p + ' &')) {
      return rawName;
    }
  }

  return `${prefix} ${rawName}`;
}

export function useGuestInfo() {
  const [guest, setGuest] = useState<GuestInfo>({
    name: 'Quý Khách Quý',
    role: 'ban',
  });

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const rawName = params.get('guest') || params.get('to') || params.get('name') || '';
      const rawRole = (params.get('role') || 'ban').toLowerCase() as GuestRole;

      const validRole: GuestRole = ROLE_CONFIG[rawRole] ? rawRole : 'ban';
      const cleanName = rawName.trim();

      if (cleanName) {
        setGuest({
          name: cleanName,
          role: validRole,
        });
      } else {
        // Default welcoming placeholder
        setGuest({
          name: 'Bạn và Người Thương',
          role: 'ban',
        });
      }
    } catch {
      // In case window or URLSearchParams is unavailable
    }
  }, []);

  const changeDemoGuest = (name: string, role: GuestRole) => {
    setGuest({ name, role });
    // Update URL query string without reloading page for easy sharing
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('guest', name);
    newUrl.searchParams.set('role', role);
    window.history.replaceState({}, '', newUrl.toString());
  };

  const getFullInvitationTitle = (): string => {
    return `Kính mời: ${formatGuestSalutation(guest)}`;
  };

  const getWarmGreeting = (): string => {
    const config = ROLE_CONFIG[guest.role] || ROLE_CONFIG.ban;
    return `Trân trọng kính mời ${formatGuestSalutation(guest)} cùng ${config.companion} đến chung vui trong ngày trọng đại của chúng tôi!`;
  };

  return {
    guest,
    setGuest,
    changeDemoGuest,
    getFullInvitationTitle,
    getWarmGreeting,
    roleConfig: ROLE_CONFIG[guest.role] || ROLE_CONFIG.ban,
  };
}

