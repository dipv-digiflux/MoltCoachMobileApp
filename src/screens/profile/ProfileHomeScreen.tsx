import React, { useState, type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Checkbox } from '@/components/Checkbox';
import { PageHeaderScrollView } from '@/components/PageHeaderScrollView';
import { Radio } from '@/components/Radio';
import { Switch } from '@/components/Switch';
import { moderateScale, colors, spacing, typography } from '@/theme';

const TAB_BAR_HEIGHT = moderateScale(72);

export const ProfileHomeScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const scrollPaddingBottom =
    insets.bottom + spacing['Spacing-15xl'] + TAB_BAR_HEIGHT;

  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>(
    'monthly',
  );
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [darkModeOn, setDarkModeOn] = useState(false);

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        style={styles.scrollView}
        contentContainerStyle={[{ paddingBottom: scrollPaddingBottom }]}
        showsVerticalScrollIndicator={false}
        header={{ title: 'Profile', hideBackButton: true }}
        bounces={false}
      >
        <View style={styles.scrollContent}>
          <Text style={styles.sectionLabel}>Checkbox</Text>
          <Checkbox
            label="Accept terms and conditions"
            checked={checkboxChecked}
            onChange={setCheckboxChecked}
          />
          <Checkbox
            label="With description"
            description="Optional helper text below the label."
            checked={checkboxChecked}
            onChange={setCheckboxChecked}
          />
          <Checkbox label="Mixed (indeterminate)" mixed disabled />
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Disabled checked" checked disabled />
          <Checkbox
            label="Small size"
            size="small"
            checked={checkboxChecked}
            onChange={setCheckboxChecked}
          />

          <Text style={styles.sectionLabel}>Radio</Text>
          <Radio
            label="Monthly plan"
            description="Billed every month"
            selected={selectedPlan === 'monthly'}
            onPress={() => setSelectedPlan('monthly')}
          />
          <Radio
            label="Yearly plan"
            description="Billed once per year"
            selected={selectedPlan === 'yearly'}
            onPress={() => setSelectedPlan('yearly')}
          />
          <Radio label="Disabled unselected" disabled />
          <Radio label="Disabled selected" selected disabled />
          <Radio
            label="Small size"
            size="small"
            selected={selectedPlan === 'monthly'}
            onPress={() => setSelectedPlan('monthly')}
          />

          <Text style={styles.sectionLabel}>Switch</Text>
          <Switch
            label="Notifications"
            on={notificationsOn}
            onChange={setNotificationsOn}
          />
          <Switch
            label="Dark mode"
            description="Use dark theme"
            on={darkModeOn}
            onChange={setDarkModeOn}
          />
          <Switch label="Disabled off" disabled />
          <Switch label="Disabled on" on disabled />
          <Switch
            label="Small size"
            size="small"
            on={darkModeOn}
            onChange={setDarkModeOn}
          />
        </View>
      </PageHeaderScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    gap: spacing['Spacing-3xl'],
  },
  title: {
    ...typography.h6Bold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-3xl'],
  },
  sectionLabel: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryHover,
    marginTop: spacing['Spacing-11xl'],
    marginBottom: spacing['Spacing-xl'],
  },
});
