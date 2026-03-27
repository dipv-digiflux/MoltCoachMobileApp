import React, { useCallback, type ReactElement } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  NotificationIconSvg,
  ProfileIconSvg,
  CreditIconSvg,
  ChevronDownIconSvg,
  SearchIconSvg,
} from '@/assets/images';
import {
  PageHeader,
  OverviewCard,
  Switch,
  FilterTabs,
  StatusTabs,
  ClientStatusCard,
  ClientDetailedCard,
  ClientCardSkeleton,
  AddSessionsModal,
  type ClientTag,
  type AddSessionsModalValues,
} from '@/components';
import { ProfileCompletionCard } from '@/screens/home/components/ProfileCompletionCard';
import { colors, iconScale, moderateScale, spacing } from '@/theme';

import styles from './HomeDashboardScreen.styles';
import {
  getClientName,
  SKELETON_COUNT,
  getOverviewCards,
} from './HomeDashboardScreen.utils';
import { useHomeDashboard } from './hooks/useHomeDashboard';

import type { InviteLink } from '@/types/api.types';

export const HomeDashboardScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const {
    navigation,
    customer,
    inviteLinks,
    isFetchingLinks,
    isInitialLoad,
    totalItems,
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
    handleEditSessions,
    buildRows,
  } = useHomeDashboard();

  const overviewCards = getOverviewCards();

  const renderClientItem = useCallback(
    ({ item: link }: { item: InviteLink }) => {
      const name = getClientName(link.invitee);
      const isAccepted =
        link.status === 'accepted' ||
        link.status === 'Accepted' ||
        link.status === 'Approved' ||
        link.status === 'approved';

      if (isDetailedView || isAccepted) {
        const detailsText = link.subscription
          ? `${link.mode || ''} · ${link.subscription.number_of_month} months`
          : link.session_package
          ? `${link.mode || ''} · ${
              link.session_package.sessions_left ?? '-'
            } of ${link.session_package.total_sessions ?? '-'} left`
          : '-';

        const draft = link.nutrition_draft;
        const tags: ClientTag[] = [
          {
            label: `Steps ${draft?.steps?.toLocaleString() || '-'}`,
            type: 'warning',
          },
          { label: `Carb ${draft?.carb || '-'}g`, type: 'positive' },
          { label: `Fat ${draft?.fat || '-'}g`, type: 'positive' },
          {
            label: `Kcal ${draft?.target_calories?.toLocaleString() || '-'}`,
            type: 'warning',
          },
        ];

        return (
          <ClientDetailedCard
            name={name}
            score={0}
            lastSyncedText={
              link.updatedAt
                ? `Updated ${new Date(link.updatedAt).toLocaleDateString()}`
                : '-'
            }
            detailsText={detailsText}
            tags={tags}
            onNudgePress={() => console.log('Nudge', name)}
            onEditSessions={() => handleEditSessions(link)}
          />
        );
      }

      return (
        <ClientStatusCard
          name={name}
          type={link.type ?? 'Client'}
          status={link.status}
          onPress={() => setIsDetailedView(true)}
          onMenuPress={() => console.log('Menu', name)}
          rows={buildRows(link)}
        />
      );
    },
    [isDetailedView, handleEditSessions, buildRows],
  );

  const keyExtractor = useCallback((item: InviteLink) => item._id, []);

  const renderHeader = (): ReactElement => (
    <View style={styles.headerContainer}>
      <PageHeader
        title={
          customer?.first_name ? `Coach ${customer.first_name}` : 'Coach Alex'
        }
        subtitle="Good Morning,"
        subtitlePosition="top"
        hideBackButton
        fallbackBackgroundColor={colors.StatesFill1}
        style={{
          paddingHorizontal: spacing['Spacing-5xl'],
          paddingBottom: spacing['Spacing-5xl'],
          paddingTop: insets.top + spacing['Spacing-5xl'],
        }}
        rightIcon={
          <View style={styles.headerRight}>
            <View style={styles.moltCreditPill}>
              <CreditIconSvg width={iconScale(24)} height={iconScale(24)} />
              <Text style={styles.moltCreditText}>250</Text>
            </View>
            <Pressable
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
            >
              <NotificationIconSvg
                width={iconScale(36)}
                height={iconScale(36)}
              />
            </Pressable>
            <Pressable
              style={styles.profileButton}
              accessibilityRole="button"
              accessibilityLabel="Profile"
              onPress={handleLogout}
            >
              <ProfileIconSvg width={iconScale(36)} height={iconScale(36)} />
            </Pressable>
          </View>
        }
      />

      <View style={styles.profileCardSection}>
        <ProfileCompletionCard />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {overviewCards.map((card, index) => (
            <OverviewCard key={index} {...card} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.clientsSection}>
        <View style={styles.clientsHeaderRow}>
          <Text style={styles.clientsTitle}>
            Clients ({totalItems || inviteLinks.length})
          </Text>

          <View style={styles.clientsHeaderRight}>
            <Pressable style={styles.searchButton}>
              <SearchIconSvg
                width={moderateScale(12)}
                height={moderateScale(12)}
                color={colors.IconPrimaryDefault}
              />
            </Pressable>

            <View style={styles.detailedToggleRow}>
              <Text style={styles.detailedText}>Detailed</Text>
              <Switch
                on={isDetailedView}
                onChange={setIsDetailedView}
                size="small"
              />
            </View>

            <Pressable
              style={styles.addClientPill}
              onPress={() => navigation.navigate('AddClient')}
              accessibilityRole="button"
              accessibilityLabel="Add client"
            >
              <Text style={styles.addClientText}>Client +</Text>
            </Pressable>
          </View>
        </View>

        <FilterTabs
          tabs={['Daily', 'Weekly', 'Monthly']}
          activeTab={activeDateFilter}
          onTabChange={setActiveDateFilter}
          style={styles.filterTabsMargin}
          rightElement={
            <Pressable style={styles.datePickerDropdown}>
              <Text style={styles.datePickerText}>Oct 23- 29</Text>
              <ChevronDownIconSvg
                width={iconScale(16)}
                height={iconScale(16)}
                color={colors.IconPrimaryDefault}
              />
            </Pressable>
          }
        />
        <StatusTabs
          tabs={['All Clients', 'Needs Attention (3)', 'Low Compliance']}
          activeTab={activeStatusFilter}
          onTabChange={setActiveStatusFilter}
          style={styles.statusTabsMargin}
        />

        {isInitialLoad && (
          <View>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <ClientCardSkeleton key={i} />
            ))}
          </View>
        )}
      </View>
    </View>
  );

  const renderFooter = (): ReactElement => {
    if (isFetchingLinks && inviteLinks.length > 0) {
      return (
        <View style={styles.footerContainer}>
          {Array.from({ length: 2 }).map((_, i) => (
            <ClientCardSkeleton key={i} />
          ))}
          <ActivityIndicator
            style={styles.loadingMore}
            color={colors.MatrixMain}
          />
        </View>
      );
    }
    return <View style={{ height: insets.bottom + spacing['Spacing-15xl'] }} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={isInitialLoad ? [] : inviteLinks}
        keyExtractor={keyExtractor}
        renderItem={renderClientItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />

      <AddSessionsModal
        visible={isAddSessionsModalVisible}
        onClose={() => setIsAddSessionsModalVisible(false)}
        clientName={getClientName(selectedLinkForSessions?.invitee)}
        initialValues={
          selectedLinkForSessions
            ? {
                mode:
                  selectedLinkForSessions.mode === 'Physical'
                    ? 'Physical (In-person)'
                    : 'Online',
                months:
                  selectedLinkForSessions.subscription?.number_of_month?.toString(),
                startDate:
                  selectedLinkForSessions.subscription?.start_date?.split(
                    'T',
                  )[0],
                totalSessions:
                  selectedLinkForSessions.session_package?.total_sessions?.toString(),
                sessionsLeft:
                  selectedLinkForSessions.session_package?.sessions_left?.toString(),
              }
            : undefined
        }
        onUpdate={(values: AddSessionsModalValues) => {
          void handleUpdateSessions(values);
        }}
      />
    </View>
  );
};
