import React, { useEffect, useState, type ReactElement } from 'react';

import { BottomSheet } from '@/components';
import { DateSelectionCalendar } from '@/components/DateSelectionCalendar';

import type { DateSelectionBottomSheetProps } from '@/types/components.types';

export type { DateSelectionBottomSheetProps };

export const DateSelectionBottomSheet = ({
  visible,
  onClose,
  initialSelectedDate,
  minDate,
  maxDate,
  onDateSelect,
  headerTitle = 'Select date',
  variant = 'form',
  snapPoints,
  initialSnapIndex,
  stickyHeader,
  stickyFooter,
}: DateSelectionBottomSheetProps): ReactElement => {
  const [activeDate, setActiveDate] = useState<string | undefined>(
    initialSelectedDate,
  );

  useEffect(() => {
    if (!visible) {
      return;
    }
    setActiveDate(initialSelectedDate);
  }, [visible, initialSelectedDate]);

  const handleConfirm = (): void => {
    if (!activeDate) return;
    onDateSelect(activeDate);
    onClose();
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      variant={variant}
      snapPoints={snapPoints}
      initialSnapIndex={initialSnapIndex}
      stickyHeader={stickyHeader}
      stickyFooter={stickyFooter}
      header={{ title: headerTitle }}
      footer={{
        primaryLabel: 'Select',
        primaryDisabled: !activeDate,
        onPrimaryPress: handleConfirm,
        secondaryLabel: 'Cancel',
        onSecondaryPress: onClose,
      }}
    >
      <DateSelectionCalendar
        initialSelectedDate={initialSelectedDate}
        minDate={minDate}
        maxDate={maxDate}
        showInlineSelectButton={false}
        onActiveDateChange={setActiveDate}
      />
    </BottomSheet>
  );
};
