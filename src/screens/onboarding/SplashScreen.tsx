import React, { useEffect, useRef, type ReactElement } from 'react';
import { View, Image, StyleSheet, Animated, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { LogoWhite } from '@/assets/images';
import { loadAuth } from '@/services/authStorage';
import { setAccessToken } from '@/services/authTokenHolder';
import { useAppDispatch } from '@/store/hooks';
import { getCoachBookingsThunk } from '@/store/thunks';
import { colors } from '@/theme/colors';

import type { OnboardingNavigationProp } from '@navigation/types';

const ANIMATION_DURATION_MS = 800;
const HOLD_BEFORE_NAVIGATE_MS = 1400;

export const SplashScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const dispatch = useAppDispatch();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.88)).current;

  useEffect(() => {
    let isActive = true;

    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: ANIMATION_DURATION_MS,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: ANIMATION_DURATION_MS,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    const navigateNext = async (): Promise<void> => {
      const [persistedAuth] = await Promise.all([
        loadAuth(),
        new Promise<void>(resolve => {
          setTimeout(resolve, ANIMATION_DURATION_MS + HOLD_BEFORE_NAVIGATE_MS);
        }),
      ]);

      if (!isActive) {
        return;
      }

      if (persistedAuth && persistedAuth.token) {
        setAccessToken(persistedAuth.token);
        void dispatch(getCoachBookingsThunk());
        return;
      }

      navigation.replace('IntroCarousel');
    };
    void navigateNext();

    return () => {
      isActive = false;
    };
  }, [dispatch, navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.PrimaryMain}
      />
      <Animated.View
        style={[
          styles.logoWrap,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <Image
          source={LogoWhite}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="molt logo"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 56,
  },
});
