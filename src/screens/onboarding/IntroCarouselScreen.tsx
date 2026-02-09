import React, {
  type ReactElement,
  useState,
  useRef,
  useCallback,
  useEffect,
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDE_DURATION = 5000;
const CONTENT_ANIMATION_DURATION = 350;

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
  const isFirstRender = useRef(true);

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

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    contentTranslateX.setValue(SCREEN_WIDTH);
    contentOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(contentTranslateX, {
        toValue: 0,
        duration: CONTENT_ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: CONTENT_ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex, contentTranslateX, contentOpacity]);

  const currentSlide = SLIDES[currentIndex];

  const slideAnimStyle = {
    transform: [{ translateX: contentTranslateX }],
    opacity: contentOpacity,
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

      {/* ── Device image — animated; phone sits just below Skip ── */}
      <Animated.View style={[styles.imageContainer, slideAnimStyle]}>
        <Image
          source={Device}
          style={styles.deviceImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* ── Progress bar — directly under phone, no top gap ── */}
      <View style={styles.progressBarContainer}>
        {SLIDES.map((_, index) => (
          <ProgressSegment
            key={`progress-${String(index)}`}
            index={index}
            currentIndex={currentIndex}
            progressAnim={progressAnim}
          />
        ))}
      </View>

      {/* ── White section — title, subtitle, button ── */}
      <View
        style={[
          styles.bottomSection,
          { paddingBottom: Math.max(insets.bottom, spacingScale(24)) },
        ]}
      >
        {/* Title, subtitle, button — animated, slides from right */}
        <Animated.View style={[styles.textContentWrapper, slideAnimStyle]}>
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

  imageContainer: {
    flex: 1.7,
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
    ...typography.h6SemiBold,
    color: colors.TextPrimaryDefault,
  },
  subtitle: {
    ...typography.bodySmall1Regular,
    lineHeight: lineHeightScale(16),
    color: colors.PrimarySecondary,
  },
  button: {
    width: '100%',
    marginTop: spacing['Spacing-5xl'],
    borderRadius: moderateScale(2),
  },
});
