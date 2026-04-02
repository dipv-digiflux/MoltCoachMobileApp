import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { CheckedcircleWithBlackBgSvg } from '@/assets/images';
import { Button, PageHeaderScrollView } from '@/components';
import { Badge } from '@/components/Badge';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography, moderateScale, iconScale } from '@/theme';

export const TransactionDetailsScreen = (): ReactElement => {
  const translations = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: translations.transactionDetailsHeaderTitle }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.scrollContent}>
          {/* Status Section */}
          <View style={styles.statusSection}>
            <CheckedcircleWithBlackBgSvg
              width={iconScale(48)}
              height={iconScale(48)}
            />
            <Text style={styles.amount}>AED 450.00</Text>
            <Badge
              label={translations.transactionDetailsStatusSuccessful}
              backgroundColor="TagSuccessSurface"
              textColor="FeedbackSuccessText"
              paddingHorizontal="Spacing-5xl"
              paddingVertical="Spacing-m"
            />
          </View>

          {/* Details Card */}
          <View style={styles.detailsCard}>
            <DetailRow
              label={translations.transactionDetailsLabelProduct}
              value="Weekly Meal Plan"
            />
            <View style={styles.divider} />
            <DetailRow
              label={translations.transactionDetailsLabelDate}
              value="Feb 18, 2026, 9:41 AM"
            />
            <View style={styles.divider} />
            <DetailRow
              label={translations.transactionDetailsLabelPaymentMethod}
              value="Visa ending in 4242"
            />
            <View style={styles.divider} />
            <DetailRow
              label={translations.transactionDetailsLabelTransactionId}
              value="#TRX-89210"
            />
          </View>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <Button
              label={translations.transactionDetailsButtonDownload}
              variant="primary"
              fullWidth
              onPress={() => console.log('Download pressed')}
              iconLeft={
                <View style={styles.downloadIcon}>
                  <View style={styles.downloadArrow} />
                  <View style={styles.downloadLine} />
                </View>
              }
            />
            <Pressable
              onPress={() => console.log('Report pressed')}
              style={styles.reportButton}
            >
              <Text style={styles.reportText}>
                {translations.transactionDetailsLinkReport}
              </Text>
            </Pressable>
          </View>
        </View>
      </PageHeaderScrollView>
    </View>
  );
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}): ReactElement => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentContainerStyle: {
    paddingBottom: spacing['Spacing-16xl'],
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-12xl'],
    gap: spacing['Spacing-16xl'],
  },
  statusSection: {
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  amount: {
    ...typography.h0Bold,
    fontSize: moderateScale(40),
    color: colors.TextPrimaryDefault,
  },
  detailsCard: {
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    backgroundColor: colors.StatesWhite,
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-xl'],
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing['Spacing-8xl'],
  },
  detailLabel: {
    ...typography.b1Regular,
    color: colors.TextSecondaryDefault,
  },
  detailValue: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  divider: {
    height: 1,
    backgroundColor: colors.StatesDivider,
  },
  footer: {
    gap: spacing['Spacing-10xl'],
    alignItems: 'center',
  },
  reportButton: {
    paddingVertical: spacing['Spacing-m'],
  },
  reportText: {
    ...typography.b1Medium,
    color: colors.TextSecondaryDefault,
    textDecorationLine: 'underline',
  },
  downloadIcon: {
    width: iconScale(20),
    height: iconScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.StatesWhite,
    marginBottom: spacing['Spacing-5xl'],
  },
  downloadLine: {
    width: 12,
    height: 2,
    backgroundColor: colors.StatesWhite,
  },
});
