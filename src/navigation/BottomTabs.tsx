import React, { type ReactElement } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CustomTabBar } from '@components/navigation/CustomTabBar';
import { EarningStackNavigator } from '@navigation/stacks/EarningStack';
import { HomeStackNavigator } from '@navigation/stacks/HomeStack';
import { ProfileStackNavigator } from '@navigation/stacks/ProfileStack';

import type { BottomTabParamList } from '@navigation/types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabs = (): ReactElement => (
  <BottomTab.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}
  >
    <BottomTab.Screen
      name="HomeTab"
      component={HomeStackNavigator}
      options={{ title: 'Home' }}
    />

    <BottomTab.Screen
      name="ProfileTab"
      component={ProfileStackNavigator}
      options={{ title: 'Profile' }}
    />
    <BottomTab.Screen
      name="EarningTab"
      component={EarningStackNavigator}
      options={{ title: 'Earning' }}
    />
  </BottomTab.Navigator>
);
