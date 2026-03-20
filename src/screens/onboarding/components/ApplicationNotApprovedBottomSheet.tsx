import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { ShieldIconSvg } from '@/assets/images';
import {
  BottomSheet,
  WhyNotApprovedInfo,
  ApplicationNotApprovedMessage,
} from '@/components';
import { clearAuth } from '@/services/authStorage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { setNotApprovedVisible } from '@/store/slices/bookingSlice';
import { colors, spacing } from '@/theme';

const SHIELD_ICON_SIZE = 26;
const ICON_CONTAINER_RADIUS = 26;

export const ApplicationNotApprovedBottomSheet = (): ReactElement => {
  const dispatch = useAppDispatch();
  const visible = useAppSelector(state => state.booking.notApprovedVisible);

  const handleClose = (): void => {
    dispatch(setNotApprovedVisible(false));
    dispatch(logout());
    void clearAuth();
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={handleClose}
      header={{
        title: '',
        showCloseButton: true,
      }}
      footer={{
        primaryLabel: 'Contact Support',
        onPrimaryPress: () => {},
        secondaryLabel: 'Read our Guidelines',
        onSecondaryPress: () => {},
      }}
    >
      <View style={styles.content}>
        <View style={styles.shieldBlock}>
          <ShieldIconSvg
            width={SHIELD_ICON_SIZE}
            height={SHIELD_ICON_SIZE}
            color={colors.FeedbackWarningIcon}
          />
        </View>
        <ApplicationNotApprovedMessage
          title="Application Not Approved"
          description="After careful review of your profile and verification call, we are unable to approve your coach application at this time."
        />
        <WhyNotApprovedInfo />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing['Spacing-xl'],
    gap: spacing['Spacing-10xl'],
  },
  shieldBlock: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: colors.FeedbackWarningSurface,
    borderRadius: ICON_CONTAINER_RADIUS,
    padding: spacing['Spacing-4xl'],
  },
});
