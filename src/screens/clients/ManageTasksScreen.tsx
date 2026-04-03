import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { format, parseISO } from 'date-fns';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Button,
  DeleteTaskBottomSheet,
  OngoingTaskCard,
  PageHeader,
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteTaskThunk, fetchTasksThunk } from '@/store/thunks/clientThunks';
import { colors, moderateScale, spacing, typography } from '@/theme';

import type { TaskDetail } from '@/types/api.types';
import type { AppStackParamList } from '@/types/navigation.types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export const ManageTasksScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<
  AppStackParamList,
  'ManageTasks'
>): React.ReactElement => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { clientId, clientName } = route.params;

  const { tasks, operations } = useAppSelector(state => state.client);
  const isFetching = operations.fetchTasks.status === 'loading';

  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    if (clientId) {
      void dispatch(fetchTasksThunk(clientId));
    }
  }, [clientId, dispatch]);

  const handleDeleteTask = (taskId: string): void => {
    setSelectedTaskId(taskId);
    setIsDeleteVisible(true);
  };

  const confirmDelete = (): void => {
    if (selectedTaskId && clientId) {
      void dispatch(deleteTaskThunk(selectedTaskId, clientId));
      setIsDeleteVisible(false);
      setSelectedTaskId(null);
    }
  };

  const getTaskSubtitle = (task: TaskDetail): string => {
    const creatorText = task.creator === 'coach' ? 'you' : 'client';
    const frequency =
      task.frequency.charAt(0).toUpperCase() + task.frequency.slice(1);

    if (task.task_type === 'one-time' && task.end_date) {
      return `Till ${format(
        parseISO(task.end_date),
        'd MMMM yyyy',
      )} • By ${creatorText}`;
    }

    let freqDetail = '';
    if (
      task.frequency === 'weekly' &&
      task.schedule?.days_of_week &&
      task.schedule.days_of_week.length > 0
    ) {
      freqDetail = ` (${task.schedule.days_of_week.join(', ')})`;
    } else if (task.frequency === 'monthly' && task.schedule?.day_of_month) {
      freqDetail = ` (Day ${task.schedule.day_of_month})`;
    } else if (
      task.frequency === 'quarterly' &&
      task.schedule?.quarters &&
      task.schedule.quarters.length > 0
    ) {
      freqDetail = ` (Q${task.schedule.quarters.join(', ')})`;
    }

    return `${frequency}${freqDetail} • By ${creatorText}`;
  };

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
            onPress={() =>
              navigation.navigate('CreateTask', { clientId, clientName })
            }
            style={styles.addTaskButton}
          >
            <Text style={styles.addTaskText}>Add new task +</Text>
          </Pressable>
        </View>

        <View style={styles.tasksList}>
          {isFetching ? (
            <ActivityIndicator color={colors.MatrixMain} />
          ) : (
            tasks.map(task => (
              <OngoingTaskCard
                key={task._id}
                title={task.task}
                subtitle={getTaskSubtitle(task)}
                onEdit={() =>
                  navigation.navigate('CreateTask', {
                    clientId,
                    clientName,
                    task,
                  })
                }
                onDelete={() => handleDeleteTask(task._id)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <DeleteTaskBottomSheet
        isVisible={isDeleteVisible}
        onClose={() => setIsDeleteVisible(false)}
        onDelete={confirmDelete}
      />

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
