import React, { useCallback, useState, type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Controller } from 'react-hook-form';

import { CalendarDaysIconSvg } from '@/assets/images';
import { DateSelectionBottomSheet } from '@/components';
import { Input } from '@/components/Input';
import { Switch } from '@/components/Switch';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale, radius, spacing, typography } from '@/theme';

import { type AddSessionsPackageContainerProps } from './AddSessionsPackageContainer.types';

const FORM_BG = '#F5F7F8';

export const AddSessionsPackageContainer = ({
  control,
  errors,
  showToggle = true,
}: AddSessionsPackageContainerProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const [dateSheetVisible, setDateSheetVisible] = useState<boolean>(false);

  const formatIsoToDisplay = useCallback((iso: string): string => {
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, (m ?? 1) - 1, d);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  }, []);

  return (
    <View style={styles.outer}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{translation.addSessionsPackageTitle}</Text>
        {showToggle ? (
          <Controller
            control={control}
            name="sessionsEnabled"
            render={({ field: { value, onChange } }) => (
              <Switch on={value} onChange={onChange} size="default" />
            )}
          />
        ) : null}
      </View>

      <Controller
        control={control}
        name="sessionsEnabled"
        render={({ field: { value: sessionsEnabled } }) =>
          sessionsEnabled ? (
            <View style={styles.formContent}>
              <Controller
                control={control}
                name="sessions.type"
                render={({ field: { value: sessionType, onChange } }) => (
                  <>
                    <View style={styles.chipRow}>
                      {[
                        'addSessionsPackageOnline',
                        'addSessionsPackagePhysical',
                      ].map(tabId => {
                        const isActive = tabId === sessionType;
                        const label =
                          translation[tabId as keyof typeof translation];
                        return (
                          <Pressable
                            key={tabId}
                            onPress={() => onChange(tabId)}
                            style={[
                              styles.chip,
                              isActive ? styles.chipActive : undefined,
                            ]}
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
                        <Controller
                          control={control}
                          name="sessions.total"
                          render={({
                            field: {
                              value: totalValue,
                              onChange: onTotalChange,
                            },
                          }) => (
                            <Input
                              label={
                                sessionType === 'addSessionsPackageOnline'
                                  ? translation.addSessionsPackageNumberOfMonths
                                  : translation.addSessionsPackageTotalSessions
                              }
                              value={totalValue}
                              onChangeText={onTotalChange}
                              placeholder="0"
                              keyboardType="number-pad"
                              inputContainerStyle={styles.inputBgStyle}
                              textInputStyle={{
                                color: colors.TextPrimaryStrong,
                              }}
                              error={!!errors.sessions?.total}
                              errorMessage={errors.sessions?.total?.message}
                            />
                          )}
                        />
                      </View>
                      <View style={styles.inputWrapper}>
                        {sessionType === 'addSessionsPackageOnline' ? (
                          <Controller
                            control={control}
                            name="sessions.startDate"
                            render={({
                              field: {
                                value: dateValue,
                                onChange: onDateChange,
                              },
                            }) => (
                              <>
                                <Input
                                  label={
                                    translation.addSessionsPackageStartDate
                                  }
                                  value={
                                    dateValue
                                      ? formatIsoToDisplay(dateValue)
                                      : ''
                                  }
                                  placeholder=""
                                  editable={false}
                                  rightIcon={
                                    <View style={styles.calendarIconWrap}>
                                      <CalendarDaysIconSvg
                                        width={iconScale(20)}
                                        height={iconScale(20)}
                                        color={colors.IconCalendarDefault}
                                      />
                                    </View>
                                  }
                                  containerPress={() =>
                                    setDateSheetVisible(true)
                                  }
                                  inputContainerStyle={styles.inputBgStyle}
                                  textInputStyle={{
                                    color: colors.TextPrimaryStrong,
                                  }}
                                  error={!!errors.sessions?.startDate}
                                  errorMessage={
                                    errors.sessions?.startDate?.message
                                  }
                                />
                                <DateSelectionBottomSheet
                                  visible={dateSheetVisible}
                                  onClose={() => setDateSheetVisible(false)}
                                  onDateSelect={iso => {
                                    onDateChange(iso);
                                    setDateSheetVisible(false);
                                  }}
                                  initialSelectedDate={dateValue}
                                />
                              </>
                            )}
                          />
                        ) : (
                          <Controller
                            control={control}
                            name="sessions.left"
                            render={({
                              field: {
                                value: leftValue,
                                onChange: onLeftChange,
                              },
                            }) => (
                              <Input
                                label={
                                  translation.addSessionsPackageSessionsLeft
                                }
                                value={leftValue}
                                onChangeText={onLeftChange}
                                placeholder="0"
                                keyboardType="number-pad"
                                inputContainerStyle={styles.inputBgStyle}
                                textInputStyle={{
                                  color: colors.TextPrimaryStrong,
                                }}
                                error={!!errors.sessions?.left}
                                errorMessage={errors.sessions?.left?.message}
                              />
                            )}
                          />
                        )}
                      </View>
                    </View>
                  </>
                )}
              />
            </View>
          ) : (
            <></>
          )
        }
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
    backgroundColor: colors.StatesWhite,
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
  formContent: {
    width: '100%',
    gap: spacing['Spacing-5_5xl'],
  },
  chipRow: {
    flexDirection: 'row',
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
  inputBgStyle: {
    backgroundColor: FORM_BG,
    borderWidth: 0,
  },
});
