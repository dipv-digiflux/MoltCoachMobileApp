import React, {
  type ReactElement,
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  memo,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components';
import {
  colors,
  typography,
  spacing,
  radius,
  moderateScale,
  lineHeightScale,
  scale,
  verticalScale,
} from '@/theme';
import { Device } from '@assets/images';

import type { OnboardingNavigationProp } from '@navigation/types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SLIDE_DURATION = 3500;
const CONTENT_ANIMATION_DURATION = 850;
const CONTENT_ANIMATION_EASING = Easing.bezier(0.33, 1, 0.68, 1);
const ENTRANCE_DURATION = 580;
const ENTRANCE_EASING = Easing.bezier(0.25, 0.1, 0.25, 1);
const TOP_ENTRANCE_OFFSET = SCREEN_HEIGHT * 0.12;
const BOTTOM_ENTRANCE_OFFSET = SCREEN_HEIGHT * 0.1;

type SlideData = {
  title: string;
  subtitle: string;
};

const SLIDES: readonly SlideData[] = [
  {
    title: 'Real-time progress\ntracking',
    subtitle: 'Real-time progress tracking',
  },
  {
    title: 'Personalized workout\nplans',
    subtitle: 'Tailored specifically to your goals',
  },
  {
    title: 'Expert nutrition guidance',
    subtitle: 'Fuel your body the right way',
  },
];

const TOTAL_SLIDES = SLIDES.length;

type ProgressSegmentProps = {
  index: number;
  currentIndex: number;
  progressAnim: Animated.Value;
};

const ProgressSegment = memo(function ProgressSegment({
  index,
  currentIndex,
  progressAnim,
}: ProgressSegmentProps): ReactElement {
  const isFilled = index < currentIndex;
  const isActive = index === currentIndex;

  return (
    <View style={[styles.progressSegmentTrack]}>
      {isFilled ? (
        <View style={styles.progressSegmentFillFull} />
      ) : isActive ? (
        <Animated.View
          style={[
            styles.progressSegmentFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      ) : null}
    </View>
  );
});

export const IntroCarouselScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const [currentIndex, setCurrentIndex] = useState(0);

  const progressAnim = useRef(new Animated.Value(0)).current;

  const contentTranslateX = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const topSectionTranslateY = useRef(
    new Animated.Value(-TOP_ENTRANCE_OFFSET),
  ).current;
  const topSectionOpacity = useRef(new Animated.Value(0)).current;
  const bottomSectionTranslateY = useRef(
    new Animated.Value(BOTTOM_ENTRANCE_OFFSET),
  ).current;
  const bottomSectionOpacity = useRef(new Animated.Value(0)).current;

  const handleNavigateToGetStarted = useCallback((): void => {
    progressAnim.stopAnimation();
    navigation.navigate('GetStarted');
  }, [navigation, progressAnim]);

  useEffect(() => {
    if (!isFocused) {
      progressAnim.stopAnimation();
      if (currentIndex !== 0) {
        setCurrentIndex(0);
      }
      return;
    }

    progressAnim.setValue(0);

    const animation = Animated.timing(progressAnim, {
      toValue: 1,
      duration: SLIDE_DURATION,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    animation.start(({ finished }) => {
      if (finished) {
        if (currentIndex < TOTAL_SLIDES - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          handleNavigateToGetStarted();
        }
      }
    });

    return (): void => {
      animation.stop();
    };
  }, [currentIndex, isFocused, progressAnim, handleNavigateToGetStarted]);

  useLayoutEffect(() => {
    Animated.parallel([
      Animated.timing(topSectionTranslateY, {
        toValue: 0,
        duration: ENTRANCE_DURATION,
        easing: ENTRANCE_EASING,
        useNativeDriver: true,
      }),
      Animated.timing(topSectionOpacity, {
        toValue: 1,
        duration: ENTRANCE_DURATION,
        easing: ENTRANCE_EASING,
        useNativeDriver: true,
      }),
      Animated.timing(bottomSectionTranslateY, {
        toValue: 0,
        duration: ENTRANCE_DURATION,
        easing: ENTRANCE_EASING,
        useNativeDriver: true,
      }),
      Animated.timing(bottomSectionOpacity, {
        toValue: 1,
        duration: ENTRANCE_DURATION,
        easing: ENTRANCE_EASING,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    topSectionTranslateY,
    topSectionOpacity,
    bottomSectionTranslateY,
    bottomSectionOpacity,
  ]);

  useLayoutEffect(() => {
    if (currentIndex === 0) {
      return;
    }

    contentTranslateX.setValue(SCREEN_WIDTH);
    contentOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(contentTranslateX, {
        toValue: 0,
        duration: CONTENT_ANIMATION_DURATION,
        easing: CONTENT_ANIMATION_EASING,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: CONTENT_ANIMATION_DURATION,
        easing: CONTENT_ANIMATION_EASING,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex, contentTranslateX, contentOpacity]);

  const currentSlide = useMemo(() => SLIDES[currentIndex], [currentIndex]);

  const imageAnimatedStyle = useMemo(
    () => ({
      transform: [
        { translateY: topSectionTranslateY },
        { translateX: contentTranslateX },
      ],
      opacity: Animated.multiply(topSectionOpacity, contentOpacity),
    }),
    [
      topSectionTranslateY,
      contentTranslateX,
      topSectionOpacity,
      contentOpacity,
    ],
  );

  const progressBarAnimatedStyle = useMemo(
    () => ({
      transform: [{ translateY: topSectionTranslateY }],
      opacity: topSectionOpacity,
    }),
    [topSectionTranslateY, topSectionOpacity],
  );

  const textAnimatedStyle = useMemo(
    () => ({
      transform: [
        { translateY: bottomSectionTranslateY },
        { translateX: contentTranslateX },
      ],
      opacity: Animated.multiply(bottomSectionOpacity, contentOpacity),
    }),
    [
      bottomSectionTranslateY,
      contentTranslateX,
      bottomSectionOpacity,
      contentOpacity,
    ],
  );

  const containerStyle = useMemo(
    () => [styles.container, { paddingTop: insets.top }],
    [insets.top],
  );

  const skipButtonStyle = useMemo(
    () => [styles.skipButton, { top: insets.top + spacing['Spacing-m'] }],
    [insets.top],
  );

  const bottomSectionStyle = useMemo(
    () => [
      styles.bottomSection,
      {
        paddingBottom: Math.max(insets.bottom, spacing['Spacing-10xl']),
      },
    ],
    [insets.bottom],
  );

  const hitSlop = useMemo(
    () => ({ top: 10, bottom: 10, left: 10, right: 10 }),
    [],
  );

  return (
    <View style={containerStyle}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.StatesFill1} />
      <TouchableOpacity
        style={skipButtonStyle}
        onPress={handleNavigateToGetStarted}
        hitSlop={hitSlop}
        activeOpacity={0.7}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.imageWrapper, imageAnimatedStyle]}>
        <View style={styles.imageContainer}>
          <Image
            source={Device}
            style={styles.deviceImage}
            resizeMode="contain"
          />
        </View>
      </Animated.View>
      <Animated.View
        style={[styles.progressBarContainer, progressBarAnimatedStyle]}
      >
        {SLIDES.map((_, index) => (
          <ProgressSegment
            key={`progress-${String(index)}`}
            index={index}
            currentIndex={currentIndex}
            progressAnim={progressAnim}
          />
        ))}
      </Animated.View>

      <View style={bottomSectionStyle}>
        <Animated.View style={[styles.textContentWrapper, textAnimatedStyle]}>
          <Text style={styles.title}>{currentSlide?.title}</Text>
          <Text style={styles.subtitle}>{currentSlide?.subtitle}</Text>
        </Animated.View>
        <View style={styles.buttonWrapper}>
          <Button
            label="Get Started"
            variant="primary"
            size="large"
            onPress={handleNavigateToGetStarted}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
    overflow: 'hidden',
  },

  // ── Skip — absolute top-right pill ──
  skipButton: {
    position: 'absolute',
    right: spacing['Spacing-5xl'],
    zIndex: 1,
    backgroundColor: colors.StatesFill1,
    borderRadius: moderateScale(42),
    paddingHorizontal: spacing['Spacing-6xl'],
    paddingVertical: spacing['Spacing-2xl'],
  },
  skipText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
    textAlign: 'center',
  },

  imageWrapper: {
    flex: 1.7,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  deviceImage: {
    width: scale(300),
    height: verticalScale(410),
    resizeMode: 'cover',
    bottom: 0,
  },

  bottomSection: {
    backgroundColor: colors.StatesWhite,
    flex: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  progressBarContainer: {
    flexDirection: 'row',
    gap: spacing['Spacing-m'],
    paddingHorizontal: spacing['Spacing-m'],
    paddingTop: 0,
    paddingBottom: spacing['Spacing-m'],
  },
  progressSegmentTrack: {
    flex: 1,
    height: moderateScale(4),
    backgroundColor: colors.StatesOutline,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressSegmentFill: {
    height: '100%',
    backgroundColor: colors.PrimaryMain,
    borderRadius: radius.full,
  },
  progressSegmentFillFull: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.PrimaryMain,
    borderRadius: radius.full,
  },

  // ── Text — animated wrapper (button is outside, stable) ──
  textContentWrapper: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-11xl'],
    gap: spacing['Spacing-3xl'],
  },
  buttonWrapper: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
  },
  title: {
    ...typography.h4SemiBold,
    color: colors.TextPrimaryDefault,
  },
  subtitle: {
    ...typography.bodySmall1Regular,
    lineHeight: lineHeightScale(16),
    color: colors.PrimarySecondary,
  },
  button: {
    width: '100%',
    borderRadius: moderateScale(2),
  },
});
