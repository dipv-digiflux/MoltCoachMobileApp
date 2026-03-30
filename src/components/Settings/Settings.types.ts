import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type SettingsRowType = 'link' | 'switch';

export interface SettingsRowItem {
  id: string;
  label: string;
  subtitle?: string;
  icon?: ReactNode;
  type: SettingsRowType;
  value?: boolean; // For switch
  onPress?: () => void; // For link
  onValueChange?: (value: boolean) => void; // For switch
}

export interface SettingsRowProps extends SettingsRowItem {
  showBottomDivider?: boolean;
}

export interface SettingsSectionProps {
  title: string;
  items: SettingsRowItem[];
  footerButtonLabel?: string;
  onFooterButtonPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}
