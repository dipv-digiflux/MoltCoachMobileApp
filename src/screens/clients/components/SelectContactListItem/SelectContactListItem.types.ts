import type { ImageSourcePropType } from 'react-native';

export interface SelectContactListItemProps {
  name: string;
  phoneNumber: string;
  isSelected: boolean;
  onPress?: () => void;
  avatarSource?: ImageSourcePropType;
}
