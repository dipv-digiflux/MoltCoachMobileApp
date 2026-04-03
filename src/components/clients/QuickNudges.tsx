import React, { type ReactElement, useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { SquareCheckbox } from '../SquareCheckbox';

import { type QuickNudgesProps } from './QuickNudges.types';

const QuickNudgesComponent = ({
  nudges,
  onToggleNudge,
  invite,
}: QuickNudgesProps): ReactElement => {
  const clientName = useMemo(() => {
    if (!invite) return '';
    const capitalize = (str: string): string =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return [invite.invitee?.first_name, invite.invitee?.last_name]
      .filter(Boolean)
      .map(name => capitalize(name as string))
      .join(' ');
  }, [invite]);

  const clientImage = null; // Currently not available in invite prop

  const initials = useMemo(() => {
    if (!clientName) return '??';
    return clientName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }, [clientName]);

  const formatLabel = (str: string): string => {
    const formatted = str.replace(/_/g, ' ');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
  };

  const nutritionTags = useMemo(() => {
    if (!invite?.nutrition_draft) return [];
    return Object.entries(invite.nutrition_draft)
      .filter(([_, value]) => value !== null && value !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(0, 5)
      .map(([key, value]) => ({
        label: formatLabel(key),
        value: String(value),
      }));
  }, [invite?.nutrition_draft]);

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          {clientImage ? (
            <Image source={{ uri: clientImage }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.initialsContainer]}>
              <Text style={styles.initialsText}>{initials}</Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.name}>{clientName || 'Client'}</Text>
          <View style={styles.tagsContainer}>
            {nutritionTags.length > 0 ? (
              <View style={styles.tagWrapper}>
                {nutritionTags.map((tag, index) => (
                  <View
                    key={tag.label}
                    style={[
                      styles.tag,
                      index % 2 === 0 ? styles.tagWarning : styles.tagSuccess,
                    ]}
                  >
                    <Text style={styles.tagText}>
                      {tag.label}: {tag.value}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.noDataText}>No nutrition data available</Text>
            )}
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Nudges</Text>

      {nudges.map(nudge => (
        <Pressable
          key={nudge.id}
          style={[styles.nudgeCard, nudge.selected && styles.nudgeCardSelected]}
          onPress={() => onToggleNudge(nudge.id)}
        >
          <Text style={styles.nudgeIcon}>{nudge.icon}</Text>
          <Text style={styles.nudgeMessage}>{nudge.message}</Text>
          <View style={styles.checkboxContainer}>
            <SquareCheckbox
              checked={nudge.selected}
              onPress={() => onToggleNudge(nudge.id)}
            />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export const QuickNudges = React.memo(QuickNudgesComponent);

const styles = StyleSheet.create({
  container: {
    padding: spacing['Spacing-5xl'],
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(2),
    padding: spacing['Spacing-5xl'],
    marginBottom: spacing['Spacing-5xl'],
    gap: spacing['Spacing-3xl'],
  },
  avatarContainer: {
    marginRight: spacing['Spacing-xl'],
  },
  avatar: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(2),
    backgroundColor: colors.StatesDivider,
  },
  initialsContainer: {
    backgroundColor: colors.StatesFill1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    ...typography.h3SemiBold,
    color: colors.PrimaryMain,
    fontSize: moderateScale(16),
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    ...typography.h0SemiBold,
    fontSize: moderateScale(18),
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-m'],
  },
  tagsContainer: {
    gap: spacing['Spacing-m'],
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing['Spacing-m'],
  },
  tag: {
    paddingHorizontal: spacing['Spacing-l'],
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(2),
  },
  tagSuccess: {
    backgroundColor: colors.TagSuccessSurface,
  },
  tagWarning: {
    backgroundColor: colors.FeedbackWarningSurface,
  },
  tagText: {
    ...typography.tagLabel,
    fontSize: moderateScale(12),
    color: colors.TextSecondaryDefault,
  },
  noDataText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
    fontStyle: 'italic',
  },
  sectionTitle: {
    ...typography.h3SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-1'],
    fontSize: moderateScale(16),
  },
  nudgeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.StatesWhite,
    borderRadius: moderateScale(2),
    padding: spacing['Spacing-5xl'],
    gap: spacing['Spacing-3xl'],
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    marginBottom: spacing['Spacing-xl'],
  },
  nudgeCardSelected: {
    borderColor: colors.TextPrimaryDefault,
  },
  nudgeIcon: {
    fontSize: moderateScale(20),
    marginRight: spacing['Spacing-xl'],
  },
  nudgeMessage: {
    ...typography.bodySmall1TallMedium,
    flex: 1,
    color: colors.TextPrimaryDefault,
    lineHeight: moderateScale(19.6),
  },
  checkboxContainer: {
    marginLeft: spacing['Spacing-xl'],
  },
});
