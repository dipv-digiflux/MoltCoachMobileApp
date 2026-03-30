import React, { type ReactElement } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Input, RequestAccessHeader } from '@/components';

import { useRequestAccess } from './hooks/useRequestAccess';
import styles from './RequestAccessScreen.styles';

export const RequestAccessScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    handleLogout,
    handleBookCall,
  } = useRequestAccess();

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
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Full Name"
                placeholder="e.g. Sarah Miller"
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  void onBlur();
                }}
                error={!!errors.fullName}
                errorMessage={errors.fullName?.message}
                required
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                placeholder="name@example.com"
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  void onBlur();
                }}
                error={!!errors.email}
                errorMessage={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                required
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Phone Number"
                placeholder="000 000 000"
                leftText="+971"
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  void onBlur();
                }}
                error={!!errors.phone}
                errorMessage={errors.phone?.message}
                keyboardType="numeric"
                maxLength={9}
                required
              />
            )}
          />

          <View style={styles.logoutCard}>
            <View style={styles.footerActionBox}>
              <View style={styles.footerDot} />
              <View style={styles.footerTextContainer}>
                <Text style={styles.footerTitle}>Need to make a change?</Text>
                <Text style={styles.footerSubText}>
                  Try logging out and signing in with another email.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  void handleLogout();
                }}
              >
                <Text style={styles.logoutLink}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Button
          label="Book a Call"
          onPress={() => {
            void handleSubmit(handleBookCall)();
          }}
          variant="primary"
          size="large"
          loading={isLoading}
          style={styles.submitButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
