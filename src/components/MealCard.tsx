import React, { ReactElement } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

import { ArrowRightIconSvg } from '@/assets/images';
import { Chip } from '@/components';
import { colors, fontScale, moderateScale, spacing, typography } from '@/theme';

import { MealCardProps } from './MealCard.types';

export const MealCard = ({
  name,
  kcal,
  macros,
  image,
  statusType = 'not_logged',
  tags = [],
  containerStyle,
}: MealCardProps): ReactElement => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.imageContainer}>
        {typeof image === 'string' ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image source={image} style={styles.image} />
        )}
        {statusType === 'logged_molt' && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Delicut</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <ArrowRightIconSvg
            width={moderateScale(12)}
            height={moderateScale(12)}
          />
        </View>

        <Text style={styles.stats}>{`${kcal} Kcal  •  ${macros}`}</Text>

        {tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {tags.map((tag, idx) => (
              <Chip key={idx} label={tag} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: spacing['Spacing-xl'],
    gap: spacing['Spacing-m'],
  },
  imageContainer: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(6),
    overflow: 'hidden',
    backgroundColor: colors.SurfacePrimaryDefault,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: moderateScale(2),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    ...typography.b1SemiBold,
    color: colors.PrimaryMain,
    flex: 1,
    marginRight: spacing['Spacing-xs'],
  },
  stats: {
    ...typography.bodySmall3Medium,
    color: colors.PrimarySecondary,
    marginTop: spacing['Spacing-xs'],
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: spacing['Spacing-m'],
    marginTop: spacing['Spacing-m'],
    marginBottom: spacing['Spacing-m'],
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: moderateScale(2),
    alignItems: 'center',
  },
  overlayText: {
    ...typography.bodySmall3Regular,
    color: colors.StatesWhite,
    fontSize: fontScale(8),
  },
});
