import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, iconScale, moderateScale, spacing, typography } from '@/theme';

import { type AccordionProps, type AccordionSize } from './Accordion.types';

// ─── Design tokens (from Figma) ────────────────────────────────────

const ICON_SIZE = iconScale(24);
const BORDER_RADIUS = moderateScale(2);

// ─── Size configurations ────────────────────────────────────────────

const SIZE_CONFIG: Record<
  AccordionSize,
  {
    paddingH: number;
    paddingV: number;
    gap: number;
    titleStyle: typeof typography.bodySmall1Medium;
    contentStyle: typeof typography.bodySmall1Regular;
  }
> = {
  default: {
    paddingH: spacing['Spacing-5xl'],
    paddingV: spacing['Spacing-4xl'],
    gap: spacing['Spacing-3xl'],
    titleStyle: typography.bodySmall1Medium,
    contentStyle: typography.bodySmall1Regular,
  },
  small: {
    paddingH: spacing['Spacing-3xl'],
    paddingV: spacing['Spacing-3xl'],
    gap: spacing['Spacing-xl'],
    titleStyle: typography.bodySmall1Medium,
    contentStyle: typography.bodySmall2Regular,
  },
};

// ─── Chevron icon component ────────────────────────────────────────

type ChevronIconProps = {
  expanded: boolean;
  disabled: boolean;
};

const ChevronIcon = ({
  expanded,
  disabled,
}: ChevronIconProps): React.ReactElement => {
  const rotation = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [expanded, rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '270deg'],
  });

  const iconColor = disabled
    ? colors.IconSecondaryDisabled
    : colors.IconSecondaryDefault;

  return (
    <Animated.View
      style={[
        styles.chevronContainer,
        { transform: [{ rotate: rotateInterpolate }] },
      ]}
    >
      <View
        style={[
          styles.chevron,
          {
            borderTopColor: iconColor,
            borderRightColor: iconColor,
          },
        ]}
      />
    </Animated.View>
  );
};

// ─── Component ──────────────────────────────────────────────────────

/**
 * An accordion component that expands/collapses with smooth animations.
 * Supports two sizes (default, small) and optional left icons.
 *
 * @example
 * <Accordion
 *   title="FAQ Question"
 *   content="This is the answer to the question."
 *   expanded={isExpanded}
 *   onPress={() => setIsExpanded(!isExpanded)}
 * />
 *
 * <Accordion
 *   size="small"
 *   title="Small Accordion"
 *   content="Small accordion content"
 *   leftIcon={<Icon />}
 * />
 */
export const Accordion = ({
  title,
  content,
  expanded = false,
  onPress,
  disabled = false,
  leftIcon,
  size = 'default',
  testID,
  style,
  accessibilityLabel,
}: AccordionProps): React.ReactElement => {
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  const sizeConfig = SIZE_CONFIG[size];
  const isSmall = size === 'small';

  // ── Measure content height ──────────────────────────────────────
  const handleContentLayout = useCallback(
    (event: { nativeEvent: { layout: { height: number } } }): void => {
      const { height } = event.nativeEvent.layout;
      if (height > 0 && contentHeight === 0) {
        setContentHeight(height);
      }
    },
    [contentHeight],
  );

  // ── Animate height ──────────────────────────────────────────────
  useEffect(() => {
    if (contentHeight === 0) return;

    Animated.timing(animatedHeight, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded, contentHeight, animatedHeight]);

  // ── Colors ─────────────────────────────────────────────────────
  const borderColor = useMemo((): string => {
    if (disabled) return colors.BorderPrimaryDisabled;
    return colors.BorderPrimaryDefault;
  }, [disabled]);

  const headerBg = useMemo((): string => {
    if (isSmall && !expanded) {
      return colors.StatesWhite;
    }
    if (isSmall && expanded) {
      return colors.StatesWhite;
    }
    return colors.StatesWhite;
  }, [isSmall, expanded]);

  const contentBg = isSmall
    ? colors.SurfaceSecondaryDefault
    : colors.StatesWhite;

  const titleColor = disabled
    ? colors.TextSecondaryDisabled
    : colors.PrimaryMain;

  const contentColor = disabled
    ? colors.TextSecondaryDisabled
    : isSmall
    ? colors.IconPrimaryDefault
    : colors.TextSecondaryHover;

  // ── Computed styles ────────────────────────────────────────────
  const containerStyle = useMemo(
    () => [
      styles.container,
      isSmall ? styles.containerSmall : styles.containerDefault,
      {
        borderColor,
        backgroundColor: headerBg,
      },
    ],
    [isSmall, borderColor, headerBg],
  );

  const headerStyle = useMemo(
    () => [
      styles.header,
      {
        paddingHorizontal: sizeConfig.paddingH,
        paddingVertical: sizeConfig.paddingV,
        gap: sizeConfig.gap,
      },
    ],
    [sizeConfig],
  );

  const contentContainerStyle = useMemo(
    () => [
      styles.contentContainer,
      {
        backgroundColor: contentBg,
        paddingHorizontal: expanded ? sizeConfig.paddingH : 0,
        paddingVertical: expanded ? sizeConfig.paddingV : 0,
        minHeight: 0,
      },
      isSmall && styles.contentContainerSmall,
    ],
    [contentBg, sizeConfig, isSmall, expanded],
  );

  // ── Animated height ─────────────────────────────────────────────
  const animatedContentHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight || 0],
  });

  // ── Render ─────────────────────────────────────────────────────
  const contentText =
    typeof content === 'string' ? (
      <Text style={[sizeConfig.contentStyle, { color: contentColor }]}>
        {content}
      </Text>
    ) : (
      content
    );

  return (
    <View style={[styles.wrapper, style]} testID={testID}>
      <Pressable
        style={containerStyle}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ expanded, disabled }}
        accessibilityLabel={accessibilityLabel ?? title}
      >
        <View style={headerStyle}>
          {leftIcon !== undefined && (
            <View style={styles.leftIconWrap}>{leftIcon}</View>
          )}

          <View style={styles.titleWrap}>
            <Text style={[sizeConfig.titleStyle, { color: titleColor }]}>
              {title}
            </Text>
          </View>

          <ChevronIcon expanded={expanded} disabled={disabled} />
        </View>
      </Pressable>

      <Animated.View
        style={[
          contentContainerStyle,
          {
            height: animatedContentHeight,
            opacity: animatedHeight,
            minHeight: 0,
          },
          !expanded && contentHeight === 0 && styles.contentHidden,
        ]}
        pointerEvents={expanded ? 'auto' : 'none'}
        collapsable={!expanded}
      >
        <View
          style={styles.contentInner}
          onLayout={handleContentLayout}
          collapsable={false}
        >
          {contentText}
        </View>
      </Animated.View>
    </View>
  );
};

// ─── Static styles ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },

  // ── Container ───────────────────────────────────────────────────
  container: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
  },
  containerDefault: {
    borderWidth: 1,
  },
  containerSmall: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
  },

  // ── Header ──────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIconWrap: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flex: 1,
  },

  // ── Chevron ──────────────────────────────────────────────────────
  chevronContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderTopWidth: moderateScale(1.5),
    borderRightWidth: moderateScale(1.5),
    transform: [{ rotate: '45deg' }],
  },

  // ── Content ──────────────────────────────────────────────────────
  contentContainer: {
    overflow: 'hidden',
    minHeight: 0,
  },
  contentContainerSmall: {
    borderBottomWidth: 1,
    borderBottomColor: colors.BorderPrimaryDefault,
  },
  contentInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  contentHidden: {
    opacity: 0,
  },
});
