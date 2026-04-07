import React from 'react';
import { ViewStyle } from 'react-native';

export interface CommonCardProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
}
