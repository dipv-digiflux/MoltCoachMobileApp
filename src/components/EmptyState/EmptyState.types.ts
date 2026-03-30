import { type ReactNode } from 'react';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
}
