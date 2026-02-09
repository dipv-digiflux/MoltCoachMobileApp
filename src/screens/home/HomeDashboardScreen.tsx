import React, { type ReactElement } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  type ImageSourcePropType,
} from 'react-native';

import { spacing, typography, colors } from '@/theme';
import { HeaderCurvedBg } from '@assets/images';

export const HomeDashboardScreen = (): ReactElement => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={HeaderCurvedBg as ImageSourcePropType}
          style={styles.headerBg}
          resizeMode="stretch"
        ></ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: surface.subtle.default,
  },
  headerWrapper: {
    //  backgroundColor: colors.PrimaryMain,
  },
  headerBg: {
    width: '100%',
    minHeight: 56,
    justifyContent: 'flex-end',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl5,
    paddingVertical: spacing.xl3,
  },
  backTouch: {
    padding: spacing.xl,
    marginLeft: -spacing.xl,
  },
  backTouchPressed: {
    opacity: 0.7,
  },
  backArrow: {
    fontSize: 24,
    color: colors.StatesWhite,
    lineHeight: 28,
  },
  skipButton: {
    paddingHorizontal: spacing.xl5,
    paddingVertical: spacing.xl2,
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl5,
    paddingTop: spacing.xl11,
  },
  logoWrap: {
    marginBottom: spacing.xl6,
  },
  logo: {
    width: 120,
    height: 40,
  },
  actions: {
    marginTop: spacing.xl10,
    gap: spacing.xl,
  },
});
