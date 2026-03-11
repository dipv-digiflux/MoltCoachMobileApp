import type {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface ContactInfoRowProps {
  avatarSource: ImageSourcePropType;
  name: string;
  phoneNumber: string;

  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;

  imageContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;

  nameTextStyle?: StyleProp<TextStyle>;
  phoneTextStyle?: StyleProp<TextStyle>;
}
