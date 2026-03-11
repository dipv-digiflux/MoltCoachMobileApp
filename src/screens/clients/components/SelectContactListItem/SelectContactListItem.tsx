import React, { type ReactElement } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import {
  CheckedcircleWithBlackBgSvg,
  EmptyRadioCircleSvg,
  ProfilePng,
} from '@/assets/images';

import { styles } from './SelectContactListItem.styles';

import type { SelectContactListItemProps } from './SelectContactListItem.types';

export const SelectContactListItem = ({
  name,
  phoneNumber,
  isSelected,
  onPress,
  avatarSource,
}: SelectContactListItemProps): ReactElement => {
  const resolvedAvatarSource = avatarSource ?? ProfilePng;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.avatarAndTextWrapper}>
        <View style={styles.avatarWrapper}>
          <Image source={resolvedAvatarSource} style={styles.avatarImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.phoneText}>{phoneNumber}</Text>
        </View>
      </View>
      <View style={styles.checkIconWrapper}>
        {isSelected ? (
          <CheckedcircleWithBlackBgSvg width={24} height={24} />
        ) : (
          <EmptyRadioCircleSvg width={24} height={24} />
        )}
      </View>
    </Pressable>
  );
};
