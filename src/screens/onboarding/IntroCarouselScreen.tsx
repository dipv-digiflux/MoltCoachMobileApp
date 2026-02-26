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
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
  type SharedValue,
} from 'react-native-reanimated';
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
const CAROUSEL_ANIMATION_DURATION = 450;
const CAROUSEL_EASING = Easing.bezier(0.33, 1, 0.68, 1);
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

// Horizontal strip: [Slide0 | Slide1 | Slide2 | Slide0] for seamless loop
const CAROUSEL_SLIDES = [...SLIDES, SLIDES[0]] as const;

type ProgressSegmentProps = {
  index: number;
  currentIndex: number;
  progressAnim: SharedValue<number>;
};

const ProgressSegment = memo(function ProgressSegment({
  index,
  currentIndex,
  progressAnim,
}: ProgressSegmentProps): ReactElement {
  const isFilled = index < currentIndex;
  const isActive = index === currentIndex;

  const fillAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    if (index < currentIndex) return { width: '100%' };
    if (index === currentIndex) {
      return { width: `${Math.min(100, progressAnim.value * 100)}%` };
    }
    return { width: '0%' };
  }, [index, currentIndex]);

  return (
    <View style={styles.progressSegmentTrack}>
      {isFilled ? (
        <View
          style={[styles.progressSegmentFill, styles.progressSegmentFillFull]}
        />
      ) : isActive ? (
        <Animated.View
          style={[styles.progressSegmentFill, fillAnimatedStyle]}
        />
      ) : null}
    </View>
  );
});

type ImageCellProps = {
  slide: SlideData;
};

const ImageCell = memo(function ImageCell({
  slide: _slide,
}: ImageCellProps): ReactElement {
  return (
    <View style={styles.imageCell}>
      <View style={styles.imageContainer}>
        <Image
          source={Device}
          style={styles.deviceImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
});

type TextCellProps = {
  slide: SlideData;
};

const TextCell = memo(function TextCell({
  slide,
}: TextCellProps): ReactElement {
  return (
    <View style={styles.textCell}>
      <Text style={styles.title}>{slide.title}</Text>
      <Text style={styles.subtitle}>{slide.subtitle}</Text>
    </View>
  );
});

export const IntroCarouselScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const [currentIndex, setCurrentIndex] = useState(0);

  const progressAnim = useSharedValue(0);
  const stripTranslateX = useSharedValue(SCREEN_WIDTH);
  const topTranslateY = useSharedValue(-TOP_ENTRANCE_OFFSET);
  const topOpacity = useSharedValue(0);
  const bottomTranslateY = useSharedValue(BOTTOM_ENTRANCE_OFFSET);
  const bottomOpacity = useSharedValue(0);

  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const handleNavigateToGetStarted = useCallback((): void => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    navigation.navigate('GetStarted');
  }, [navigation]);

  const advanceToNext = useCallback((): void => {
    setCurrentIndex(prev => {
      if (prev < TOTAL_SLIDES - 1) {
        const nextIndex = prev + 1;
        stripTranslateX.value = withTiming(-(nextIndex * SCREEN_WIDTH), {
          duration: CAROUSEL_ANIMATION_DURATION,
          easing: CAROUSEL_EASING,
        });
        return nextIndex;
      }
      stripTranslateX.value = withTiming(
        -(TOTAL_SLIDES * SCREEN_WIDTH),
        { duration: CAROUSEL_ANIMATION_DURATION, easing: CAROUSEL_EASING },
        () => {
          stripTranslateX.value = 0;
          runOnJS(setCurrentIndex)(0);
        },
      );
      return prev;
    });
  }, [stripTranslateX]);

  useEffect(() => {
    if (!isFocused) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setCurrentIndex(0);
      stripTranslateX.value = 0;
      progressAnim.value = 0;
      return;
    }

    progressAnim.value = 0;

    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / SLIDE_DURATION);
      progressAnim.value = progress;

      if (progress >= 1) {
        const id = progressIntervalRef.current;
        if (id) {
          clearInterval(id);
          progressIntervalRef.current = null;
        }
        advanceToNext();
      }
    }, 16);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isFocused, currentIndex, progressAnim, stripTranslateX, advanceToNext]);

  useLayoutEffect(() => {
    topTranslateY.value = withTiming(0, {
      duration: ENTRANCE_DURATION,
      easing: ENTRANCE_EASING,
    });
    topOpacity.value = withTiming(1, {
      duration: ENTRANCE_DURATION,
      easing: ENTRANCE_EASING,
    });
    bottomTranslateY.value = withTiming(0, {
      duration: ENTRANCE_DURATION,
      easing: ENTRANCE_EASING,
    });
    bottomOpacity.value = withTiming(1, {
      duration: ENTRANCE_DURATION,
      easing: ENTRANCE_EASING,
    });

    stripTranslateX.value = withTiming(0, {
      duration: CAROUSEL_ANIMATION_DURATION,
      easing: CAROUSEL_EASING,
    });
  }, [
    topTranslateY,
    topOpacity,
    bottomTranslateY,
    bottomOpacity,
    stripTranslateX,
  ]);

  const carouselStripStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: stripTranslateX.value }],
  }));

  const progressBarStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: topTranslateY.value }],
    opacity: topOpacity.value,
  }));

  const bottomSectionAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bottomTranslateY.value }],
    opacity: bottomOpacity.value,
  }));

  const containerStyle = useMemo(
    () => [styles.container, { paddingTop: insets.top }],
    [insets.top],
  );

  const skipButtonStyle = useMemo(
    () => [styles.skipButton, { top: insets.top + spacing['Spacing-m'] }],
    [insets.top],
  );

  const buttonSectionStyle = useMemo(
    () => [
      styles.buttonSection,
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

      <View style={styles.imageViewport}>
        <Animated.View
          style={[styles.carouselStrip, carouselStripStyle]}
          pointerEvents="box-none"
        >
          {CAROUSEL_SLIDES.map((slide, index) => (
            <ImageCell key={`image-${String(index)}`} slide={slide} />
          ))}
        </Animated.View>
      </View>

      <Animated.View style={[styles.progressBarContainer, progressBarStyle]}>
        {SLIDES.map((_, index) => (
          <ProgressSegment
            key={`progress-${String(index)}`}
            index={index}
            currentIndex={currentIndex}
            progressAnim={progressAnim}
          />
        ))}
      </Animated.View>

      <Animated.View
        style={[styles.textAndButtonSection, bottomSectionAnimatedStyle]}
      >
        <View style={styles.textViewport}>
          <Animated.View
            style={[styles.carouselStrip, carouselStripStyle]}
            pointerEvents="box-none"
          >
            {CAROUSEL_SLIDES.map((slide, index) => (
              <TextCell key={`text-${String(index)}`} slide={slide} />
            ))}
          </Animated.View>
        </View>

        <View style={buttonSectionStyle}>
          <Button
            label="Get Started"
            variant="primary"
            size="large"
            onPress={handleNavigateToGetStarted}
            style={styles.button}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
    overflow: 'hidden',
  },
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
  imageViewport: {
    flex: 1.7,
    overflow: 'hidden',
  },
  carouselStrip: {
    flexDirection: 'row',
    width: CAROUSEL_SLIDES.length * SCREEN_WIDTH,
    height: '100%',
  },
  imageCell: {
    width: SCREEN_WIDTH,
    flex: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  deviceImage: {
    width: scale(300),
    height: verticalScale(410),
    resizeMode: 'cover',
    bottom: 0,
  },
  textAndButtonSection: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  textViewport: {
    flex: 1,
    overflow: 'hidden',
  },
  textCell: {
    width: SCREEN_WIDTH,
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-3xl'],
    paddingBottom: spacing['Spacing-5xl'],
    gap: spacing['Spacing-3xl'],
  },
  buttonSection: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
  },
  progressBarContainer: {
    flexDirection: 'row',
    gap: spacing['Spacing-m'],
    paddingHorizontal: spacing['Spacing-m'],
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
