import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
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
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, CurvedHeader } from '@/components';
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

const CARD_INITIAL_OFFSET = verticalScale(80);
const CARD_GAP = 12;
const POP_DURATION_MS = 450;
const HOLD_DURATION_MS = 1000;
const TRANSITION_DURATION_MS = 1000;

const createAnimatedValue = (): MutableRefObject<Animated.Value> =>
  useRef<Animated.Value>(new Animated.Value(0));

export const PlanPreviewScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const insets = useSafeAreaInsets();

  const [centerBlockLayout, setCenterBlockLayout] = useState<{
    y: number;
    height: number;
    width: number;
  } | null>(null);
  const [titleWidth, setTitleWidth] = useState(0);
  const [isMovingUp, setIsMovingUp] = useState(false);

  const centerOpacity = createAnimatedValue();
  const centerScale = createAnimatedValue();
  const centerTranslateY = createAnimatedValue();
  const cardOpacity = createAnimatedValue();
  const cardTranslateY = createAnimatedValue();
  const buttonOpacity = createAnimatedValue();
  const buttonTranslateY = createAnimatedValue();

  const onCenterBlockLayout = useCallback((e: LayoutChangeEvent) => {
    const { y, height, width } = e.nativeEvent.layout;
    setCenterBlockLayout({ y, height, width });
  }, []);

  const onTitleLayout = useCallback((e: LayoutChangeEvent) => {
    setTitleWidth(e.nativeEvent.layout.width);
  }, []);

  const targetTranslateY =
    centerBlockLayout != null
      ? spacing['Spacing-11xl'] - centerBlockLayout.y
      : 0;

  useEffect(() => {
    if (centerBlockLayout == null) {
      return;
    }

    centerOpacity.current.setValue(0);
    centerScale.current.setValue(0.85);
    centerTranslateY.current.setValue(0);
    cardOpacity.current.setValue(0);
    cardTranslateY.current.setValue(CARD_INITIAL_OFFSET);
    buttonOpacity.current.setValue(0);
    buttonTranslateY.current.setValue(CARD_INITIAL_OFFSET);

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

    const moveCenterUp = Animated.timing(centerTranslateY.current, {
      toValue: targetTranslateY,
      duration: TRANSITION_DURATION_MS,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    });

    const revealCardAndButton = Animated.parallel([
      Animated.timing(cardOpacity.current, {
        toValue: 1,
        duration: TRANSITION_DURATION_MS,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateY.current, {
        toValue: 0,
        duration: TRANSITION_DURATION_MS,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity.current, {
        toValue: 1,
        duration: TRANSITION_DURATION_MS,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY.current, {
        toValue: 0,
        duration: TRANSITION_DURATION_MS,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    Animated.sequence([popIn, hold]).start(() => {
      LayoutAnimation.configureNext({
        duration: 800,
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
      });
      setIsMovingUp(true);
      moveCenterUp.start(() => {
        revealCardAndButton.start();
      });
    });
  }, [centerBlockLayout]);

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

  // Compute per-element horizontal shifts
  const parentWidth = centerBlockLayout?.width ?? 0;
  const iconWidth = moderateScale(40);
  const iconShift = (parentWidth - iconWidth) / 2;
  const titleShift = titleWidth > 0 ? (parentWidth - titleWidth) / 2 : 0;

  // Interpolate translateX off the same animated value as translateY
  // so horizontal + vertical motion are perfectly in sync (diagonal)
  const iconTranslateX =
    targetTranslateY !== 0
      ? centerTranslateY.current.interpolate({
          inputRange: [targetTranslateY, 0],
          outputRange: [-iconShift, 0],
          extrapolate: 'clamp',
        })
      : 0;

  const titleTranslateX =
    targetTranslateY !== 0
      ? centerTranslateY.current.interpolate({
          inputRange: [targetTranslateY, 0],
          outputRange: [-titleShift, 0],
          extrapolate: 'clamp',
        })
      : 0;

  // Description wraps to full width, so no horizontal shift needed
  const descTranslateX = 0;

  const centerAnimatedStyle: StyleProp<ViewStyle> = {
    opacity: centerOpacity.current,
    transform: [
      { translateY: centerTranslateY.current },
      { scale: centerScale.current },
    ],
  };

  const cardTop =
    centerBlockLayout != null
      ? spacing['Spacing-11xl'] + centerBlockLayout.height + CARD_GAP
      : 0;

  const cardAnimatedStyle: StyleProp<ViewStyle> = {
    opacity: cardOpacity.current,
    transform: [{ translateY: cardTranslateY.current }],
  };

  const buttonAnimatedStyle: StyleProp<ViewStyle> = {
    opacity: buttonOpacity.current,
    transform: [{ translateY: buttonTranslateY.current }],
  };

  const footerBottom = Math.max(insets.bottom, spacing['Spacing-10xl']);

  return (
    <View style={styles.container}>
      <CurvedHeader statusBarStyle="dark-content">
        <View style={styles.contentArea}>
          <Animated.View
            onLayout={onCenterBlockLayout}
            style={[styles.centerBlock, centerAnimatedStyle]}
          >
            <Animated.View
              style={{ transform: [{ translateX: iconTranslateX }] }}
            >
              <View style={styles.checkCircle}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
            </Animated.View>
            <Animated.Text
              onLayout={onTitleLayout}
              style={[
                styles.centerTitle,
                { transform: [{ translateX: titleTranslateX }] },
              ]}
            >
              Your plan is ready
            </Animated.Text>
            <Animated.Text
              style={[
                styles.centerDescription,
                isMovingUp && styles.centerDescriptionLeft,
                { transform: [{ translateX: descTranslateX }] },
              ]}
            >
              We&apos;ve built a baseline plan based on your metrics and goals.
            </Animated.Text>
          </Animated.View>

          <Animated.View
            style={[styles.card, { top: cardTop }, cardAnimatedStyle]}
          >
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

        <Animated.View
          style={[
            styles.bottomSection,
            { bottom: footerBottom },
            buttonAnimatedStyle,
          ]}
        >
          <View style={styles.buttonWrapper}>
            <Button
              label="Enter Molt"
              variant="primary"
              size="large"
              onPress={handleEnterApp}
              style={styles.footerButton}
            />
          </View>
        </Animated.View>
      </CurvedHeader>
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
    alignItems: 'stretch',
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  centerBlock: {
    alignItems: 'center',
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
  centerDescription: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    textAlign: 'center',
  },
  centerDescriptionLeft: {
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  card: {
    position: 'absolute',
    left: spacing['Spacing-5xl'],
    right: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-6xl'],
    paddingHorizontal: spacing['Spacing-5xl'],
    borderRadius: moderateScale(1),
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
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-8xl'],
  },
  footerButton: {
    width: '100%',
  },
});
