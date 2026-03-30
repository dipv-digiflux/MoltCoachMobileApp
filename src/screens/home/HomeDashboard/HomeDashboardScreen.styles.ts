import { StyleSheet } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesFill1,
  },
  flatListContent: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: colors.StatesFill1,
  },
  profileCardSection: {
    marginTop: spacing['Spacing-3xl'],
    marginBottom: spacing['Spacing-xl'],
    marginHorizontal: spacing['Spacing-5xl'],
  },
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
  clientsSection: {
    paddingTop: spacing['Spacing-5xl'],
    backgroundColor: colors.StatesFill1,
  },
  clientsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing['Spacing-7xl'],
    marginBottom: spacing['Spacing-3xl'],
  },
  clientsTitle: {
    ...typography.h0SemiBold,
    color: colors.TextPrimaryDefault,
  },
  clientsHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  searchButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailedToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(26),
    paddingHorizontal: spacing['Spacing-2xl'],
    paddingVertical: spacing['Spacing-xl'],
    gap: spacing['Spacing-l'],
  },
  detailedText: {
    ...typography.bodySmall1Medium,
    color: colors.TextSecondaryDefault,
  },
  addClientPill: {
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(20),
    paddingHorizontal: spacing['Spacing-2xl'],
    paddingVertical: spacing['Spacing-xl'],
    justifyContent: 'center',
  },
  addClientText: {
    ...typography.bodySmall1Medium,
    color: colors.TextPrimaryDefault,
  },
  filterTabsMargin: {
    marginBottom: spacing['Spacing-5xl'],
  },
  datePickerDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  datePickerText: {
    ...typography.bodySmall1Regular,
    color: colors.TextPrimaryDefault,
  },
  statusTabsMargin: {
    marginBottom: spacing['Spacing-5xl'],
  },
  footerContainer: {
    paddingBottom: spacing['Spacing-11xl'],
  },
  loadingMore: {
    paddingVertical: spacing['Spacing-5xl'],
  },
});
