import React, {
  useCallback,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CalendarDaysIconSvg } from '@/assets/images';
import { DateSelectionBottomSheet } from '@/components';
import { Input } from '@/components/Input';
import { Switch } from '@/components/Switch';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale, radius, spacing, typography } from '@/theme';

const SESSION_TYPE_KEYS = [
  'addSessionsPackageOnline',
  'addSessionsPackagePhysical',
] as const;

type SessionTypeId = (typeof SESSION_TYPE_KEYS)[number];

export interface AddSessionsPackageContainerProps {
  /** When true, shows the sessions toggle next to the title. @default true */
  showToggle?: boolean;
}

export const AddSessionsPackageContainer = ({
  showToggle = true,
}: AddSessionsPackageContainerProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const [sessionType, setSessionType] = useState<SessionTypeId>(
    'addSessionsPackageOnline',
  );
  const [totalSessions, setTotalSessions] = useState<string>('');
  const [sessionsLeft, setSessionsLeft] = useState<string>('');
  const [sessionsEnabled, setSessionsEnabled] = useState<boolean>(false);
  const [startDateIso, setStartDateIso] = useState<string | undefined>();
  const [dateSheetVisible, setDateSheetVisible] = useState<boolean>(false);

  const formatIsoToDisplay = useCallback((iso: string): string => {
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, (m ?? 1) - 1, d);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  }, []);

  const startDateDisplay = useMemo(
    () => (startDateIso ? formatIsoToDisplay(startDateIso) : ''),
    [startDateIso, formatIsoToDisplay],
  );

  const handleTotalSessionsChange = useCallback((text: string): void => {
    setTotalSessions(text);
  }, []);

  const handleSessionsLeftChange = useCallback((text: string): void => {
    setSessionsLeft(text);
  }, []);

  const openDateSheet = useCallback((): void => {
    setDateSheetVisible(true);
  }, []);

  const closeDateSheet = useCallback((): void => {
    setDateSheetVisible(false);
  }, []);

  const handleDateSelect = useCallback((iso: string): void => {
    setStartDateIso(iso);
    setDateSheetVisible(false);
  }, []);

  const isOnline = sessionType === 'addSessionsPackageOnline';

  const firstLabel = isOnline
    ? translation.addSessionsPackageNumberOfMonths
    : translation.addSessionsPackageTotalSessions;
  const secondLabel = isOnline
    ? translation.addSessionsPackageStartDate
    : translation.addSessionsPackageSessionsLeft;
  const secondValue = isOnline ? startDateDisplay : sessionsLeft;
  const secondOnChange = isOnline ? (): void => {} : handleSessionsLeftChange;

  return (
    <View style={styles.outer}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{translation.addSessionsPackageTitle}</Text>
        {showToggle ? (
          <Switch
            on={sessionsEnabled}
            onChange={setSessionsEnabled}
            size="default"
          />
        ) : null}
      </View>

      <View style={styles.chipRow}>
        {SESSION_TYPE_KEYS.map(tabId => {
          const isActive = tabId === sessionType;
          const label = translation[tabId];
          return (
            <Pressable
              key={tabId}
              onPress={() => setSessionType(tabId)}
              style={[styles.chip, isActive ? styles.chipActive : undefined]}
            >
              <Text
                style={[
                  styles.chipText,
                  isActive ? styles.chipTextActive : undefined,
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.inputsRow}>
        <View style={styles.inputWrapper}>
          <Input
            label={firstLabel}
            value={totalSessions}
            onChangeText={handleTotalSessionsChange}
            placeholder="0"
            keyboardType="number-pad"
            inputContainerStyle={{
              backgroundColor: '#F5F7F8',
            }}
            textInputStyle={[{ color: colors.TextPrimaryStrong }]}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label={secondLabel}
            value={secondValue}
            onChangeText={secondOnChange}
            placeholder={isOnline ? '' : '0'}
            keyboardType={isOnline ? 'default' : 'number-pad'}
            editable={!isOnline}
            rightIcon={
              isOnline ? (
                <View style={styles.calendarIconWrap}>
                  <CalendarDaysIconSvg
                    width={iconScale(20)}
                    height={iconScale(20)}
                    color={colors.IconCalendarDefault}
                  />
                </View>
              ) : undefined
            }
            containerPress={isOnline ? openDateSheet : undefined}
            inputContainerStyle={{
              backgroundColor: '#F5F7F8',
            }}
            textInputStyle={[
              {
                color: colors.TextPrimaryStrong,
              },
            ]}
          />
        </View>
      </View>

      <DateSelectionBottomSheet
        visible={dateSheetVisible}
        onClose={closeDateSheet}
        onDateSelect={handleDateSelect}
        initialSelectedDate={startDateIso}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: spacing['Spacing-4xl'],
    gap: spacing['Spacing-5_5xl'],
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: radius.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    ...typography.bodySmall1TallSemiBold,
    color: colors.TextPrimaryStrong,
  },
  chipRow: {
    flexDirection: 'row',
    // paddingHorizontal: spacing['Spacing-3xl'],
    gap: spacing['Spacing-3xl'],
  },
  chip: {
    paddingVertical: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-3xl'],
    borderRadius: radius.xs,
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDefault,
  },
  chipActive: {
    backgroundColor: colors.StatesFill2,
    borderWidth: 1,
    borderColor: colors.TextPrimaryDefault,
  },
  chipText: {
    ...typography.bodySmall1SemiBold,
    color: colors.IconTertiarySubtle,
  },
  chipTextActive: {
    color: colors.TextPrimaryStrong,
  },
  inputsRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-3xl'],
    width: '100%',
  },
  inputWrapper: {
    flex: 1,
  },
  calendarIconWrap: {
    paddingRight: spacing['Spacing-xl'],
  },
});
