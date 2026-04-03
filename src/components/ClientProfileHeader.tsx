import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';
import { getInitials } from '@/utils/avatar';

import { ClientProfileHeaderProps } from './ClientProfileHeader.types';

export const ClientProfileHeader = ({
  name,
  avatarUrl,
  status,
  sessionsInfo,
}: ClientProfileHeaderProps): React.ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>{getInitials(name)}</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.nameText}>{name}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{status.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.sessionsText}>{sessionsInfo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.StatesWhite,
    padding: spacing['Spacing-5xl'],
    gap: spacing['Spacing-xl'],
  },
  avatarContainer: {
    width: moderateScale(56),
    height: moderateScale(56),
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(4),
    backgroundColor: colors.StatesDivider,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(4),
    backgroundColor: colors.AccentBlueLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    ...typography.h0SemiBold,
    fontSize: moderateScale(18),
    color: colors.TextSecondaryDefault,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(4),
  },
  nameText: {
    ...typography.h10Bold,
    color: colors.TextPrimaryDefault,
    marginBottom: moderateScale(2),
  },
  statusBadge: {
    backgroundColor: colors.FeedbackSuccessSurface,
    paddingHorizontal: spacing['Spacing-m'],
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(4),
  },
  statusText: {
    ...typography.bodySmall2Medium,
    color: colors.MatrixMain,
    textTransform: 'uppercase',
  },
  sessionsText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
    marginTop: spacing['Spacing-m'],
  },
});
