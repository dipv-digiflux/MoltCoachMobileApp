import React, { type ReactElement } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors, moderateScale } from '@/theme';
import { ClientStatusCardProps } from '@/types/components.types';
import { getInitials } from '@/utils/avatar';

import { styles } from './ClientStatusCard.styles';
import { LoadingRing } from './LoadingRing';

// ─── Icons ────────────────────────────────────────────────────────────

const MenuDotsIcon = (): React.ReactElement => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="2" fill={colors.IconSecondaryDefault} />
    <Circle cx="12" cy="12" r="2" fill={colors.IconSecondaryDefault} />
    <Circle cx="12" cy="19" r="2" fill={colors.IconSecondaryDefault} />
  </Svg>
);

const PencilIcon = (): React.ReactElement => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
      stroke={colors.IconSecondaryDefault}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EyeIcon = (): React.ReactElement => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke={colors.IconSecondaryDefault}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="12"
      r="3"
      stroke={colors.IconSecondaryDefault}
      strokeWidth="2"
    />
  </Svg>
);

const EmptyCircleIcon = (): React.ReactElement => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Circle
      cx="12"
      cy="12"
      r="10"
      stroke={colors.IconSecondaryDefault}
      strokeWidth="2"
    />
  </Svg>
);

// ─── Component ────────────────────────────────────────────────────────

export const ClientStatusCard = ({
  name,
  avatarUrl: _avatarUrl,
  type,
  status,
  rows,
  onPress,
  onMenuPress,
  style,
}: ClientStatusCardProps): ReactElement => {
  // Color mapping for status tags
  const getStatusColors = (s: string): { bg: string; text: string } => {
    const statusLower = s.toLowerCase();
    switch (statusLower) {
      case 'invite send':
      case 'invite sent':
        return {
          bg: colors.SurfaceSubtleDisabled,
          text: colors.TextSecondaryDefault,
        };
      case 'in progress':
        return { bg: colors.AccentOrangeLight, text: colors.AccentOrangeDark };
      case 'profile created':
        return { bg: colors.FeedbackSuccessSurface, text: colors.MatrixMain };
      case 'rejected':
        return {
          bg: colors.FeedbackWarningSurface,
          text: colors.FeedbackWarningText,
        };
      case 'approved':
      case 'plan approved':
        return { bg: colors.FeedbackSuccessSurface, text: colors.MatrixMain };
      default:
        return {
          bg: colors.SurfaceSubtleDisabled,
          text: colors.TextSecondaryDefault,
        };
    }
  };

  const statusColors = getStatusColors(status);

  const renderIcon = (iconName?: string): React.ReactNode => {
    switch (iconName) {
      case 'pencil':
        return <PencilIcon />;
      case 'eye':
        return <EyeIcon />;
      case 'circle':
        return <EmptyCircleIcon />;
      case 'spinner':
        return <LoadingRing size={moderateScale(16)} borderWidth={1.5} />;
      case 'dot':
        return <View style={styles.dot} />;
      default:
        return null;
    }
  };

  return (
    <Pressable style={[styles.card, style]} onPress={onPress}>
      <View style={styles.headerRow}>
        {_avatarUrl ? (
          <Image source={{ uri: _avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>{getInitials(name)}</Text>
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <View style={styles.tagRow}>
            <View style={styles.typeTag}>
              <Text style={styles.typeTagText}>{type}</Text>
            </View>
            <View
              style={[styles.statusTag, { backgroundColor: statusColors.bg }]}
            >
              <Text
                style={[styles.statusTagText, { color: statusColors.text }]}
              >
                {status}
              </Text>
            </View>
          </View>
        </View>
        <Pressable onPress={onMenuPress} style={styles.menuButton}>
          <MenuDotsIcon />
        </Pressable>
      </View>

      <View style={styles.rowsContainer}>
        {rows.map((row, index) => (
          <Pressable
            key={index}
            onPress={row.onPress}
            disabled={!row.onPress || row.disabled}
            style={[styles.statusRow]}
          >
            <Text
              style={[
                styles.rowLabel,
                row.disabled ? styles.disabledLabel : null,
              ]}
            >
              {row.label}
            </Text>
            {renderIcon(row.icon)}
            {row.disabled ? <View style={styles.disabledOverlay} /> : null}
          </Pressable>
        ))}
      </View>
    </Pressable>
  );
};
