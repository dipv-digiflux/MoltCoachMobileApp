import React from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { CommonCardProps } from './CommonCard.types';

export const CommonCard = ({
  title,
  actionText,
  onActionPress,
  children,
  containerStyle,
}: CommonCardProps): React.ReactElement => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {actionText && (
          <Pressable onPress={onActionPress}>
            <Text style={styles.actionText}>{actionText}</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    marginBottom: spacing['Spacing-xl'],
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: spacing['Spacing-xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
  },
  title: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
  },
  actionText: {
    ...typography.bodySmall1Regular,
    color: colors.PrimaryMain,
    textDecorationLine: 'underline',
  },
  content: {
    padding: spacing['Spacing-xl'],
  },
});
