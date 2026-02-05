import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type OnboardingStackParamList = {
  Splash: undefined;
  IntroCarousel: undefined;
  GetStarted: undefined;
  OTPVerification: undefined;
  YourDetails: undefined;
  ConnectHealth: undefined;
  PlanPreview: undefined;
};

export type HomeStackParamList = {
  HomeDashboard: undefined;
  ExampleForm: undefined;
  TaskDetails: { taskId?: string } | undefined;
  TaskProgress: { taskId?: string } | undefined;
  TaskCompletion: { taskId?: string } | undefined;
};

export type ShopStackParamList = {
  MealsHome: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
};

export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ShopTab: NavigatorScreenParams<ShopStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type AppStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;

  // Task ActionFlows (tabs hidden, AppStack only)
  CreateTask: { fromScreen?: string } | undefined;
  EditTask: { taskId?: string } | undefined;
  TaskTypeSelection: undefined;
  FrequencySetup: undefined;
  ReminderSetup: undefined;
  TaskSummary: undefined;
  TaskSuccess: undefined;
};

export type RootStackParamList = {
  OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
  AppStack: NavigatorScreenParams<AppStackParamList>;
};

// Typed navigation props for useNavigation<T>() — no `any`
export type OnboardingNavigationProp =
  NativeStackNavigationProp<OnboardingStackParamList>;
export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;
export type ShopStackNavigationProp =
  NativeStackNavigationProp<ShopStackParamList>;
export type ProfileStackNavigationProp =
  NativeStackNavigationProp<ProfileStackParamList>;
export type AppStackNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
