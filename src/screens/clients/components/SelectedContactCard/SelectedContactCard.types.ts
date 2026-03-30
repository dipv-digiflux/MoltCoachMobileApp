import type { ImageSourcePropType } from 'react-native';

export interface SelectedContactCardProps {
  avatarSource?: ImageSourcePropType;
  name: string;
  phoneNumber: string;
  index: number;
}
