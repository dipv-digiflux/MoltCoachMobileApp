import type { InviteWithOnboarding } from './api.types';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Contact } from 'react-native-contacts';

export type OTPVerificationParams =
  | { mode: 'email'; email: string }
  | { mode: 'phone'; phone_number: string; country_code: string };

/** Satisfies ParamListBase so param lists work with createNativeStackNavigator etc. */
interface ParamListIndexSignature {
  [key: string]: object | undefined;
}

export interface OnboardingStackParamList extends ParamListIndexSignature {
  BookingConfirm: undefined;
  BookingConfirmed: undefined;
  OTPVerification: OTPVerificationParams | undefined;
  PlanPreview: undefined;
  GettingThingsReady: undefined;
  RequestAccessScreen: undefined;
}

export interface HomeStackParamList extends ParamListIndexSignature {
  HomeDashboard: undefined;
  ExampleForm: undefined;
  TaskDetails: { taskId?: string } | undefined;
  TaskProgress: { taskId?: string } | undefined;
  TaskCompletion: { taskId?: string } | undefined;
}

export interface ShopStackParamList extends ParamListIndexSignature {
  MealsHome: undefined;
}

export interface ProfileStackParamList extends ParamListIndexSignature {
  ProfileHome: undefined;
}

export interface BottomTabParamList extends ParamListIndexSignature {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ShopTab: NavigatorScreenParams<ShopStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
}

export interface AppStackParamList extends ParamListIndexSignature {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  Earnings: undefined;
  AddClient: undefined;
  AddedClients: { selectedContacts: Contact[] } | undefined;
  ImportContacts: undefined;
  SelectContact: undefined;
  CreateTask: { fromScreen?: string } | undefined;
  EditTask: { taskId?: string } | undefined;
  TaskTypeSelection: undefined;
  FrequencySetup: undefined;
  ReminderSetup: undefined;
  TaskSummary: undefined;
  TaskSuccess: undefined;
  GeneratingPlan: {
    clientName: string;
    inviteData?: InviteWithOnboarding[];
    phoneNumber?: string;
    countryCode?: string;
    skipSuggestedPlan?: boolean;
  };
  SuggestedPlan: {
    clientName: string;
    inviteData?: InviteWithOnboarding[];
    phoneNumber?: string;
    countryCode?: string;
  };
}

export interface RootStackParamList extends ParamListIndexSignature {
  OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
  AppStack: NavigatorScreenParams<AppStackParamList>;
}

export type AppScreenName =
  | 'BottomTabs'
  | 'Earnings'
  | 'AddClient'
  | 'AddedClients'
  | 'ImportContacts'
  | 'SelectContact'
  | 'InviteSent'
  | 'CreateTask'
  | 'EditTask'
  | 'TaskTypeSelection'
  | 'FrequencySetup'
  | 'ReminderSetup'
  | 'TaskSummary'
  | 'TaskSuccess'
  | 'GeneratingPlan'
  | 'SuggestedPlan';

/** Explicit screen names for type-safe navigate() when param list has an index signature. */
export type OnboardingScreenName =
  | 'BookingConfirm'
  | 'BookingConfirmed'
  | 'OTPVerification'
  | 'PlanPreview'
  | 'GettingThingsReady'
  | 'RequestAccessScreen';
export type HomeScreenName =
  | 'HomeDashboard'
  | 'ExampleForm'
  | 'TaskDetails'
  | 'TaskProgress'
  | 'TaskCompletion';
export type ShopScreenName = 'MealsHome';
export type ProfileScreenName = 'ProfileHome';

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
