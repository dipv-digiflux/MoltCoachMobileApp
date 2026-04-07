import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BottomSheet } from '@/components';
import { colors, spacing, typography } from '@/theme';

import { type TermsBottomSheetProps } from './TermsBottomSheet.types';

export const TermsBottomSheet = ({
  visible,
  onClose,
}: TermsBottomSheetProps): React.ReactElement => {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      variant="fullscreen"
      header={{ title: 'Terms & Conditions', showCloseButton: true }}
    >
      <View style={styles.content}>
        <Text style={styles.paragraph}>
          Molt Trading LLC, is a company having its registered office at P.O.Box
          124584, Dubai, UAE. In using the delicut.ae website and services of
          Molt Trading LLC, as a registered user or visitor, you are deemed to
          have accepted the Terms and Conditions of the agreement listed below.
          This Agreement for the Terms and Conditions of use of the Company’s
          Website (hereinafter referred to as ‘Agreement’) describes certain
          terms and conditions to access and use the Website of the Company,
          products and services (hereinafter referred to as the “End User”,
          “You” or “Your”).
        </Text>
        <Text style={styles.paragraph}>
          Molt TRADING L.L.C” maintains the https:// Molte.com/ Website
          (“Site”). The United Arab Emirates is our country of domicile and
          stipulates that the governing law is the local law. All disputes
          arising in connection therewith shall be heard only by a court of
          competent jurisdiction in U.A.E.
        </Text>

        <Text style={styles.sectionHeading}>
          1. TERMS OF USE OF WEBSITE, PRODUCTS AND SERVICES
        </Text>

        <Text style={styles.subHeading}>ACCEPTANCE</Text>

        <Text style={styles.paragraph}>
          Please read these terms and conditions carefully. By accessing the
          website, its products, information, tools, features and services, you
          agree to be bound by the terms and conditions below irrespective of
          whether you are a member or visitor. The company reserves the right to
          alter, amend and modify these terms and conditions at its sole
          discretion at any time. All such amendments will be duly updated on
          this website. If you are not agreeable to the terms and conditions,
          you are not permitted to access
        </Text>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-10xl'],
  },
  sectionHeading: {
    ...typography.h10Bold,
    color: colors.TextPrimaryDefault,
    marginTop: spacing['Spacing-6xl'],
    marginBottom: spacing['Spacing-2xl'],
    textTransform: 'uppercase',
  },
  subHeading: {
    ...typography.b1Bold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-2xl'],
    textTransform: 'uppercase',
  },
  paragraph: {
    ...typography.bodySmall1TallRegular,
    color: colors.TextSecondaryDefault,
    marginBottom: spacing['Spacing-xl'],
  },
});
