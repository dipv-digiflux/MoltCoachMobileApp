import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconDragHandleSvg, IconMinusSvg, IconPlusSvg } from '@/assets/images';
import { Button, PageHeader } from '@/components';
import { colors, moderateScale, spacing, typography } from '@/theme';
import { AppStackParamList } from '@/types/navigation.types';

import { ManageDataItem } from './ManageDataScreen.types';

const INITIAL_LIVE_DATA: ManageDataItem[] = [
  { id: 'steps', label: 'Steps' },
  { id: 'weight', label: 'Weight' },
  { id: 'kcal', label: 'Kcal' },
  { id: 'tasks', label: 'Tasks' },
];

const INITIAL_ADD_MORE_DATA: ManageDataItem[] = [
  { id: 'heart_rate', label: 'Heart rate' },
  { id: 'fat_percent', label: 'Fat%' },
  { id: 'goal_velocity', label: 'Goal velocity' },
];

export const ManageDataScreen = ({
  navigation,
}: NativeStackScreenProps<
  AppStackParamList,
  'ManageData'
>): React.ReactElement => {
  const insets = useSafeAreaInsets();
  const [liveData, setLiveData] = useState<ManageDataItem[]>(INITIAL_LIVE_DATA);
  const [addMoreData, setAddMoreData] = useState<ManageDataItem[]>(
    INITIAL_ADD_MORE_DATA,
  );

  const handleRemove = (item: ManageDataItem): void => {
    setLiveData(prev => prev.filter(i => i.id !== item.id));
    setAddMoreData(prev => [...prev, item]);
  };

  const handleAdd = (item: ManageDataItem): void => {
    setAddMoreData(prev => prev.filter(i => i.id !== item.id));
    setLiveData(prev => [...prev, item]);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title="Customise Your View"
        subtitle="Add, remove, or rearrange the data you want to see."
        onPressBack={() => navigation.goBack()}
        variant="stacked"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing['Spacing-16xl'] },
        ]}
      >
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Live Data</Text>
          {liveData.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.itemRow,
                index === liveData.length - 1 && styles.lastItem,
              ]}
            >
              <View style={styles.itemLeft}>
                <IconDragHandleSvg
                  width={moderateScale(16)}
                  height={moderateScale(16)}
                />
                <Text style={styles.itemText}>{item.label}</Text>
              </View>
              <Pressable
                onPress={() => handleRemove(item)}
                style={styles.actionButton}
              >
                <IconMinusSvg
                  width={moderateScale(24)}
                  height={moderateScale(24)}
                />
              </Pressable>
            </View>
          ))}
        </View>

        <View style={[styles.card, styles.addMoreCard]}>
          <Text style={styles.sectionLabel}>Add More</Text>
          {addMoreData.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.itemRow,
                index === addMoreData.length - 1 && styles.lastItem,
              ]}
            >
              <Text style={styles.itemTextOnly}>{item.label}</Text>
              <Pressable
                onPress={() => handleAdd(item)}
                style={styles.actionButton}
              >
                <IconPlusSvg
                  width={moderateScale(24)}
                  height={moderateScale(24)}
                />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom + spacing['Spacing-xl'] },
        ]}
      >
        <Button
          label="Save Changes"
          onPress={() => navigation.goBack()}
          variant="primary"
          size="large"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-3xl'],
  },
  card: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    paddingTop: spacing['Spacing-4xl'],
    marginBottom: spacing['Spacing-4xl'],
  },
  addMoreCard: {
    borderColor: 'rgba(21, 153, 69, 0.1)',
  },
  sectionLabel: {
    ...typography.bodySmall2Medium,
    color: '#94A3B8',
    paddingHorizontal: spacing['Spacing-xl'],
    marginBottom: spacing['Spacing-2xl'],
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingVertical: spacing['Spacing-4xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-3xl'],
  },
  itemText: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  itemTextOnly: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  actionButton: {
    padding: spacing['Spacing-xs'],
  },
  footer: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-xl'],
    backgroundColor: colors.StatesWhite,
  },
});
