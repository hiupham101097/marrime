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
    const config = ROLE_CONFIG[guest.role] || ROLE_CONFIG.ban;
    if (guest.role === 'gia_dinh') {
      return `Kính mời: ${guest.name}`;
    }
    return `Kính mời: ${config.prefix} ${guest.name}`;
  };

  const getWarmGreeting = (): string => {
    const config = ROLE_CONFIG[guest.role] || ROLE_CONFIG.ban;
    return `Trân trọng kính mời ${config.prefix} ${guest.name} cùng ${config.companion} đến chung vui trong ngày trọng đại của chúng tôi!`;
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

