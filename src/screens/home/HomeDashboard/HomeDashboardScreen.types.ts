import React from 'react';

import { CoachProfile, InviteLink } from '@/types/api.types';

import type { AddSessionsModalValues, ClientStatusRow } from '@/components';
import type { AppStackNavigationProp } from '@/types/navigation.types';

export interface HomeDashboardHook {
  navigation: AppStackNavigationProp;
  customer: CoachProfile | null;
  inviteLinks: InviteLink[];
  isFetchingLinks: boolean;
  isInitialLoad: boolean;
  totalItems: number;
  isDetailedView: boolean;
  setIsDetailedView: React.Dispatch<React.SetStateAction<boolean>>;
  activeDateFilter: string;
  setActiveDateFilter: React.Dispatch<React.SetStateAction<string>>;
  activeStatusFilter: string;
  setActiveStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  isAddSessionsModalVisible: boolean;
  setIsAddSessionsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLinkForSessions: InviteLink | null;
  handleLoadMore: () => void;
  handleUpdateSessions: (values: AddSessionsModalValues) => Promise<void>;
  handleLogout: () => void;
  handleEditSessions: (link: InviteLink) => void;
  buildRows: (link: InviteLink) => ClientStatusRow[];
}
