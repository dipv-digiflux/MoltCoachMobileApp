import React, { type ReactElement } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import { CurvedHeader } from '@/components/CurvedHeader';
import { spacing, typography, colors } from '@/theme';

export const HomeDashboardScreen = (): ReactElement => {
  return (
    <View style={styles.container}>
      <CurvedHeader>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={typography.h1Bold}>Home Dashboard</Text>
        </ScrollView>
      </CurvedHeader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
