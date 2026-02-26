import React, {
  useCallback,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, PageHeaderScrollView } from '@/components';
import { HorizontalDatePicker } from '@/components/HorizontalDatePicker';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutThunk } from '@/store/thunks';
import { colors, moderateScale, spacing, typography } from '@/theme';

// ─── Tab config ───────────────────────────────────────────────────────

type HomeTabId = 'Overview' | 'Tasks' | 'Nutrition';

const HOME_TABS: { id: HomeTabId; label: string; badge?: number }[] = [
  { id: 'Overview', label: 'Overview' },
  { id: 'Tasks', label: 'Tasks', badge: 1 },
  { id: 'Nutrition', label: 'Nutrition' },
];

const TAB_INDICATOR_HEIGHT = moderateScale(3);

// ─── Component ────────────────────────────────────────────────────────

/**
 * Home dashboard: header (Coach + Molt Credit + bell), date picker, and tabs.
 * Content below tabs is a minimal demo placeholder.
 */
export const HomeDashboardScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<HomeTabId>('Overview');
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined,
  );
  const customer = useAppSelector(state => state.auth.customer);
  const scrollPaddingBottom = useMemo(
    () => insets.bottom + spacing['Spacing-15xl'],
    [insets.bottom],
  );
  const dispatch = useAppDispatch();
  const handleDateSelect = useCallback((date: Date): void => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
  }, []);

  return (
    <PageHeaderScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: scrollPaddingBottom },
      ]}
      showsVerticalScrollIndicator={false}
      header={{
        title:
          (customer?.first_name &&
            customer?.first_name + ' ' + (customer?.last_name || '')) ||
          'Guest',
        subtitle: 'Powered by molt+',
        hideBackButton: true,
        rightIcon: (
          <View style={styles.headerRight}>
            <View style={styles.moltCreditPill}>
              <Text style={styles.moltCreditText}>0 Molt Credit</Text>
            </View>
            <Pressable
              style={styles.bellButton}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
            >
              <View style={styles.bellIcon} />
            </Pressable>
          </View>
        ),
      }}
      headerChildren={
        <>
          <HorizontalDatePicker
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
          <View style={styles.tabRow}>
            {HOME_TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <Pressable
                  key={tab.id}
                  style={[styles.tab, isActive && styles.tabActive]}
                  onPress={() => setActiveTab(tab.id)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  accessibilityLabel={tab.label}
                >
                  <View style={styles.tabLabelRow}>
                    <Text
                      style={[
                        styles.tabLabel,
                        isActive
                          ? styles.tabLabelActive
                          : styles.tabLabelInactive,
                      ]}
                    >
                      {tab.label}
                    </Text>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{tab.badge}</Text>
                      </View>
                    )}
                  </View>
                  {isActive && <View style={styles.tabIndicator} />}
                </Pressable>
              );
            })}
          </View>
        </>
      }
    >
      <View style={styles.demoContent}>
        <Text style={styles.demoTitle}>{activeTab}</Text>
        <Text style={styles.demoSubtext}>
          Content for {activeTab} will go here.
        </Text>
        <Button
          style={{ width: '100%' }}
          label="Logout"
          onPress={() => {
            void dispatch(logoutThunk());
          }}
        />
      </View>
    </PageHeaderScrollView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },

  // ── Header right (Molt Credit + bell) ───────────────────────────────
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  moltCreditPill: {
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingVertical: spacing['Spacing-2xl'],
    borderRadius: moderateScale(20),
    backgroundColor: colors.SurfacePrimaryDefault,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
  },
  moltCreditText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
  bellButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(9),
    borderWidth: 1.5,
    borderColor: colors.IconPrimaryDefault,
  },

  // ── Tabs ───────────────────────────────────────────────────────────
  tabRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: spacing['Spacing-3xl'],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.BorderPrimaryDefault,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing['Spacing-4xl'],
    paddingHorizontal: spacing['Spacing-xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {},
  tabLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  tabLabel: {
    ...typography.bodySmall1Medium,
  },
  tabLabelActive: {
    color: colors.TextPrimaryDefault,
  },
  tabLabelInactive: {
    color: colors.TextSecondaryDefault,
  },
  tabIndicator: {
    position: 'absolute',
    left: spacing['Spacing-2xl'],
    right: spacing['Spacing-2xl'],
    bottom: 0,
    height: TAB_INDICATOR_HEIGHT,
    backgroundColor: colors.PrimaryMain,
    borderRadius: TAB_INDICATOR_HEIGHT / 2,
  },
  badge: {
    minWidth: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(9),
    backgroundColor: colors.MatrixMain,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-sm'],
  },
  badgeText: {
    ...typography.bodySmall3SemiBold,
    color: colors.StatesWhite,
  },

  // ── Demo content ────────────────────────────────────────────────────
  demoContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-10xl'],
    gap: spacing['Spacing-2xl'],
  },
  demoTitle: {
    ...typography.h8SemiBold,
    color: colors.TextPrimaryDefault,
  },
  demoSubtext: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    marginTop: spacing['Spacing-2xl'],
  },
});
