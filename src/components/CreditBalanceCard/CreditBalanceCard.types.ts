import { type StyleProp, type ViewStyle } from 'react-native';

export interface CreditBalanceCardProps {
  balance: number | string;
  label?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
