import React, { type ReactElement } from 'react';
import { Image, Text, View } from 'react-native';

import { contactInfoRowStyles as styles } from './ContactInfoRow.styles';

import type { ContactInfoRowProps } from './ContactInfoRow.types';

/**
 * Compact row for showing a contact avatar, name and phone number.
 *
 * Default design:
 * - Avatar: circular, sized and padded via `ContactInfoRow.styles` using theme tokens
 * - Name: 15px Inter SemiBold (`typography.b2TallSemiBold`)
 * - Phone: 13px Inter Regular (`typography.bodySmall4TallRegular`)
 *
 * Recommended usage:
 * ```tsx
 * <ContactInfoRow
 *   avatarSource={{ uri: 'https://...' }}
 *   name={contact.name}
 *   phoneNumber={contact.phone}
 * />
 *
 * // Optionally override layout or typography:
 * <ContactInfoRow
 *   avatarSource={photo}
 *   name={name}
 *   phoneNumber={phone}
 *   containerStyle={{ marginTop: 12 }}
 *   nameTextStyle={{ color: colors.TextPrimaryStrong }}
 *   phoneTextStyle={{ color: colors.TextSecondaryDefault }}
 * />
 * ```
 */

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
}: ContactInfoRowProps): ReactElement => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.imageContainer, imageContainerStyle]}>
        <Image source={avatarSource} style={[styles.image, imageStyle]} />
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
  );
};
