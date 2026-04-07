import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconDragHandleSvg, IconMinusSvg, IconPlusSvg } from '@/assets/images';
import { Button, PageHeader } from '@/components';
import { moderateScale, spacing } from '@/theme';
import { AppStackParamList } from '@/types/navigation.types';

import { styles } from './ManageDataScreen.styles';
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
