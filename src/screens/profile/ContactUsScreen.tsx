import React, { type ReactElement, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ContactBookSvg, ContactSvg } from '@/assets/images';
import { PageHeaderScrollView, SettingsSection } from '@/components';
import { colors, iconScale, spacing, typography } from '@/theme';

import { EmailBottomSheet } from './components/EmailBottomSheet';
import { WhatsAppBottomSheet } from './components/WhatsAppBottomSheet';

import type { SettingsRowItem } from '@/components/Settings/Settings.types';

export const ContactUsScreen = (): ReactElement => {
  const [isWhatsAppSheetVisible, setIsWhatsAppSheetVisible] =
    React.useState(false);
  const [isEmailSheetVisible, setIsEmailSheetVisible] = React.useState(false);

  const handleWhatsAppPress = useCallback(() => {
    setIsWhatsAppSheetVisible(true);
  }, []);

  const handleEmailPress = useCallback(() => {
    setIsEmailSheetVisible(true);
  }, []);

  const contactItems: SettingsRowItem[] = useMemo(
    () => [
      {
        id: 'whatsapp',
        label: 'Chat on WhatsApp',
        subtitle: 'Get quick support from our team',
        icon: (
          <ContactSvg
            width={iconScale(24)}
            height={iconScale(24)}
            color={colors.IconPrimaryDefault}
          />
        ),
        type: 'link',
        onPress: handleWhatsAppPress,
      },
      {
        id: 'email',
        label: 'Email support',
        subtitle: 'support@molt.com',
        icon: (
          <ContactBookSvg
            width={iconScale(24)}
            height={iconScale(24)}
            color={colors.IconPrimaryDefault}
          />
        ),
        type: 'link',
        onPress: handleEmailPress,
      },
    ],
    [handleWhatsAppPress, handleEmailPress],
  );

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: 'Contact us' }}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.content}>
          <Text style={styles.introText}>
            Reach out to our support team. We usually respond within a few
            hours.
          </Text>

          <SettingsSection
            items={contactItems}
            containerStyle={styles.section}
            title=""
          />
        </View>
      </PageHeaderScrollView>

      <WhatsAppBottomSheet
        visible={isWhatsAppSheetVisible}
        onClose={() => setIsWhatsAppSheetVisible(false)}
      />
      <EmailBottomSheet
        visible={isEmailSheetVisible}
        onClose={() => setIsEmailSheetVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentContainer: {
    // paddingBottom: spacing['Spacing-16xl'],
  },
  content: {
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  introText: {
    ...typography.bodySmall1TallRegular,
    color: colors.TextSecondaryDefault,
    marginBottom: spacing['Spacing-10xl'],
    marginTop: spacing['Spacing-m'],
  },
  section: {
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDefault,
    backgroundColor: colors.StatesWhite,
    borderRadius: spacing['Spacing-m'],
    overflow: 'hidden',
  },
});
