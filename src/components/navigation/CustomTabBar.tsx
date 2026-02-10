import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeIconSvg from '@/assets/images/svg/home-icon.svg';
import ProfileIconSvg from '@/assets/images/svg/profile-icon.svg';
import ShopIconSvg from '@/assets/images/svg/shop-icon.svg';
import { colors, typography, spacing, moderateScale, iconScale } from '@/theme';
import PlusIcon from '@assets/images/svg/plus-icon.svg';

type TabBarOptionsWithTestID =
  BottomTabBarProps['descriptors'][string]['options'] & {
    tabBarTestID?: string;
  };

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
        <View style={styles.tabsContainer}>
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
                {route.name === 'HomeTab' && (
                  <HomeIconSvg
                    width={iconScale(24)}
                    height={iconScale(24)}
                    color={iconColor}
                  />
                )}
                {route.name === 'ShopTab' && (
                  <ShopIconSvg
                    width={iconScale(24)}
                    height={iconScale(24)}
                    color={iconColor}
                  />
                )}
                {route.name === 'ProfileTab' && (
                  <ProfileIconSvg
                    width={iconScale(24)}
                    height={iconScale(24)}
                    color={iconColor}
                  />
                )}
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
        </View>

        <TouchableOpacity style={styles.logButton}>
          <PlusIcon width={24} height={24} />
          <Text style={styles.logButtonText}>Log</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-around',
    backgroundColor: colors.SurfacePrimaryDefault,
    height: moderateScale(72),
    borderRadius: moderateScale(2),
    padding: spacing['Spacing-m'],
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing['Spacing-m'],
    flex: 1,
    paddingHorizontal: spacing['Spacing-10xl'],
    paddingVertical: spacing['Spacing-3xl'],
    borderRadius: moderateScale(2),
  },
  tabButtonActive: {
    backgroundColor: colors.StatesFill2,
  },
  tabText: {
    ...typography.bodySmall2Medium,
  },
  tabTextActive: {
    ...typography.bodySmall2Bold,
    color: colors.PrimaryMain,
  },
  tabTextInactive: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
  },
  logButton: {
    backgroundColor: colors.PrimaryMain,
    // width: moderateScale(72),
    height: moderateScale(72),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(2),
    paddingHorizontal: spacing['Spacing-10xl'],
    paddingVertical: spacing['Spacing-3xl'],
    // shadowColor: colors.PrimaryMain,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 8,
    // elevation: 5,
  },
  logIcon: {
    ...typography.h6Regular,
    color: colors.StatesWhite,
  },
  logButtonText: {
    ...typography.bodySmall1Medium,
    color: colors.StatesWhite,
  },
});
