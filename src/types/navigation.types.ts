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

export interface EarningStackParamList extends ParamListIndexSignature {
  Earnings: undefined;
  TransactionDetailsScreen: undefined;
}

export interface ProfileStackParamList extends ParamListIndexSignature {
  ProfileHome: undefined;
}

export interface BottomTabParamList extends ParamListIndexSignature {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  EarningTab: NavigatorScreenParams<EarningStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
}

export interface AppStackParamList extends ParamListIndexSignature {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  Earnings: undefined;
  RedeemEarning: undefined;
  AddClient: undefined;
  AddedClients: { selectedContacts: Contact[] } | undefined;
  ImportContacts: undefined;
  SelectContact: undefined;
  CreateTask: { fromScreen?: string; clientName?: string } | undefined;
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
  profile: undefined;
  PaymentMethods: undefined;
  ContactUs: undefined;
  ReferCoach: undefined;
  TransactionHistory: undefined;
  ProfileSettings: undefined;
  TransactionDetails: undefined;
  NewTransfer: undefined;
  TransferStatus: undefined;
  AddAddress: undefined;
  ClientDetail: {
    clientId: string;
    clientName: string;
  };
  ManageTasks: {
    clientName: string;
  };
  SendNudge: { clientId: string } | undefined;
  NudgeSent: { clientId: string; clientName: string; messages: string[] };
  RequestDetails: undefined;
}

export interface RootStackParamList extends ParamListIndexSignature {
  OnboardingStack: NavigatorScreenParams<OnboardingStackParamList>;
  AppStack: NavigatorScreenParams<AppStackParamList>;
}

export type AppScreenName =
  | 'BottomTabs'
  | 'Earnings'
  | 'RedeemEarning'
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
  | 'SuggestedPlan'
  | 'profile'
  | 'PaymentMethods'
  | 'ContactUs'
  | 'ReferCoach'
  | 'TransactionHistory'
  | 'ProfileSettings'
  | 'TransactionDetails'
  | 'ClientDetail'
  | 'ManageTasks'
  | 'SendNudge'
  | 'NudgeSent'
  | 'TransferStatus'
  | 'RequestDetails';

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
export type EarningScreenName = 'Earnings' | 'TransactionDetailsScreen';
export type ProfileScreenName = 'ProfileHome';

export type OnboardingNavigationProp =
  NativeStackNavigationProp<OnboardingStackParamList>;
export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;
export type ShopStackNavigationProp =
  NativeStackNavigationProp<ShopStackParamList>;
export type EarningStackNavigationProp =
  NativeStackNavigationProp<EarningStackParamList>;
export type ProfileStackNavigationProp =
  NativeStackNavigationProp<ProfileStackParamList>;
export type AppStackNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
