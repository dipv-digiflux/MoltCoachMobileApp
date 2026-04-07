import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutThunk } from '@/store/thunks';
import { getCoachProfileThunk } from '@/store/thunks';
import {
  fetchInviteLinksThunk,
  updateInviteLinkThunk,
} from '@/store/thunks/clientThunks';
import { InviteLink } from '@/types/api.types';

import { HomeDashboardHook } from '../HomeDashboardScreen.types';

import type { AddSessionsModalValues, ClientStatusRow } from '@/components';
import type { AppStackNavigationProp } from '@/types/navigation.types';

export const useHomeDashboard = (): HomeDashboardHook => {
  const navigation = useNavigation<AppStackNavigationProp>();
  const dispatch = useAppDispatch();

  const customer = useAppSelector(state => state.booking.coach);
  const inviteLinks = useAppSelector(state => state.client.inviteLinks);
  const isFetchingLinks = useAppSelector(
    state => state.client.operations?.fetchInviteLinks?.status === 'loading',
  );
  const currentPage = useAppSelector(state => state.client.currentPage);
  const totalPages = useAppSelector(state => state.client.totalPages);
  const isInitialLoad = useAppSelector(
    state =>
      state.client.operations?.fetchInviteLinks?.status === 'idle' ||
      (state.client.operations?.fetchInviteLinks?.status === 'loading' &&
        inviteLinks.length === 0),
  );

  const [isDetailedView, setIsDetailedView] = useState(false);
  const [activeDateFilter, setActiveDateFilter] = useState('All time');
  const [activeStatusFilter, setActiveStatusFilter] = useState('All Clients');
  const [isAddSessionsModalVisible, setIsAddSessionsModalVisible] =
    useState(false);
  const [selectedLinkForSessions, setSelectedLinkForSessions] =
    useState<InviteLink | null>(null);

  useFocusEffect(
    useCallback(() => {
      void dispatch(fetchInviteLinksThunk(1, 10));
      void dispatch(getCoachProfileThunk());
    }, [dispatch]),
  );

  const handleLoadMore = (): void => {
    if (currentPage < totalPages && !isFetchingLinks) {
      void dispatch(fetchInviteLinksThunk(currentPage + 1, 10));
    }
  };

  const handleUpdateSessions = async (
    values: AddSessionsModalValues,
  ): Promise<void> => {
    if (!selectedLinkForSessions) return;

    const status = selectedLinkForSessions.status?.toLowerCase();
    const update_for =
      status === 'invite send' || status === 'invite sent'
        ? 'invite_link'
        : 'user_relationship';

    await dispatch(
      updateInviteLinkThunk({
        id: selectedLinkForSessions._id,
        update_for,
        data: {
          subscription:
            values.mode === 'Online'
              ? {
                  number_of_month: parseInt(values.months || '0', 10),
                  start_date: values.startDate || '',
                }
              : undefined,
          session_package:
            values.mode === 'Physical (In-person)'
              ? {
                  total_sessions: parseInt(values.totalSessions || '0', 10),
                  sessions_left: parseInt(values.sessionsLeft || '0', 10),
                }
              : undefined,
        },
      }),
    );

    setIsAddSessionsModalVisible(false);
  };

  const handleLogout = (): void => {
    void dispatch(logoutThunk());
  };

  const handleProfileRedirect = (): void => {
    navigation.navigate('BottomTabs', { screen: 'ProfileTab' });
  };

  const handleEditSessions = (link: InviteLink): void => {
    setSelectedLinkForSessions(link);
    setIsAddSessionsModalVisible(true);
  };

  const buildRows = (link: InviteLink): ClientStatusRow[] => {
    const sessionInfo =
      link.user_relationship?.session_package || link.session_package;
    const subscriptionInfo = link.subscription;

    let sessionLabel = 'Session not given';
    if (sessionInfo) {
      sessionLabel = `${sessionInfo.sessions_left} sessions left`;
    } else if (subscriptionInfo) {
      sessionLabel = `${subscriptionInfo.number_of_month} month${
        subscriptionInfo.number_of_month > 1 ? 's' : ''
      }`;
    }

    return [
      {
        label: sessionLabel,
        icon: 'pencil',
        onPress: () => handleEditSessions(link),
      },
      {
        label: link.nutrition_draft
          ? 'Meal plan generated'
          : 'Meal plan not generated',
        icon: 'circle',
      },
    ];
  };

  return {
    navigation,
    customer,
    inviteLinks,
    isFetchingLinks,
    isInitialLoad,
    totalItems: useAppSelector(state => state.client.totalItems),
    isDetailedView,
    setIsDetailedView,
    activeDateFilter,
    setActiveDateFilter,
    activeStatusFilter,
    setActiveStatusFilter,
    isAddSessionsModalVisible,
    setIsAddSessionsModalVisible,
    selectedLinkForSessions,
    handleLoadMore,
    handleUpdateSessions,
    handleLogout,
    handleProfileRedirect,
    handleEditSessions,
    buildRows,
  };
};
