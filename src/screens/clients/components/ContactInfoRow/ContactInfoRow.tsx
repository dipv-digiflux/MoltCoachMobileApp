import React, { type ReactElement } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { Checkbox } from '@/components/Checkbox';
import { getInitials } from '@/utils/avatar';

import { contactInfoRowStyles as styles } from './ContactInfoRow.styles';

import type { ContactInfoRowProps } from './ContactInfoRow.types';

export const ContactInfoRow = ({
  avatarSource,
  name,
  phoneNumber,
  containerStyle,
  contentContainerStyle,
  imageContainerStyle,
  imageStyle,
  nameTextStyle,
  phoneTextStyle,
  showCheckbox,
  selected,
  onPress,
}: ContactInfoRowProps): ReactElement => {
  const isPressable = onPress !== undefined;
  const initials = getInitials(name);

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={!isPressable}
    >
      <View style={styles.leftContent}>
        <View style={[styles.imageContainer, imageContainerStyle]}>
          {avatarSource ? (
            <Image source={avatarSource} style={[styles.image, imageStyle]} />
          ) : (
            <View style={[styles.placeholderContainer, imageContainerStyle]}>
              <Text style={styles.initialsText}>{initials || '?'}</Text>
            </View>
          )}
        </View>
        <View style={[styles.textContainer, contentContainerStyle]}>
          <Text style={[styles.nameText, nameTextStyle]} numberOfLines={1}>
            {name}
          </Text>
          <Text style={[styles.phoneText, phoneTextStyle]} numberOfLines={1}>
            {phoneNumber}
          </Text>
        </View>
      </View>

      {showCheckbox && (
        <Checkbox
          checked={selected}
          onChange={onPress}
          style={styles.checkbox}
        />
      )}
    </Pressable>
  );
};
