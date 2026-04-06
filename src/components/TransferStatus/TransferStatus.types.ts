import type { ColorToken } from '@/theme';

export type TransferStatusType = 'Pending' | 'Accepted' | 'Rejected';
export type TransferDurationType = 'Temporary' | 'Permanent';

export interface TransferParticipant {
  name: string;
  avatarUrl?: string;
  status: TransferStatusType;
}

export interface TransferRequest {
  id: string;
  date: string;
  duration: TransferDurationType;
  days?: number;
  client: TransferParticipant;
  coach: TransferParticipant;
}

export interface TransferStatusProps {
  requests: TransferRequest[];
  onTabChange?: (tab: 'sent' | 'received') => void;
}

export interface TransferStatusCardProps {
  request: TransferRequest;
  currentTab: 'sent' | 'received';
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

export interface StatusStyle {
  color: ColorToken;
  label: string;
}
