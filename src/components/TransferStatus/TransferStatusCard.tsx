import React, { type ReactElement } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { ProfilePng } from '@/assets/images';
import { Badge, Button } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale, radius, spacing, typography } from '@/theme';

import {
  TransferStatusCardProps,
  TransferStatusType,
} from './TransferStatus.types';

// ── Icons ────────────────────────────────────────────────────────────

const ClockIcon = ({ color = colors.AccentOrangeDark }): ReactElement => (
  <Svg
    width={iconScale(16)}
    height={iconScale(16)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path
      d="M12 6V12L16 14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckCircleIcon = ({
  color = colors.FeedbackSuccessText,
}): ReactElement => (
  <Svg
    width={iconScale(16)}
    height={iconScale(16)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path
      d="M8 12L11 15L16 9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CrossCircleIcon = ({
  color = colors.FeedbackWarningText,
}): ReactElement => (
  <Svg
    width={iconScale(16)}
    height={iconScale(16)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path
      d="M15 9L9 15M9 9L15 15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Component ────────────────────────────────────────────────────────

export const TransferStatusCard = ({
  request,
  currentTab,
  onAccept,
  onReject,
}: TransferStatusCardProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  const getStatusInfo = (
    status: TransferStatusType,
  ): { icon: ReactElement; label: string; color: string } => {
    switch (status) {
      case 'Accepted':
        return {
          icon: <CheckCircleIcon />,
          label: translation.transferStatusAccepted,
          color: colors.FeedbackSuccessText,
        };
      case 'Rejected':
        return {
          icon: <CrossCircleIcon />,
          label: translation.transferStatusRejected,
          color: colors.FeedbackWarningText,
        };
      case 'Pending':
      default:
        return {
          icon: <ClockIcon />,
          label: translation.transferStatusPending,
          color: colors.AccentOrangeDark,
        };
    }
  };

  const renderParticipant = (
    label: string,
    participant: {
      name: string;
      avatarUrl?: string;
      status: TransferStatusType;
    },
    isLast = false,
  ): ReactElement => {
    const info = getStatusInfo(participant.status);
    return (
      <View style={styles.participantRow}>
        <View style={styles.avatarWrapper}>
          <Image
            source={
              participant.avatarUrl
                ? { uri: participant.avatarUrl }
                : ProfilePng
            }
            style={styles.avatar}
          />
          {!isLast && <View style={styles.connector} />}
        </View>
        <View style={styles.participantDetails}>
          <Text style={styles.participantLabel}>{label}</Text>
          <Text style={styles.participantName}>{participant.name}</Text>
        </View>
        <View style={styles.statusIndicator}>
          {info.icon}
          <Text style={[styles.statusLabel, { color: info.color }]}>
            {info.label}
          </Text>
        </View>
      </View>
    );
  };

  const durationText =
    request.duration === 'Temporary'
      ? `${translation.transferStatusTemporary} • ${request.days} ${translation.transferStatusDays}`
      : translation.transferStatusPermanent;

  const showFooter =
    currentTab === 'received' && request.client.status === 'Pending';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{request.date}</Text>
        <Badge
          label={durationText}
          backgroundColor="StatesFill1"
          textColor="TextPrimaryDefault"
          typographyToken="bodySmall1SemiBold"
          paddingHorizontal="Spacing-xl"
          paddingVertical="Spacing-m"
          radius="xs"
          style={styles.badge}
        />
      </View>

      <View style={styles.body}>
        {renderParticipant(translation.transferStatusClient, request.client)}
        {renderParticipant(
          translation.transferStatusDestinationCoach,
          request.coach,
          true,
        )}
      </View>

      {showFooter && (
        <View style={styles.footer}>
          <Button
            label={translation.transferStatusReject}
            variant="outline"
            style={styles.button}
            onPress={() => onReject?.(request.id)}
          />
          <Button
            label={translation.transferStatusAccept}
            variant="primary"
            style={styles.button}
            onPress={() => onAccept?.(request.id)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.xs,
    marginBottom: spacing['Spacing-xl'],
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    padding: spacing['Spacing-5xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['Spacing-10xl'],
  },
  dateText: {
    ...typography.bodySmall1TallRegular,
    color: colors.TextSecondaryDefault,
  },
  badge: {
    borderWidth: 1,
    borderColor: colors.StatesOutline,
  },
  body: {
    gap: spacing['Spacing-sm'],
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing['Spacing-xl'],
  },
  avatarWrapper: {
    alignItems: 'center',
    width: iconScale(48),
  },
  avatar: {
    width: iconScale(48),
    height: iconScale(48),
    borderRadius: spacing['Spacing-sm'],
    backgroundColor: colors.StatesFill1,
  },
  connector: {
    width: 2,
    height: spacing['Spacing-7xl'],
    backgroundColor: colors.StatesOutline,
    marginVertical: spacing['Spacing-m'],
  },
  participantDetails: {
    flex: 1,
    paddingTop: spacing['Spacing-xs'],
  },
  participantLabel: {
    ...typography.bodySmall4Medium,
    color: colors.TextSecondaryLight,
    marginBottom: spacing['Spacing-xs'],
    lineHeight: undefined,
  },
  participantName: {
    ...typography.b2SemiBold,
    color: colors.TextPrimaryDark,
    lineHeight: undefined,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-sm'],
    paddingTop: spacing['Spacing-5xl'],
  },
  statusLabel: {
    ...typography.b2SemiBold,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing['Spacing-xl'],
    marginTop: spacing['Spacing-10xl'],
    borderTopWidth: 1,
    borderTopColor: colors.StatesDivider,
    paddingTop: spacing['Spacing-5xl'],
  },
  button: {
    flex: 1,
  },
});
