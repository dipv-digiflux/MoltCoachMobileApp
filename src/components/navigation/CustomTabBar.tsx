import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  isLiquidGlassSupported,
  LiquidGlassView,
} from '@callstack/liquid-glass';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeIconSvg from '@/assets/images/svg/home-icon.svg';
import ProfileIconSvg from '@/assets/images/svg/profile-icon.svg';
import ShopIconSvg from '@/assets/images/svg/shop-icon.svg';
import { colors, typography, spacing, moderateScale, iconScale } from '@/theme';
import PlusIcon from '@assets/images/svg/plus-icon.svg';

import type { TabBarOptionsWithTestID } from '@/types/components.types';

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): React.JSX.Element => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { marginBottom: spacing['Spacing-3xl'] + insets.bottom },
      ]}
    >
      <View style={styles.contentWrapper}>
        <LiquidGlassView
          style={[
            styles.tabsContainer,
            !isLiquidGlassSupported && {
              backgroundColor: !isLiquidGlassSupported
                ? '#E6E6E6B4'
                : undefined,
            },
          ]}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;
            const iconColor = isFocused
              ? colors.PrimaryMain
              : colors.IconPrimaryDisabled;

            const onPress = (): void => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = (): void => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            const tabBarTestID = (options as TabBarOptionsWithTestID)
              .tabBarTestID;

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[styles.tabButton, isFocused && styles.tabButtonActive]}
              >
                {route.name === 'HomeTab' ? (
                  <HomeIconSvg
                    width={iconScale(24)}
                    height={iconScale(24)}
                    color={iconColor}
                  />
                ) : null}

                {route.name === 'ProfileTab' ? (
                  <ProfileIconSvg
                    width={iconScale(24)}
                    height={iconScale(24)}
                    color={iconColor}
                  />
                ) : null}
                {route.name === 'ShopTab' ? (
                  <ShopIconSvg
                    width={iconScale(24)}
                    height={iconScale(24)}
                    color={iconColor}
                  />
                ) : null}
                <Text
                  style={[
                    styles.tabText,
                    isFocused ? styles.tabTextActive : styles.tabTextInactive,
                  ]}
                >
                  {label as string}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.logButton}>
            <PlusIcon width={iconScale(24)} height={iconScale(24)} />
            <Text style={styles.logButtonText}>Log</Text>
          </TouchableOpacity>
        </LiquidGlassView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: spacing['Spacing-5xl'],
    gap: spacing['Spacing-3xl'],
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: moderateScale(72),
    borderRadius: moderateScale(2),
    paddingHorizontal: spacing['Spacing-m'],
    paddingVertical: spacing['Spacing-m'],
    gap: spacing['Spacing-m'],
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing['Spacing-m'],
    paddingHorizontal: spacing['Spacing-4xl'],
    paddingVertical: spacing['Spacing-3xl'],
    borderRadius: moderateScale(2),
    minWidth: 0,
  },
  tabButtonActive: {
    backgroundColor: colors.StatesFill2,
  },
  tabText: {
    ...typography.bodySmall3SemiBold,
  },
  tabTextActive: {
    ...typography.bodySmall3SemiBold,
    color: colors.PrimaryMain,
  },
  tabTextInactive: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
  },
  logButton: {
    flex: 1,
    backgroundColor: colors.PrimaryMain,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing['Spacing-m'],
    paddingHorizontal: spacing['Spacing-4xl'],
    paddingVertical: spacing['Spacing-3xl'],
    borderRadius: moderateScale(2),
    minWidth: 0,
  },
  logButtonText: {
    ...typography.bodySmall3Regular,
    color: colors.StatesWhite,
  },
});
