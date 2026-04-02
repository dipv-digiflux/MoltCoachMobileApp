import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, OngoingTaskCard, PageHeader } from '@/components';
import { colors, moderateScale, spacing, typography } from '@/theme';
import { AppStackParamList } from '@/types/navigation.types';

export const ManageTasksScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<
  AppStackParamList,
  'ManageTasks'
>): React.ReactElement => {
  const insets = useSafeAreaInsets();
  const { clientName } = route.params;

  const ongoingTasks = [
    {
      id: '1',
      title: '5,000 step walk',
      subtitle: 'Till 2 April 2026 • By you',
    },
    {
      id: '2',
      title: 'Drink 2ltr water',
      subtitle: 'Daily • By you',
    },
  ];

  return (
    <View style={styles.container}>
      <PageHeader
        title="Manage Tasks"
        onPressBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing['Spacing-15xl'] },
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>On going tasks</Text>
          <Pressable
            onPress={() => navigation.navigate('CreateTask', { clientName })}
            style={styles.addTaskButton}
          >
            <Text style={styles.addTaskText}>Add new task +</Text>
          </Pressable>
        </View>

        <View style={styles.tasksList}>
          {ongoingTasks.map(task => (
            <OngoingTaskCard
              key={task.id}
              title={task.title}
              subtitle={task.subtitle}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom + spacing['Spacing-5xl'] },
        ]}
      >
        <Button
          label="Save changes"
          onPress={() => navigation.goBack()}
          variant="primary"
          size="large"
          style={styles.saveButton}
          disabled={false} // Make it visible and active for now as requested
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
    paddingTop: spacing['Spacing-xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing['Spacing-5xl'],
  },
  sectionTitle: {
    ...typography.h0SemiBold,
    fontSize: moderateScale(16),
    color: colors.TextPrimaryDefault,
  },
  addTaskButton: {
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: spacing['Spacing-m'],
    backgroundColor: colors.StatesWhite,
  },
  addTaskText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
  tasksList: {
    gap: spacing['Spacing-xs'],
  },
  footer: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
    borderTopWidth: 1,
    borderTopColor: colors.StatesOutline,
  },
  saveButton: {
    width: '100%',
  },
});
