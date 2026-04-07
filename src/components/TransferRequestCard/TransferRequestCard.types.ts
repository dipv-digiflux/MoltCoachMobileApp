import type { ColorToken } from '@/theme/colors';

export type TransferDuration = 'Temporary' | 'Permanent';

export interface TransferRequestCardProps {
  requestId: string;
  duration: TransferDuration;
  days?: number;
  time: string;
  coach: {
    name: string;
    avatarUrl?: string;
  };
  client: {
    name: string;
    avatarUrl?: string;
  };
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export interface StatusBadgeConfig {
  label: string;
  backgroundColor: ColorToken;
  textColor: ColorToken;
}
