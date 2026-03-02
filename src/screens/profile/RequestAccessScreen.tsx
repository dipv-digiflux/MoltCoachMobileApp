import React, { useState, type ReactElement } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Button,
  Input,
  RequestAccessHeader,
  RequestAccessStatus,
} from '@/components';
import { colors, spacing } from '@/theme';

export const RequestAccessScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleBookCall = (): void => {
    // TODO: navigate to booking or open link
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <RequestAccessHeader />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Input
            label="Full Name"
            placeholder="e.g. Sarah Miller"
            value={fullName}
            onChangeText={setFullName}
          />
          <Input
            label="Email"
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <RequestAccessStatus />
        </ScrollView>

        <Button
          label="Book a call"
          onPress={handleBookCall}
          variant="primary"
          size="large"
          style={{ alignSelf: 'stretch', marginTop: spacing['Spacing-5xl'] }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  headerWrap: {
    // Fixed at top; no flex
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-11xl'],
    gap: spacing['Spacing-11xl'],
  },
  footer: {
    paddingTop: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-5xl'],
  },
});
