import React, { useMemo, useState, type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  NotificationIconSvg,
  ProfileIconSvg,
  CreditIconSvg,
  ChevronDownIconSvg,
  SearchIconSvg,
} from '@/assets/images';
import {
  PageHeaderScrollView,
  OverviewCard,
  type OverviewCardProps,
  Switch,
  FilterTabs,
  StatusTabs,
  ClientCard,
  type ClientTag,
} from '@/components';
import { ProfileCompletionCard } from '@/screens/home/components/ProfileCompletionCard';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale, moderateScale, spacing, typography } from '@/theme';

import type { AppStackNavigationProp } from '@navigation/types';

// ─── Tab config ───────────────────────────────────────────────────────

// const TAB_INDICATOR_HEIGHT = moderateScale(3);

// ─── Component ────────────────────────────────────────────────────────

/**
 * Home dashboard: header (Coach + Molt Credit + bell), date picker, and tabs.
 * Content below tabs is a minimal demo placeholder.
 */
export const HomeDashboardScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<AppStackNavigationProp>();
  /*
  const [activeTab, setActiveTab] = useState<HomeTabId>('Overview');
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined,
  );
  */

  // local states for the new Clients section
  const [isDetailedView, setIsDetailedView] = useState(false);
  const [activeDateFilter, setActiveDateFilter] = useState('Daily');
  const [activeStatusFilter, setActiveStatusFilter] = useState('All Clients');

  const customer = useAppSelector(state => state.auth.customer);
  const scrollPaddingBottom = useMemo(
    () => insets.bottom + spacing['Spacing-15xl'],
    [insets.bottom],
  );
  // const dispatch = useAppDispatch();
  /*
  const handleDateSelect = useCallback((date: Date): void => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
  }, []);
  */

  const overviewCards: OverviewCardProps[] = [
    {
      title: 'Plan Compliance',
      value: '78%',
      subtitle: 'Total Compliance',
      metricsLayout: 'column',
      metrics: [
        { label: 'Steps:', value: '82%', color: colors.MatrixMain },
        { label: 'Food:', value: '74%', color: colors.AccentOrangeDark },
        { label: 'Data sync:', value: '88%', color: colors.MatrixMain },
      ],
    },
    {
      title: 'Goal Velocity',
      value: '74%',
      subtitle: 'Goal Velocity',
      actionText: '3 need plan changes',
      actionColor: colors.AccentOrangeDark,
    },
    {
      title: 'Active Clients',
      value: '24',
      subtitle: 'Total Clients',
      metricsLayout: 'row',
      metrics: [
        { label: '18 Active', type: 'dot', color: colors.MatrixMain },
        {
          label: '4 Inactive',
          type: 'dot',
          color: colors.TextSecondaryDefault,
        },
        { label: '2 Leads', type: 'dot', color: colors.AccentBlueDark },
      ],
    },
    {
      title: 'Clients at Risk',
      value: '4',
      metricsLayout: 'row',
      metrics: [
        { label: '2 High', type: 'dot', color: colors.FeedbackWarningText },
        { label: '2 Medium', type: 'dot', color: colors.AccentOrangeDark },
        { label: '1 Stable', type: 'dot', color: colors.TextSecondaryDefault },
      ],
      actionText: 'Review now',
      actionColor: colors.FeedbackWarningText,
    },
    {
      title: 'Molt Earnings',
      value: '₹48,500',
      subtitle: 'Molt Earnings',
      variant: 'dark',
      metricsLayout: 'row',
      metrics: [{ label: '+12% MoM', type: 'arrow', color: colors.MatrixMain }],
    },
  ];

  const mockClients = [
    {
      id: 1,
      name: 'Maria Garcia',
      score: 60,
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      lastSyncedText: 'Last synced 30 min ago',
      detailsText: 'Fat Loss · 3 sessions left',
      tags: [
        { label: 'Steps 20%', type: 'warning' },
        { label: 'Carb > 20%', type: 'positive' },
        { label: 'Dropped 6 kgs', type: 'positive' },
        { label: 'Meals not logged', type: 'negative' },
      ],
    },
    {
      id: 2,
      name: 'Maria Garcia',
      score: 60,
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      lastSyncedText: 'Last synced 30 min ago',
      detailsText: 'Fat Loss · 3 sessions left',
      tags: [
        { label: 'Steps 20%', type: 'warning' },
        { label: 'Carb > 20%', type: 'positive' },
        { label: 'Dropped 6 kgs', type: 'positive' },
        { label: 'Meals not logged', type: 'negative' },
      ],
    },
    {
      id: 3,
      name: 'Maria Garcia',
      score: 60,
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      lastSyncedText: 'Last synced 30 min ago',
      detailsText: 'Fat Loss · 3 sessions left',
      tags: [
        { label: 'Steps 20%', type: 'warning' },
        { label: 'Carb > 20%', type: 'positive' },
        { label: 'Dropped 6 kgs', type: 'positive' },
        { label: 'Meals not logged', type: 'negative' },
      ],
    },
  ];

  return (
    <PageHeaderScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: scrollPaddingBottom },
      ]}
      showsVerticalScrollIndicator={false}
      header={{
        title: customer?.first_name
          ? `Coach ${customer.first_name}`
          : 'Coach Alex',
        subtitle: 'Good Morning,',
        subtitlePosition: 'top',
        hideBackButton: true,
        fallbackBackgroundColor: colors.StatesFill1,
        style: {
          paddingHorizontal: spacing['Spacing-5xl'],
          paddingBottom: spacing['Spacing-5xl'],
          paddingTop: insets.top + spacing['Spacing-5xl'],
        },
        rightIcon: (
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
            >
              <ProfileIconSvg width={iconScale(36)} height={iconScale(36)} />
            </Pressable>
          </View>
        ),
      }}
    >
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
        {/* Header row: Clients (5), Search, Detailed, Client + */}
        <View style={styles.clientsHeaderRow}>
          <Text style={styles.clientsTitle}>Clients (5)</Text>

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

        {/* Date Filter Tabs */}
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
        {/* Status Filter Tabs */}
        <StatusTabs
          tabs={['All Clients', 'Needs Attention (3)', 'Low Compliance']}
          activeTab={activeStatusFilter}
          onTabChange={setActiveStatusFilter}
          style={styles.statusTabsMargin}
        />

        {/* Client List */}
        <View style={styles.clientListContainer}>
          {mockClients.map(client => (
            <ClientCard
              key={client.id}
              name={client.name}
              score={client.score}
              avatarUrl={client.avatarUrl}
              lastSyncedText={client.lastSyncedText}
              detailsText={client.detailsText}
              tags={client.tags as ClientTag[]}
              onNudgePress={() => console.log('Nudge', client.name)}
            />
          ))}
        </View>
      </View>
    </PageHeaderScrollView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.StatesFill1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  profileCardSection: {
    marginTop: spacing['Spacing-3xl'],
    marginBottom: spacing['Spacing-xl'],
    marginHorizontal: spacing['Spacing-5xl'],
  },

  // ── Header right (Molt Credit + bell) ───────────────────────────────
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  moltCreditPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
    paddingLeft: spacing['Spacing-m'],
    paddingRight: spacing['Spacing-xl'],
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
  },
  moltCreditText: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  iconButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Section ──────────────────────────────────────────────────────────
  sectionContainer: {
    marginTop: spacing['Spacing-3xl'],
    marginBottom: spacing['Spacing-xl'],
  },
  sectionTitle: {
    ...typography.h0SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  horizontalScrollContent: {
    paddingBottom: spacing['Spacing-m'],
    paddingLeft: spacing['Spacing-5xl'],
  },

  // ── Clients Section (White bg area) ──────────────────────────────────
  clientsSection: {
    paddingTop: spacing['Spacing-5xl'], // 32px
    minHeight: moderateScale(500),
  },
  clientsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing['Spacing-7xl'], // 20px
    marginBottom: spacing['Spacing-3xl'], // 32px
  },
  clientsTitle: {
    ...typography.h0SemiBold, // ~20px
    color: colors.TextPrimaryDefault,
  },
  clientsHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'], // 4px
  },
  searchButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    borderWidth: 1,
    borderColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailedToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: moderateScale(26), // Pill shape
    paddingHorizontal: spacing['Spacing-2xl'], // 10px
    paddingVertical: spacing['Spacing-xl'], // 8px
    gap: spacing['Spacing-l'], // 6px
  },
  detailedText: {
    ...typography.bodySmall1Medium, // 14px
    color: colors.TextSecondaryDefault,
  },
  addClientPill: {
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: moderateScale(20),
    paddingHorizontal: spacing['Spacing-2xl'], // 10px
    paddingVertical: spacing['Spacing-xl'], // 8px
    justifyContent: 'center',
  },
  addClientText: {
    ...typography.bodySmall1Medium, // 14px
    color: colors.TextPrimaryDefault,
  },
  filterTabsMargin: {
    marginBottom: spacing['Spacing-5xl'], // 32px
  },
  datePickerDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  datePickerText: {
    ...typography.bodySmall1Regular, // 14px
    color: colors.TextPrimaryDefault,
  },
  statusTabsMargin: {
    marginBottom: spacing['Spacing-5xl'], // 16px
  },
  clientListContainer: {
    paddingBottom: spacing['Spacing-11xl'],
  },
});
