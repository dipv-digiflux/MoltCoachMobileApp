import React, { type ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  FilterTabs,
  PageHeaderScrollView,
  TransferRequestCard,
} from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing } from '@/theme';

import { TransferStatusCard } from './TransferStatusCard';

import type { TransferStatusProps } from './TransferStatus.types';

export const TransferStatus = ({
  requests,
  onTabChange,
}: TransferStatusProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');

  const handleTabChange = (tabName: string): void => {
    const tab =
      tabName === translation.transferStatusSentRequests ? 'sent' : 'received';
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const handleAccept = (id: string): void => {
    console.log('Accepted transfer request:', id);
    // TODO: Implement actual accept logic (e.g. dispatch thunk)
  };

  const handleReject = (id: string): void => {
    console.log('Rejected transfer request:', id);
    // TODO: Implement actual reject logic (e.g. dispatch thunk)
  };

  return (
    <View style={styles.container}>
      <PageHeaderScrollView header={{ title: 'Transfer Status' }}>
        <View style={styles.content}>
          <FilterTabs
            tabs={[
              translation.transferStatusSentRequests,
              translation.transferStatusReceived,
            ]}
            activeTab={
              activeTab === 'sent'
                ? translation.transferStatusSentRequests
                : translation.transferStatusReceived
            }
            onTabChange={handleTabChange}
            style={styles.tabs}
            tabsWrapperStyle={styles.tabsWrapper}
            tabButtonStyle={styles.tabButton}
          />

          <View style={styles.listContainer}>
            {requests.map(request => {
              if (activeTab === 'received') {
                return (
                  <TransferRequestCard
                    key={request.id}
                    requestId={request.id}
                    duration={request.duration}
                    days={request.days}
                    time={request.date}
                    coach={request.coach}
                    client={request.client}
                    onAccept={handleAccept}
                    onReject={handleReject}
                  />
                );
              }
              return (
                <TransferStatusCard
                  key={request.id}
                  request={request}
                  currentTab={activeTab}
                />
              );
            })}
          </View>
        </View>
      </PageHeaderScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SurfacePrimaryDefault,
  },
  content: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'], // Increased from Spacing-xl
  },
  tabs: {
    marginHorizontal: 0,
  },
  tabsWrapper: {
    flex: 1,
  },
  tabButton: {
    flex: 1,
    paddingHorizontal: spacing['Spacing-2xl'], // Increased padding
    paddingVertical: spacing['Spacing-2xl'], // Increased padding
  },
  listContainer: {
    marginTop: spacing['Spacing-10xl'],
  },
});
