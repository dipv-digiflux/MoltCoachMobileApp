import React, {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type MutableRefObject,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  UIManager,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { Button } from '@/components';
import {
  colors,
  spacing,
  typography,
  moderateScale,
  verticalScale,
  radius,
} from '@/theme';

import type { OnboardingNavigationProp } from '@navigation/types';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CENTER_TO_TOP_OFFSET = -verticalScale(180);
const CARD_INITIAL_OFFSET = verticalScale(80);
const POP_DURATION_MS = 450;
const HOLD_DURATION_MS = 2000;
const TRANSITION_DURATION_MS = 650;

const createAnimatedValue = (): MutableRefObject<Animated.Value> =>
  useRef<Animated.Value>(new Animated.Value(0));

export const PlanPreviewScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const [hasTransitioned, setHasTransitioned] = useState(false);

  const centerOpacity = createAnimatedValue();
  const centerScale = createAnimatedValue();
  const centerTranslateY = createAnimatedValue();
  const cardOpacity = createAnimatedValue();
  const cardTranslateY = createAnimatedValue();

  useEffect(() => {
    centerOpacity.current.setValue(0);
    centerScale.current.setValue(0.85);
    centerTranslateY.current.setValue(0);
    cardOpacity.current.setValue(0);
    cardTranslateY.current.setValue(CARD_INITIAL_OFFSET);

    const popIn = Animated.parallel([
      Animated.timing(centerOpacity.current, {
        toValue: 1,
        duration: POP_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(centerScale.current, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]);

    const hold = Animated.delay(HOLD_DURATION_MS);

    const moveUpAndRevealCard = Animated.parallel([
      Animated.timing(centerTranslateY.current, {
        toValue: CENTER_TO_TOP_OFFSET,
        duration: TRANSITION_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity.current, {
        toValue: 1,
        duration: TRANSITION_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateY.current, {
        toValue: 0,
        duration: TRANSITION_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    Animated.sequence([popIn, hold]).start(() => {
      LayoutAnimation.configureNext({
        duration: 900,
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 0.82,
        },
      });
      setHasTransitioned(true);
      moveUpAndRevealCard.start();
    });
  }, []);

  const handleEnterApp = (): void => {
    const root = navigation.getParent();
    root?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'AppStack',
            params: {
              screen: 'BottomTabs',
              params: {
                screen: 'HomeTab',
                params: { screen: 'HomeDashboard' },
              },
            },
          },
        ],
      }),
    );
  };

  const centerAnimatedStyle: StyleProp<ViewStyle> = {
    opacity: centerOpacity.current,
    transform: [
      { translateY: centerTranslateY.current },
      { scale: centerScale.current },
    ],
  };

  const cardAnimatedStyle: StyleProp<ViewStyle> = {
    opacity: cardOpacity.current,
    transform: [{ translateY: cardTranslateY.current }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>
        <Animated.View
          style={[
            styles.centerBlock,
            hasTransitioned && styles.centerBlockLeft,
            centerAnimatedStyle,
          ]}
        >
          <View style={styles.checkCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
          <Text
            style={[
              styles.centerTitle,
              hasTransitioned && styles.centerTitleLeft,
            ]}
          >
            Your plan is ready
          </Text>
          <Text
            style={[
              styles.centerDescription,
              hasTransitioned && styles.centerDescriptionLeft,
            ]}
          >
            We&apos;ve built a baseline plan based on your metrics and goals.
          </Text>
        </Animated.View>

        <Animated.View style={[styles.card, cardAnimatedStyle]}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Daily nutrition target</Text>
            <Text style={styles.cardAction}>Fine-tune</Text>
          </View>

          <Text style={styles.cardKcal}>2,450 kcal</Text>

          <View style={styles.cardTagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>High Protein</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Fat Loss Mode</Text>
            </View>
          </View>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Button
          label="Enter Molt"
          variant="primary"
          size="large"
          onPress={handleEnterApp}
          style={styles.footerButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  centerBlock: {
    alignItems: 'center',
  },
  centerBlockLeft: {
    alignItems: 'flex-start',
  },
  checkCircle: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: radius.full,
    backgroundColor: colors.PrimaryMain,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['Spacing-4xl'],
  },
  checkIcon: {
    ...typography.bodySmall1Bold,
    color: colors.StatesWhite,
  },
  centerTitle: {
    ...typography.h6Bold,
    color: colors.TextPrimaryDefault,
    textAlign: 'center',
    marginBottom: spacing['Spacing-3xl'],
  },
  centerTitleLeft: {
    textAlign: 'left',
  },
  centerDescription: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    textAlign: 'center',
  },
  centerDescriptionLeft: {
    textAlign: 'left',
  },
  card: {
    marginTop: spacing['Spacing-11xl'],
    paddingVertical: spacing['Spacing-6xl'],
    paddingHorizontal: spacing['Spacing-5xl'],
    borderRadius: radius.lg,
    backgroundColor: colors.StatesFill2,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    rowGap: spacing['Spacing-4xl'],
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
  },
  cardAction: {
    ...typography.bodySmall2Medium,
    color: colors.PrimaryMain,
  },
  cardKcal: {
    ...typography.h6Bold,
    color: colors.TextPrimaryDefault,
  },
  cardTagRow: {
    flexDirection: 'row',
    columnGap: spacing['Spacing-3xl'],
  },
  tag: {
    paddingHorizontal: spacing['Spacing-4xl'],
    paddingVertical: spacing['Spacing-m'],
    borderRadius: radius.full,
    backgroundColor: colors.StatesFill1,
  },
  tagText: {
    ...typography.bodySmall3SemiBold,
    color: colors.TextPrimaryDefault,
  },
  footer: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-8xl'],
  },
  footerButton: {
    width: '100%',
  },
});
