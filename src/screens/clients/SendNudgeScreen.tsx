// ════════════════════════════════════════════════
// FILE: SendNudgeScreen.tsx
// ════════════════════════════════════════════════

// ─── IMPORTS ───────────────────────────────────────────────
import React, {
  type ReactElement,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  Button,
  PageHeaderScrollView,
  LiquidFooter,
  QuickNudges,
} from '@/components';
import { NudgeItem } from '@/components/clients/QuickNudges.types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { sendNudgeThunk } from '@/store/thunks';
import { colors } from '@/theme';
import { AppStackParamList } from '@/types/navigation.types';
import { showErrorToast } from '@/utils/toast';

export const SendNudgeScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<AppStackParamList, 'SendNudge'>): ReactElement => {
  // ─── STATE ─────────────────────────────────────────────────
  const [nudges, setNudges] = useState<NudgeItem[]>([
    {
      id: '1',
      icon: '👣',
      message:
        "Hey Maria! Noticed you're a bit behind on steps today. Try to fit in a quick 15-minute walk this evening!",
      selected: true,
    },
    {
      id: '2',
      icon: '🍽️',
      message:
        'Friendly reminder to log your meals! It helps us stay on track with your fat loss goal.',
      selected: true,
    },
    {
      id: '3',
      icon: '🔥',
      message:
        "You're doing great, just a gentle push to keep up the momentum for this week's plan.",
      selected: false,
    },
  ]);

  // ─── REFS & MEMOS ──────────────────────────────────────────
  const params = route.params;
  const clientId = params?.clientId;
  const dispatch = useAppDispatch();
  const inviteLinks = useAppSelector(state => state.client.inviteLinks);
  const nudgeOperation = useAppSelector(
    state => state.client.operations.sendNudge,
  );

  const invite = useMemo(
    () => inviteLinks.find(link => String(link?._id) === String(clientId)),
    [inviteLinks, clientId],
  );

  const clientName = useMemo(() => {
    if (!invite) return '';
    const capitalize = (str: string): string =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return [invite.invitee?.first_name, invite.invitee?.last_name]
      .filter(Boolean)
      .map(name => capitalize(name as string))
      .join(' ');
  }, [invite]);

  const toggleNudge = useCallback((id: string): void => {
    setNudges(prev =>
      prev.map(nudge =>
        nudge.id === id ? { ...nudge, selected: !nudge.selected } : nudge,
      ),
    );
  }, []);

  const onSendNudge = useCallback(async (): Promise<void> => {
    const selectedMessages = nudges
      .filter(nudge => nudge.selected)
      .map(nudge => nudge.message);

    if (!clientId) {
      showErrorToast('Customer ID is missing');
      return;
    }

    try {
      const response = await dispatch(
        sendNudgeThunk(
          {
            customer_id: invite?.invitee_id || '',
            text: selectedMessages,
          },
          'text',
        ),
      );

      if (response && response.status) {
        navigation.navigate('NudgeSent', {
          clientId: clientId,
          clientName: clientName || 'Client',
          messages: selectedMessages,
        });
      }
    } catch (error) {
      console.error('Failed to send nudge:', error);
    }
  }, [nudges, clientId, dispatch, navigation, clientName, invite?.invitee_id]);

  // ─── HELPERS ───────────────────────────────────────────────
  const isLoading = nudgeOperation.status === 'loading';
  const selectedMessagesCount = nudges.filter(nudge => nudge.selected).length;

  // ─── RENDER ────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{
          title: 'Send Nudge',
          onPressBack: () => navigation.goBack(),
        }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <QuickNudges
          nudges={nudges}
          onToggleNudge={toggleNudge}
          invite={invite}
        />
      </PageHeaderScrollView>

      <LiquidFooter showTopBorder>
        <Button
          label="Send Nudge"
          variant="primary"
          size="large"
          fullWidth
          onPress={() => {
            void onSendNudge();
          }}
          loading={isLoading}
          disabled={selectedMessagesCount === 0}
        />
      </LiquidFooter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
