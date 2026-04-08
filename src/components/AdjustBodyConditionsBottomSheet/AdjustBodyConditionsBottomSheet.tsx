import React, { ReactElement, useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BottomSheet, Input, Button } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { borderWidth, colors, radius, spacing, typography } from '@/theme';

import { AdjustBodyConditionsBottomSheetProps } from './AdjustBodyConditionsBottomSheet.types';
import { ConditionCard } from './ConditionCard';
import { RecentActivityItem } from './RecentActivityItem';

export const AdjustBodyConditionsBottomSheet = ({
  visible,
  onClose,
  currentConditions,
  recentActivities,
  onAddCondition,
  onRemoveCondition,
  onSaveChanges,
}: AdjustBodyConditionsBottomSheetProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const [newCondition, setNewCondition] = useState('');

  const handleAddPress = useCallback(() => {
    if (newCondition.trim()) {
      onAddCondition(newCondition.trim());
      setNewCondition('');
    }
  }, [newCondition, onAddCondition]);

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      header={{
        title: translation.adjustBodyConditionsTitle,
      }}
      footer={{
        primaryLabel: translation.adjustBodyConditionsSaveButton,
        onPrimaryPress: onSaveChanges,
      }}
    >
      <View style={styles.container}>
        {/* Add Condition Section */}
        <View style={styles.section}>
          <Text style={styles.label}>
            {translation.adjustBodyConditionsAddLabel}
          </Text>
          <View style={styles.addInputRow}>
            <View style={styles.inputWrapper}>
              <Input
                placeholder={translation.adjustBodyConditionsAddPlaceholder}
                value={newCondition}
                onChangeText={setNewCondition}
              />
            </View>
            <Button
              label={translation.adjustBodyConditionsAddButton}
              onPress={handleAddPress}
              variant="primary"
              style={styles.addButton}
            />
          </View>
        </View>

        {/* Current Conditions Section */}
        {currentConditions.length > 0 && (
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>
              {translation.adjustBodyConditionsCurrentLabel}
            </Text>
            {currentConditions.map(condition => (
              <ConditionCard
                key={condition.id}
                condition={condition}
                onRemove={onRemoveCondition}
              />
            ))}
          </View>
        )}

        {/* Recent Activity Section */}
        {recentActivities.length > 0 && (
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>
              {translation.adjustBodyConditionsRecentLabel}
            </Text>
            {recentActivities.map((activity, index) => (
              <RecentActivityItem
                key={activity.id}
                activity={activity}
                isLast={index === recentActivities.length - 1}
              />
            ))}
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: spacing['Spacing-5xl'],
    gap: spacing['Spacing-3xl'],
  },
  section: {
    gap: spacing['Spacing-3xl'],
  },
  sectionBox: {
    padding: spacing['Spacing-4xl'],
    borderWidth: borderWidth.hairline,
    borderColor: colors.StatesOutline,
    borderRadius: radius.xs,
  },
  sectionTitle: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-3xl'],
  },
  label: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  addInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-2xl'],
  },
  inputWrapper: {
    flex: 1,
  },
  addButton: {
    height: spacing['Spacing-15xl'],
    paddingHorizontal: spacing['Spacing-7xl'],
    borderRadius: radius.xs,
  },
});
