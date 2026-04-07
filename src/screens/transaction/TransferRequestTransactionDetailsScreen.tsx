import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { InfoIconSvg } from '@/assets/images';
import {
  PageHeaderScrollView,
  LiquidFooter,
  Button,
  CreditPackageCard,
  Badge,
  InfoCard,
  TransactionInfoCard,
} from '@/components';
import { useAppSelector } from '@/store/hooks';
import {
  borderWidth,
  colors,
  iconScale,
  radius,
  spacing,
  typography,
} from '@/theme';

export const TransferRequestTransactionDetailsScreen = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{
          title: translation.transferRequestTransactionDetailsHeaderTitle,
        }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.cardWrapper}>
          <CreditPackageCard
            credits={100}
            status="completed"
            price={45}
            currency="AED"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {translation.transactionCardTitle}
          </Text>
        </View>

        <View style={styles.cardWrapper}>
          <TransactionInfoCard
            rows={[
              {
                label: translation.transactionLabelTicketID,
                value: '#1043',
              },
              {
                label: translation.transactionLabelRequestType,
                value: translation.transactionValueWithdrawToBank,
              },
              {
                label: translation.transactionLabelStatus,
                value: translation.creditPackageCompleted,
              },
              {
                label: translation.transactionLabelPaymentReference,
                value: 'MOLT-TRF-2024-10-1043',
              },
            ]}
          />
        </View>

        <View style={styles.infoCardWrapper}>
          <TransactionInfoCard
            title={translation.transactionCardTitle}
            rows={[
              {
                label: translation.transactionLabelTicketID,
                value: '#1043',
              },
              {
                label: translation.transactionLabelRequestType,
                value: translation.transactionValueWithdrawToBank,
              },
              {
                label: translation.transactionLabelStatus,
                value: translation.creditPackageCompleted,
              },
              {
                label: translation.transactionLabelPaymentReference,
                value: 'MOLT-TRF-2024-10-1043',
              },
            ]}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {translation.amountBreakdownTitle}
          </Text>
        </View>

        <View style={styles.cardWrapper}>
          <TransactionInfoCard
            title={translation.encashmentDetailsTitle}
            headerBadge={
              <Badge
                label={translation.tierEncashableBadge}
                backgroundColor="AccentTealLight"
                textColor="AccentTealDarkText"
                radius="xs"
                paddingHorizontal="Spacing-xl"
                paddingVertical="Spacing-m"
                typographyToken="bodySmall4Medium"
              />
            }
            rows={[
              {
                label: translation.creditsRequestedLabel,
                value: translation.creditPackageCreditsCount.replace(
                  '{{count}}',
                  '100',
                ),
              },
              {
                label: translation.processingFeeLabel,
                value: translation.creditPackageCreditsCount.replace(
                  '{{count}}',
                  '0',
                ),
              },
              {
                label: translation.netTransferredLabel,
                value: translation.creditPackageCreditsCount.replace(
                  '{{count}}',
                  '60',
                ),
              },
            ]}
            footerNote={translation.encashmentDetailsNote}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {translation.destinationTitleToken}
          </Text>
        </View>

        <View style={styles.cardWrapper}>
          <TransactionInfoCard
            rows={[
              {
                label: translation.transferMethodLabel,
                value: translation.manualBankTransferValue,
              },
              {
                label: translation.accountHolderLabel,
                value: 'Sarah Thompson',
              },
              {
                label: translation.bankLabel,
                value: 'HDFC Bank b7 **** 4821',
              },
              {
                label: translation.processingByLabel,
                value: translation.moltFinanceTeamValue,
              },
            ]}
          />
        </View>

        <View style={styles.infoWrapper}>
          <InfoCard
            description={translation.transferCompleteInfoBanner}
            icon={
              <InfoIconSvg
                width={iconScale(24)}
                height={iconScale(24)}
                color={colors.FeedbackSuccessText}
              />
            }
            style={styles.successInfoCard}
          />
        </View>
      </PageHeaderScrollView>
      <LiquidFooter showTopBorder>
        <Button
          label={translation.transferRequestTransactionDetailsFooterButton}
          variant="primary"
          size="large"
          fullWidth
          onPress={() => {}}
        />
      </LiquidFooter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.StatesWhite,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  sectionHeader: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
  },
  sectionTitle: {
    ...typography.b1SemiBold,
    color: colors.PrimaryMain,
  },
  cardWrapper: {
    padding: spacing['Spacing-5xl'],
  },
  infoCardWrapper: {
    padding: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-xs'],
  },
  infoWrapper: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-5xl'],
  },
  successInfoCard: {
    backgroundColor: colors.FeedbackSuccessSurface,
    borderWidth: borderWidth.hairline,
    borderColor: colors.FeedbackSuccessBorder,
    borderRadius: radius.md,
    padding: spacing['Spacing-xl'],
  },
});
