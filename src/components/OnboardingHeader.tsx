import React, { useCallback, type ReactElement } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackIconSvg from '@/assets/images/svg/back-icon.svg';
import { colors, spacing, typography, moderateScale, iconScale } from '@/theme';

import type {
  OnboardingNavigationProp,
  OnboardingStackParamList,
} from '@navigation/types';

type OnboardingHeaderProps = {
  disableBack?: boolean;
  showSkip?: boolean;
  /**
   * When provided, passing a screen name string is enough:
   * <OnboardingHeader showSkip onSkipPress=\"YourDetails\" />
   */
  onSkipPress?: keyof OnboardingStackParamList | (() => void);
  skipLabel?: string;
};

export const OnboardingHeader = ({
  disableBack,
  showSkip,
  onSkipPress,
  skipLabel = 'Skip',
}: OnboardingHeaderProps): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();

  const handleBack = useCallback(
    (event?: GestureResponderEvent): void => {
      if (disableBack) {
        return;
      }

      event?.preventDefault?.();
      navigation.goBack();
    },
    [disableBack, navigation],
  );

  const handleSkip = useCallback((): void => {
    if (!showSkip) {
      return;
    }

    if (typeof onSkipPress === 'function') {
      onSkipPress();
      return;
    }

    if (onSkipPress) {
      navigation.navigate(onSkipPress);
    }
  }, [navigation, onSkipPress, showSkip]);

  const renderBackIcon = (): ReactElement => {
    const icon = <BackIconSvg width={iconScale(24)} height={iconScale(24)} />;

    if (disableBack) {
      return <View style={styles.backButton}>{icon}</View>;
    }

    return (
      <TouchableOpacity
        onPress={handleBack}
        style={styles.backButton}
        hitSlop={{
          top: spacing['Spacing-xl'],
          bottom: spacing['Spacing-xl'],
          left: spacing['Spacing-xl'],
          right: spacing['Spacing-xl'],
        }}
        activeOpacity={0.7}
      >
        {icon}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderBackIcon()}
      <View
        style={showSkip ? undefined : styles.hidden}
        pointerEvents={showSkip ? 'auto' : 'none'}
      >
        <TouchableOpacity
          onPress={handleSkip}
          style={styles.skipButton}
          hitSlop={{
            top: spacing['Spacing-xl'],
            bottom: spacing['Spacing-xl'],
            left: spacing['Spacing-xl'],
            right: spacing['Spacing-xl'],
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>{skipLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-11xl'],
    paddingBottom: spacing['Spacing-3xl'],
  },
  backButton: {
    padding: spacing['Spacing-m'],
    marginLeft: -spacing['Spacing-m'],
  },
  skipButton: {
    backgroundColor: colors.StatesFill1,
    borderRadius: moderateScale(42),
    paddingHorizontal: spacing['Spacing-6xl'],
    paddingVertical: spacing['Spacing-2xl'],
  },
  skipText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
  hidden: {
    opacity: 0,
  },
});
