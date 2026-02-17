import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { PageHeaderScrollView } from '@/components/PageHeaderScrollView';
import { moderateScale, colors, spacing, typography } from '@/theme';

const TAB_BAR_HEIGHT = moderateScale(72);

export const MealsHomeScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const scrollPaddingBottom =
    insets.bottom + spacing['Spacing-15xl'] + TAB_BAR_HEIGHT;

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        style={styles.scrollView}
        contentContainerStyle={[{ paddingBottom: scrollPaddingBottom }]}
        showsVerticalScrollIndicator={false}
        header={{ title: 'Buttons', hideBackButton: true }}
        bounces={false}
      >
        <View style={styles.scrollContent}>
          <Text style={styles.sectionLabel}>1. Primary (default)</Text>
          <Button
            label="Primary"
            onPress={() => {}}
            style={styles.fullWidthButton}
          />

          <Text style={styles.sectionLabel}>2. Secondary</Text>
          <Button
            label="Secondary"
            variant="secondary"
            onPress={() => {}}
            style={styles.fullWidthButton}
          />

          <Text style={styles.sectionLabel}>3. Minimal</Text>
          <Button
            label="Minimal"
            variant="minimal"
            onPress={() => {}}
            style={styles.fullWidthButton}
          />

          <Text style={styles.sectionLabel}>4. Destructive</Text>
          <Button
            label="Delete"
            variant="destructive"
            onPress={() => {}}
            style={styles.fullWidthButton}
          />

          <Text style={styles.sectionLabel}>5. Small size</Text>
          <Button
            label="Small"
            size="small"
            onPress={() => {}}
            style={styles.fullWidthButton}
          />

          <Text style={styles.sectionLabel}>6. Large size</Text>
          <Button
            label="Large"
            size="large"
            onPress={() => {}}
            style={styles.fullWidthButton}
          />

          <Text style={styles.sectionLabel}>7. Loading</Text>
          <Button
            label="Saving…"
            loading
            onPress={() => {}}
            style={styles.fullWidthButton}
          />

          <Text style={styles.sectionLabel}>8. Disabled</Text>
          <Button
            label="Disabled"
            disabled
            onPress={() => {}}
            style={styles.fullWidthButton}
          />

          <Text style={styles.sectionLabel}>9. With left icon</Text>
          <Button
            label="Add"
            iconLeft="plus"
            onPress={() => {}}
            style={styles.fullWidthButton}
          />

          <Text style={styles.sectionLabel}>10. With right icon</Text>
          <Button
            label="Next"
            iconRight="arrow-right"
            onPress={() => {}}
            style={styles.fullWidthButton}
          />

          <Text style={styles.sectionLabel}>11. With both icons</Text>
          <Button
            label="Go"
            iconLeft="arrow-left"
            iconRight="arrow-right"
            onPress={() => {}}
            style={styles.fullWidthButton}
          />

          <Text style={styles.sectionLabel}>12. Icon only</Text>
          <Button
            iconLeft="plus"
            onPress={() => {}}
            style={styles.fullWidthButton}
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
  fullWidthButton: {
    alignSelf: 'stretch',
  },
});
