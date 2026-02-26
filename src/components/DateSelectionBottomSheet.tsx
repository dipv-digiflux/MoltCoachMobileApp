import React, { useEffect, useState, type ReactElement } from 'react';

import { BottomSheet, type BottomSheetProps } from '@/components';
import { DateSelectionCalendar } from '@/components/DateSelectionCalendar';

export type DateSelectionBottomSheetProps = {
  /** Controls visibility of the bottom sheet. */
  visible: boolean;
  /** Called when the sheet should close. */
  onClose: () => void;
  /** Pre-selected date in ISO format 'YYYY-MM-DD'. */
  initialSelectedDate?: string;
  /** Minimum selectable date in ISO format 'YYYY-MM-DD'. */
  minDate?: string;
  /** Maximum selectable date in ISO format 'YYYY-MM-DD'. */
  maxDate?: string;
  /**
   * Called when user confirms selection via the sheet footer.
   * Receives the final selected date in ISO format 'YYYY-MM-DD'.
   */
  onDateSelect: (date: string) => void;
  /** Optional header override; defaults to \"Select date\". */
  headerTitle?: string;
} & Pick<
  BottomSheetProps,
  | 'variant'
  | 'snapPoints'
  | 'initialSnapIndex'
  | 'stickyHeader'
  | 'stickyFooter'
>;

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
