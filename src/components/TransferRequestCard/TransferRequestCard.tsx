import React, { type ReactElement } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { ProfilePng, RightIndicationArrowSvg } from '@/assets/images';
import { Badge, Button } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale, radius, spacing, typography } from '@/theme';

import type { TransferRequestCardProps } from './TransferRequestCard.types';

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

// ── Component ────────────────────────────────────────────────────────

export const TransferRequestCard = ({
  requestId,
  duration,
  days,
  time,
  coach,
  client,
  onAccept,
  onReject,
}: TransferRequestCardProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  const durationText =
    duration === 'Temporary'
      ? `${translation.transferStatusTemporary} • ${days} ${translation.transferStatusDays}`
      : translation.transferStatusPermanent;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.durationText}>{durationText}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <Badge
          backgroundColor="AccentOrangeLight"
          textColor="AccentOrangeDark"
          radius="xs"
          style={styles.pendingBadge}
        >
          <ClockIcon />
          <Text style={styles.pendingText}>
            {translation.transferStatusPending}
          </Text>
        </Badge>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.participantContainer}>
          <Image
            source={coach.avatarUrl ? { uri: coach.avatarUrl } : ProfilePng}
            style={styles.avatar}
          />
          <Text style={styles.participantLabel}>
            {translation.transferStatusFromCoach}
          </Text>
          <Text style={styles.participantName}>{coach.name}</Text>
        </View>

        <View style={styles.arrowContainer}>
          <View style={styles.arrowCircle}>
            <RightIndicationArrowSvg
              width={iconScale(12)}
              height={iconScale(12)}
              color={colors.IconPrimaryDefault}
            />
          </View>
        </View>

        <View style={styles.participantContainer}>
          <Image
            source={client.avatarUrl ? { uri: client.avatarUrl } : ProfilePng}
            style={styles.avatar}
          />
          <Text style={styles.participantLabel}>
            {translation.transferStatusClientLabel}
          </Text>
          <Text style={styles.participantName}>{client.name}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          label={translation.transferStatusReject}
          variant="outline"
          style={styles.button}
          onPress={() => onReject(requestId)}
        />
        <Button
          label={translation.transferStatusAccept}
          variant="primary"
          style={styles.button}
          onPress={() => onAccept(requestId)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    padding: spacing['Spacing-5xl'],
    marginBottom: spacing['Spacing-xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['Spacing-10xl'],
  },
  durationText: {
    ...typography.b2SemiBold,
    color: colors.TextPrimaryDark,
    marginBottom: spacing['Spacing-xs'],
  },
  timeText: {
    ...typography.bodySmall4Medium,
    color: colors.TextTertiaryMuted,
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: spacing['Spacing-m'],
  },
  pendingText: {
    ...typography.bodySmall1SemiBold,
    color: colors.AccentOrangeDark,
  },
  divider: {
    height: 0,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderStyle: 'dashed',
    marginBottom: spacing['Spacing-10xl'],
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['Spacing-5xl'],
    marginBottom: spacing['Spacing-10xl'],
  },
  participantContainer: {
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: iconScale(64),
    height: iconScale(64),
    borderRadius: radius.full,
    marginBottom: spacing['Spacing-xl'],
    backgroundColor: colors.StatesFill1,
  },
  participantLabel: {
    ...typography.bodySmall2SemiBold,
    color: colors.TextTertiaryMuted,
    marginBottom: spacing['Spacing-xs'],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  participantName: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDark,
    textAlign: 'center',
  },
  arrowContainer: {
    paddingHorizontal: spacing['Spacing-xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -spacing['Spacing-10xl'], // Align with avatars
  },
  arrowCircle: {
    width: iconScale(24),
    height: iconScale(24),
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.StatesWhite,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing['Spacing-xl'],
    borderTopWidth: 1,
    borderTopColor: colors.StatesDivider,
    paddingTop: spacing['Spacing-5xl'],
  },
  button: {
    flex: 1,
  },
});
