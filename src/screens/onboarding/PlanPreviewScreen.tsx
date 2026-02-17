import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  type ReactElement,
} from 'react';
import {
  View,
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

import { CheckCircleIconSvg } from '@/assets/images';
import { DailyNutritionTargetCard } from '@/components';
import { Button, PageHeaderScrollView } from '@/components';
import {
  colors,
  spacing,
  typography,
  moderateScale,
  verticalScale,
} from '@/theme';

import type { OnboardingNavigationProp } from '@navigation/types';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CARD_INITIAL_OFFSET = verticalScale(80);
const POP_DURATION_MS = 450;
const HOLD_DURATION_MS = 1000;
const TRANSITION_DURATION_MS = 1000;

const PLAN_CARD_PROPS = {
  title: 'Daily nutrition target',
  actionLabel: 'Fine-tune',
  kcal: '2,450 kcal',
  tags: ['High Protein', 'Fat Loss Mode'] as const,
  macroTargets: {
    protein: { value: '180g', percent: 38 },
    fat: { value: '68g', percent: 25 },
    carb: { value: '245g', percent: 40 },
  },
  lifestyleTitle: 'Lifestyle targets',
  lifestyleActionLabel: 'Fine-tune',
  lifestyleTargets: {
    waterIntake: '3.5 Liters',
    steps: '12,500',
    activeCalorieBurn: '250 kcal',
  },
  planTip: 'This plan can help you lose 4.2 kg in 12 weeks.',
} as const;

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

  const animationStartedRef = useRef(false);
  const centerOpacity = useRef(new Animated.Value(0));
  const centerScale = useRef(new Animated.Value(0));
  const centerTranslateY = useRef(new Animated.Value(0));
  const cardOpacity = useRef(new Animated.Value(0));
  const cardTranslateY = useRef(new Animated.Value(0));
  const buttonOpacity = useRef(new Animated.Value(0));
  const buttonTranslateY = useRef(new Animated.Value(0));

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
    if (centerBlockLayout == null || animationStartedRef.current) {
      return;
    }
    animationStartedRef.current = true;

    const targetTy = spacing['Spacing-11xl'] - centerBlockLayout.y;

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
      toValue: targetTy,
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

  const handleEnterApp = useCallback((): void => {
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
  }, [navigation]);

  const parentWidth = centerBlockLayout?.width ?? 0;
  const iconWidth = moderateScale(40);
  const iconShift = (parentWidth - iconWidth) / 2;
  const titleShift = titleWidth > 0 ? (parentWidth - titleWidth) / 2 : 0;

  const iconTranslateX = useMemo(() => {
    if (targetTranslateY === 0) return 0;
    return centerTranslateY.current.interpolate({
      inputRange: [targetTranslateY, 0],
      outputRange: [-iconShift, 0],
      extrapolate: 'clamp',
    });
  }, [targetTranslateY, iconShift]);

  const titleTranslateX = useMemo(() => {
    if (targetTranslateY === 0) return 0;
    return centerTranslateY.current.interpolate({
      inputRange: [targetTranslateY, 0],
      outputRange: [-titleShift, 0],
      extrapolate: 'clamp',
    });
  }, [targetTranslateY, titleShift]);

  const centerAnimatedStyle: StyleProp<ViewStyle> = {
    opacity: centerOpacity.current,
    transform: [
      { translateY: centerTranslateY.current },
      { scale: centerScale.current },
    ],
  };

  const cardTop =
    centerBlockLayout != null
      ? spacing['Spacing-11xl'] +
        centerBlockLayout.height +
        spacing['Spacing-3xl']
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
      <PageHeaderScrollView
        header={{
          title: '',
          hideBackButton: true,
          style: { height: 0 },
        }}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.contentArea}>
          <Animated.View
            onLayout={onCenterBlockLayout}
            style={[styles.centerBlock, centerAnimatedStyle]}
          >
            <Animated.View
              style={{ transform: [{ translateX: iconTranslateX }] }}
            >
              <View style={styles.checkCircle}>
                <CheckCircleIconSvg
                  width={moderateScale(25)}
                  height={moderateScale(25)}
                />
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
                { transform: [{ translateX: 0 }] },
              ]}
            >
              We&apos;ve built a baseline plan based on your metrics and goals.
            </Animated.Text>
          </Animated.View>

          <Animated.View
            style={[styles.cardContainer, { top: cardTop }, cardAnimatedStyle]}
          >
            <DailyNutritionTargetCard
              title={PLAN_CARD_PROPS.title}
              actionLabel={PLAN_CARD_PROPS.actionLabel}
              kcal={PLAN_CARD_PROPS.kcal}
              tags={PLAN_CARD_PROPS.tags}
              macroTargets={PLAN_CARD_PROPS.macroTargets}
              lifestyleTitle={PLAN_CARD_PROPS.lifestyleTitle}
              lifestyleActionLabel={PLAN_CARD_PROPS.lifestyleActionLabel}
              lifestyleTargets={PLAN_CARD_PROPS.lifestyleTargets}
              planTip={PLAN_CARD_PROPS.planTip}
            />
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
      </PageHeaderScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentContainerStyle: {
    flexGrow: 1,
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
    marginBottom: spacing['Spacing-4xl'],
  },
  centerTitle: {
    ...typography.h7SemiBold,
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
  cardContainer: {
    position: 'absolute',
    left: spacing['Spacing-5xl'],
    right: spacing['Spacing-5xl'],
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
