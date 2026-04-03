import React, { type ReactElement, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Input, PageHeaderScrollView, Radio, Button } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography, moderateScale } from '@/theme';
import { getInitials } from '@/utils/avatar';
import { formatFullName } from '@/utils/stringUtils';

import { DeleteAccountBottomSheet } from './components/DeleteAccountBottomSheet';

export const ProfileSettingsScreen = (): ReactElement => {
  const translations = useAppSelector(state => state.translation);
  const profile = useAppSelector(state => state.booking.profile);

  const [name, setName] = useState(
    formatFullName(profile?.first_name, profile?.last_name) || 'John smith',
  );
  const [mobile, setMobile] = useState(
    `${profile?.country_code || ''} ${profile?.phone_number || ''}`.trim() ||
      '+1 555 123 4567',
  );
  const [email, setEmail] = useState(
    profile?.email || 'John.smith@newmail.com',
  );
  const [dob, setDob] = useState('12 Jan 1990');
  const [gender, setGender] = useState('Male');
  const [sameAsWhatsapp, setSameAsWhatsapp] = useState(true);
  const [isDeleteSheetVisible, setIsDeleteSheetVisible] = useState(false);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: translations.profileSettingsHeaderTitle }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.scrollContent}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarInitials}>{getInitials(name)}</Text>
            </View>
            <Pressable style={styles.changeImageButton}>
              <Text style={styles.changeImageText}>
                {translations.profileSettingsChangeImage}
              </Text>
            </Pressable>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Input
              label={translations.profileSettingsNameLabel}
              value={name}
              onChangeText={setName}
            />
            <Input
              label={translations.profileSettingsMobileLabel}
              value={mobile}
              onChangeText={setMobile}
              rightButton={translations.profileSettingsEditButton}
              onRightButtonPress={() => console.log('Edit mobile')}
            />
            <Input
              label={translations.profileSettingsEmailLabel}
              value={email}
              onChangeText={setEmail}
              rightButton={translations.profileSettingsEditButton}
              onRightButtonPress={() => console.log('Edit email')}
            />
            <Input
              label={translations.profileSettingsDobLabel}
              value={dob}
              onChangeText={setDob}
            />
            <Input
              label={translations.profileSettingsGenderLabel}
              value={gender}
              onChangeText={setGender}
            />
          </View>

          {/* Radio Section */}
          <View style={styles.radioContainer}>
            <Radio
              selected={sameAsWhatsapp}
              onPress={() => setSameAsWhatsapp(!sameAsWhatsapp)}
              label={translations.profileSettingsWhatsappLabel}
            />
          </View>

          {/* Delete Account Footer */}
          <View style={styles.footer}>
            <Button
              label={translations.profileSettingsDeleteAccount}
              variant="destructive-text"
              onPress={() => setIsDeleteSheetVisible(true)}
              style={styles.deleteButton}
            />
          </View>
        </View>
      </PageHeaderScrollView>

      <DeleteAccountBottomSheet
        visible={isDeleteSheetVisible}
        onClose={() => setIsDeleteSheetVisible(false)}
        onDelete={() => {
          console.log('Account deleted');
          setIsDeleteSheetVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentContainerStyle: {
    paddingBottom: spacing['Spacing-16xl'],
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-10xl'],
    gap: spacing['Spacing-12xl'],
  },
  avatarSection: {
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  avatarContainer: {
    width: moderateScale(100),
    height: moderateScale(100),
    backgroundColor: '#1C1C1E', // Dark background from mockup
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(4),
  },
  avatarInitials: {
    ...typography.h2Bold,
    color: colors.StatesWhite,
    fontSize: moderateScale(48),
  },
  changeImageButton: {
    paddingVertical: spacing['Spacing-sm'],
  },
  changeImageText: {
    ...typography.b1Medium,
    color: colors.PrimaryMain,
  },
  formContainer: {
    gap: spacing['Spacing-10xl'],
  },
  radioContainer: {
    paddingVertical: spacing['Spacing-m'],
  },
  footer: {
    marginTop: spacing['Spacing-10xl'],
    alignItems: 'center',
  },
  deleteButton: {
    // Basic styling for the delete button if variant doesn't handle everything
  },
});
