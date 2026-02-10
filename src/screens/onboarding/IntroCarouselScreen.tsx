import React, {
  type ReactElement,
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
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
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components';
import {
  colors,
  typography,
  spacing,
  radius,
  moderateScale,
  spacingScale,
  lineHeightScale,
  scale,
  verticalScale,
} from '@/theme';
import { Device } from '@assets/images';

import type { OnboardingNavigationProp } from '@navigation/types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SLIDE_DURATION = 3000;
const CONTENT_ANIMATION_DURATION = 520;
const CONTENT_ANIMATION_EASING = Easing.bezier(0.25, 0.1, 0.25, 1);
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

const ProgressSegment = ({
  index,
  currentIndex,
  progressAnim,
}: ProgressSegmentProps): ReactElement => {
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
};

export const IntroCarouselScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const insets = useSafeAreaInsets();

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
    navigation.navigate('GetStarted');
  }, [navigation]);

  useEffect(() => {
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
  }, [currentIndex, progressAnim, handleNavigateToGetStarted]);

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

  const currentSlide = SLIDES[currentIndex];

  const imageAnimatedStyle = {
    transform: [
      { translateY: topSectionTranslateY },
      { translateX: contentTranslateX },
    ],
    opacity: Animated.multiply(topSectionOpacity, contentOpacity),
  };

  const progressBarAnimatedStyle = {
    transform: [{ translateY: topSectionTranslateY }],
    opacity: topSectionOpacity,
  };

  const textAnimatedStyle = {
    transform: [
      { translateY: bottomSectionTranslateY },
      { translateX: contentTranslateX },
    ],
    opacity: Animated.multiply(bottomSectionOpacity, contentOpacity),
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.StatesFill1} />
      <TouchableOpacity
        style={[styles.skipButton, { top: insets.top + spacingScale(4) }]}
        onPress={handleNavigateToGetStarted}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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

      <View
        style={[
          styles.bottomSection,
          { paddingBottom: Math.max(insets.bottom, spacingScale(24)) },
        ]}
      >
        <Animated.View style={[styles.textContentWrapper, textAnimatedStyle]}>
          <Text style={styles.title}>{currentSlide?.title}</Text>
          <Text style={styles.subtitle}>{currentSlide?.subtitle}</Text>

          <Button
            label="Get Started"
            variant="primary"
            size="large"
            onPress={handleNavigateToGetStarted}
            style={styles.button}
          />
        </Animated.View>
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
    paddingHorizontal: spacingScale(18),
    paddingVertical: spacingScale(10),
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
    gap: spacingScale(4),
    paddingHorizontal: spacingScale(4),
    paddingTop: 0,
    paddingBottom: spacingScale(4),
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

  // ── Text + Button — animated wrapper ──
  textContentWrapper: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-11xl'],
    gap: spacing['Spacing-3xl'],
  },
  title: {
    ...typography.h4SemiBold,
    color: colors.TextPrimaryDefault,
  },
  subtitle: {
    ...typography.bodySmall1Regular,
    lineHeight: lineHeightScale(16),
    color: colors.PrimarySecondary,
    marginBottom: spacing['Spacing-5xl'],
  },
  button: {
    width: '100%',
    marginTop: spacing['Spacing-5xl'],
    borderRadius: moderateScale(2),
  },
});
