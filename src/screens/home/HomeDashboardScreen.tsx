import React, { useRef, useState, type ReactElement } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CurvedHeader } from '@/components/CurvedHeader';
import { Input } from '@/components/Input';
import { moderateScale, spacing, typography, colors } from '@/theme';

const TAB_BAR_HEIGHT = moderateScale(72);

export const HomeDashboardScreen = (): ReactElement => {
  const [filledValue, setFilledValue] = useState('Filled value');
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const scrollPaddingBottom =
    insets.bottom + spacing['Spacing-15xl'] + TAB_BAR_HEIGHT;

  return (
    <View style={styles.container}>
      <CurvedHeader>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={insets.top}
        >
          <ScrollView
            ref={scrollRef}
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: scrollPaddingBottom },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Input Boxes</Text>

            <Text style={styles.sectionLabel}>
              1. Default (label + placeholder)
            </Text>
            <Input label="Email" placeholder="you@example.com" />

            <Text style={styles.sectionLabel}>2. With label hint</Text>
            <Input
              label="Nickname"
              labelHint="(optional)"
              placeholder="Add a nickname"
            />

            <Text style={styles.sectionLabel}>3. Required</Text>
            <Input label="Email" required placeholder="you@example.com" />

            <Text style={styles.sectionLabel}>4. With info icon</Text>
            <Input
              label="Code"
              showInfoIcon
              onInfoPress={() => {}}
              placeholder="Tap (i) for help"
            />

            <Text style={styles.sectionLabel}>5. Filled (with value)</Text>
            <Input
              label="Name"
              value={filledValue}
              onChangeText={setFilledValue}
              placeholder="Enter name"
            />

            <Text style={styles.sectionLabel}>6. With helper text</Text>
            <Input
              label="Username"
              placeholder="Choose a username"
              helperText="Visible to other users."
            />

            <Text style={styles.sectionLabel}>7. Error state</Text>
            <Input
              label="Email"
              required
              error
              errorMessage="Please enter a valid email."
              placeholder="you@example.com"
            />

            <Text style={styles.sectionLabel}>8. Disabled</Text>
            <Input label="Read only" value="This cannot be edited." disabled />

            <Text style={styles.sectionLabel}>9. Left text add-on</Text>
            <Input label="URL" leftText="https://" placeholder="example.com" />

            <Text style={styles.sectionLabel}>10. Right text add-on</Text>
            <Input label="Amount" placeholder="0.00" rightText="USD" />

            <Text style={styles.sectionLabel}>11. Right button</Text>
            <Input
              label="Code"
              placeholder="Enter code"
              rightButton="Apply"
              onRightButtonPress={() => {}}
            />

            <Text style={styles.sectionLabel}>12. Password (secure)</Text>
            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry
            />

            <Text style={styles.sectionLabel}>13. With max length</Text>
            <Input
              label="Short code"
              maxLength={10}
              placeholder="Max 10 characters"
              helperText="10 characters maximum"
            />

            {/* <Text style={styles.sectionLabel}>14. With left icon</Text>
            <Input
              label="Search"
              placeholder="Search..."
              onFocus={scrollToBottomWhenFocused}
              leftIcon={
                <SearchIconSvg
                  width={SEARCH_ICON_SIZE}
                  height={SEARCH_ICON_SIZE}
                />
              }
            />

            <Text style={styles.sectionLabel}>15. With right icon</Text>
            <Input
              label="Search"
              placeholder="Search..."
              onFocus={scrollToBottomWhenFocused}
              rightIcon={
                <SearchIconSvg
                  width={SEARCH_ICON_SIZE}
                  height={SEARCH_ICON_SIZE}
                />
              }
            /> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </CurvedHeader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...typography.h6Bold,
    color: colors.TextPrimaryDefault,
  },
  sectionLabel: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryHover,
    marginTop: spacing['Spacing-11xl'],
    marginBottom: spacing['Spacing-xl'],
  },
  content: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  skipButton: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-2xl'],
    borderRadius: 20,
    backgroundColor: colors.StatesFill2,
  },
  skipButtonPressed: {
    opacity: 0.9,
  },
  skipLabel: {
    ...typography.b1Regular,
    color: colors.PrimaryMain,
  },
  logoWrap: {
    marginBottom: spacing['Spacing-6xl'],
  },
  logo: {
    width: 120,
    height: 40,
  },
  actions: {
    marginTop: spacing['Spacing-10xl'],
    gap: spacing['Spacing-xl'],
  },
});
