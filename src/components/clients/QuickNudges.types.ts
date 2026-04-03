import { type InviteLink } from '@/types/api.types';

export interface NudgeItem {
  id: string;
  icon: string;
  message: string;
  selected: boolean;
}

export interface QuickNudgesProps {
  nudges: NudgeItem[];
  onToggleNudge: (id: string) => void;
  invite?: InviteLink | null;
}
