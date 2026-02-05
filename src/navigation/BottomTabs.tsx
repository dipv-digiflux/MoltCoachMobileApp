import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from './types';
import { HomeStackNavigator } from './stacks/HomeStack';
import { ShopStackNavigator } from './stacks/ShopStack';
import { ProfileStackNavigator } from './stacks/ProfileStack';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabs() {
  return (
    <BottomTab.Navigator
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
        name="ShopTab"
        component={ShopStackNavigator}
        options={{ title: 'Shop' }}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{ title: 'Profile' }}
      />
    </BottomTab.Navigator>
  );
}
