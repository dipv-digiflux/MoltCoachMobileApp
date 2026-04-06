import React, { type ReactElement } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, radius, spacing, typography } from '@/theme';

import { type NudgeSuccessCardProps } from './NudgeSuccessCard.types';

export const NudgeSuccessCard = ({
  clientName,
  messages,
}: NudgeSuccessCardProps): ReactElement => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://avatar.iran.liara.run/public/64' }}
          style={styles.avatar}
        />
        <View style={styles.headerContent}>
          <Text style={styles.name}>{clientName}</Text>
          <Text style={styles.status}>Sent just now</Text>
        </View>
      </View>

      <View style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index} style={styles.messageBox}>
            <Text style={styles.quote}>"</Text>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: radius.sm,
    padding: spacing['Spacing-6xl'],
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing['Spacing-7xl'],
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(2),
    marginRight: spacing['Spacing-xl'],
    backgroundColor: colors.StatesFill1,
  },
  headerContent: {
    flex: 1,
  },
  name: {
    ...typography.b2SemiBold,
    color: colors.TextPrimaryDefault,
  },
  status: {
    ...typography.bodySmall4Regular,
    color: '#9CA3AF',
    marginTop: moderateScale(4),
  },
  messagesContainer: {
    gap: spacing['Spacing-xl'],
  },
  messageBox: {
    backgroundColor: colors.StatesFill1,
    padding: spacing['Spacing-5xl'],
    borderRadius: radius.xs,
    position: 'relative',
    paddingTop: spacing['Spacing-6xl'],
  },
  quote: {
    position: 'absolute',
    top: spacing['Spacing-m'],
    left: spacing['Spacing-m'],
    ...typography.h0SemiBold,
    fontSize: moderateScale(24),
    color: colors.TextSecondaryDefault,
    opacity: 0.3,
  },
  messageText: {
    ...typography.bodySmall1TallRegular,
    color: '#4B5563',
  },
});
