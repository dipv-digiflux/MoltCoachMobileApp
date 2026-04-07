import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, moderateScale, iconScale, spacing, typography } from '@/theme';

import type {
  BottomSheetFooterProps,
  BottomSheetHeaderProps,
  BottomSheetProps,
  BottomSheetRef,
  BottomSheetSearchProps,
  BottomSheetVariant,
  LoadingType,
  SnapPoint,
} from '@/types/bottomSheet.types';

export type {
  BottomSheetFooterProps,
  BottomSheetHeaderProps,
  BottomSheetProps,
  BottomSheetRef,
  BottomSheetSearchProps,
  BottomSheetVariant,
  LoadingType,
  SnapPoint,
};

// ─── Constants ───────────────────────────────────────────────────────

const SCREEN_HEIGHT = Dimensions.get('window').height;

/** Maximum sheet height — 85 % of the screen. */
const MAX_SHEET_HEIGHT = SCREEN_HEIGHT * 0.85;

/** Maximum sheet height for the fullscreen variant. */
const FULLSCREEN_SHEET_HEIGHT = SCREEN_HEIGHT * 0.92;

/** Minimum sheet body height when the keyboard is open. */
const MIN_SHEET_HEIGHT = moderateScale(200);

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 150,
  mass: 0.8,
  overshootClamping: false,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
} as const;

const OVERLAY_OPACITY = 0.6;
const CLOSE_BUTTON_SIZE = moderateScale(32);
const CLOSE_ICON_SIZE = iconScale(20);
const DRAG_HANDLE_WIDTH = moderateScale(40);
const DRAG_HANDLE_HEIGHT = moderateScale(4);
const DISMISS_VELOCITY_THRESHOLD = 500;
const DISMISS_DISTANCE_RATIO = 0.3;

const OVERLAY_ENTER_DURATION = 300;
const OVERLAY_EXIT_DURATION = 200;

const KEYBOARD_ANIM_DURATION_ANDROID = 100;

/**
 * Fixed chrome overhead above and below the sheet body that must be
 * accounted for when calculating the available height with keyboard:
 *   close-button row height + close-button-row margin
 *   + container paddingBottom + visual buffer at the top.
 */
const FIXED_CHROME_OVERHEAD =
  CLOSE_BUTTON_SIZE + spacing['Spacing-xl'] + spacing['Spacing-xl'];

// ─── Sub-components ──────────────────────────────────────────────────

/** Close button rendered above the header. */
const CloseButton = ({
  onPress,
}: {
  onPress: () => void;
}): React.ReactElement => (
  <Pressable
    style={styles.closeButton}
    onPress={onPress}
    hitSlop={spacing['Spacing-xl']}
    accessibilityRole="button"
    accessibilityLabel="Close bottom sheet"
  >
    <View style={styles.closeIconContainer}>
      <View style={[styles.closeLine, styles.closeLineLeft]} />
      <View style={[styles.closeLine, styles.closeLineRight]} />
    </View>
  </Pressable>
);

/** Drag handle at the top of the sheet. */
const DragHandle = (): React.ReactElement => (
  <View style={styles.dragHandleWrapper}>
    <View style={styles.dragHandle} />
  </View>
);

/** Header section of the bottom sheet. */
const SheetHeader = ({
  config,
}: {
  config: BottomSheetHeaderProps;
}): React.ReactElement => (
  <View style={[styles.headerContainer, config.style]}>
    <View style={styles.headerContent}>
      <View style={styles.headerTextContainer}>
        <Text style={[styles.headerTitle, config.titleStyle]} numberOfLines={2}>
          {config.title}
        </Text>
        {config.subtitle !== undefined ? (
          <Text
            style={[styles.headerSubtitle, config.subtitleStyle]}
            numberOfLines={2}
          >
            {config.subtitle}
          </Text>
        ) : null}
      </View>
      {config.rightElement !== undefined ? (
        <View style={styles.headerRight}>{config.rightElement}</View>
      ) : null}
    </View>
  </View>
);

/** Search bar for the list variant. */
const SearchBar = ({
  config,
}: {
  config: BottomSheetSearchProps;
}): React.ReactElement => (
  <View style={[styles.searchContainer, config.style]}>
    <View style={styles.searchInputWrapper}>
      <View style={styles.searchIcon}>
        <View style={styles.searchIconCircle} />
        <View style={styles.searchIconLine} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder={config.placeholder ?? 'Search…'}
        placeholderTextColor={colors.TextPrimaryDisabled}
        value={config.value}
        onChangeText={config.onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
      {config.value.length > 0 ? (
        <Pressable
          onPress={(): void => config.onChangeText('')}
          hitSlop={spacing['Spacing-xl']}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <View style={styles.clearButton}>
            <View style={[styles.clearLine, styles.clearLineLeft]} />
            <View style={[styles.clearLine, styles.clearLineRight]} />
          </View>
        </Pressable>
      ) : null}
    </View>
  </View>
);

/** Footer section of the bottom sheet. */
const SheetFooter = ({
  config,
  onClose,
}: {
  config: BottomSheetFooterProps;
  onClose: () => void;
}): React.ReactElement => {
  if (config.children !== undefined) {
    return (
      <View style={[styles.footerContainer, config.style]}>
        {config.children}
      </View>
    );
  }

  return (
    <View style={[styles.footerContainer, config.style]}>
      {config.primaryLabel !== undefined ? (
        <Pressable
          style={[
            styles.footerPrimaryButton,
            config.primaryDisabled === true &&
              styles.footerPrimaryButtonDisabled,
          ]}
          onPress={config.onPrimaryPress}
          disabled={
            config.primaryDisabled === true || config.primaryLoading === true
          }
          accessibilityRole="button"
          accessibilityLabel={config.primaryLabel}
        >
          {config.primaryLoading === true ? (
            <ActivityIndicator size="small" color={colors.StatesWhite} />
          ) : (
            <Text style={styles.footerPrimaryLabel}>{config.primaryLabel}</Text>
          )}
        </Pressable>
      ) : null}
      {config.secondaryLabel !== undefined ? (
        <Pressable
          style={styles.footerSecondaryButton}
          onPress={config.onSecondaryPress ?? onClose}
          accessibilityRole="button"
          accessibilityLabel={config.secondaryLabel}
        >
          <Text style={styles.footerSecondaryLabel}>
            {config.secondaryLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

/** Loading state content. */
const LoadingContent = ({
  type,
}: {
  type: 'spinner' | 'skeleton';
}): React.ReactElement => {
  if (type === 'skeleton') {
    return (
      <View style={styles.skeletonContainer}>
        <View style={[styles.skeletonLine, styles.skeletonLineWide]} />
        <View style={[styles.skeletonLine, styles.skeletonLineMedium]} />
        <View style={[styles.skeletonLine, styles.skeletonLineNarrow]} />
        <View style={[styles.skeletonLine, styles.skeletonLineMedium]} />
        <View style={[styles.skeletonLine, styles.skeletonLineWide]} />
      </View>
    );
  }

  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color={colors.PrimaryMain} />
    </View>
  );
};

/** Empty state content. */
const EmptyContent = ({ message }: { message: string }): React.ReactElement => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>{message}</Text>
  </View>
);

// ─── Main Component ──────────────────────────────────────────────────

/**
 * A fully-featured, animated bottom sheet component.
 *
 * ## Features
 * - Smooth open/close animations (react-native-reanimated)
 * - Gesture-driven drag to dismiss (react-native-gesture-handler)
 * - Dynamic height based on content (max 85 % of screen, 92 % for fullscreen)
 * - Sticky header & footer
 * - Scrollable content area
 * - Search bar with dynamic filtering (list variant)
 * - Loading (spinner / skeleton) and empty states
 * - Semi-transparent overlay to block background interaction
 * - Android back button dismissal
 * - Keyboard avoidance — sheet moves above the keyboard automatically
 * - Multiple layout variants: default, form, list, fullscreen
 *
 * @example
 * <BottomSheet
 *   visible={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   header={{ title: 'Select Item', subtitle: 'Choose one' }}
 *   footer={{ primaryLabel: 'Confirm', onPrimaryPress: handleConfirm }}
 *   variant="list"
 *   search={{ value: query, onChangeText: setQuery }}
 * >
 *   {filteredItems.map(item => <ItemRow key={item.id} item={item} />)}
 * </BottomSheet>
 */
export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      visible,
      onClose,
      variant = 'default',
      header,
      footer,
      search,
      loading = false,
      loadingType = 'spinner',
      emptyMessage = 'No data available',
      showOverlay = true,
      dismissOnOverlayTap = true,
      dismissOnDragDown = true,
      dismissOnBackButton = true,
      stickyHeader = true,
      stickyFooter = true,
      children,
      style,
      contentStyle,
      testID,
    },
    ref,
  ): React.ReactElement | null => {
    // ── Safe-area insets (status bar height) ────────────────────────
    const insets = useSafeAreaInsets();

    /**
     * Resolve the status-bar height for the current platform.
     * Android: use StatusBar.currentHeight (always available, not
     *          dependent on SafeAreaProvider inside a Modal).
     * iOS:     use safe-area insets.top.
     */
    const resolvedStatusBarHeight =
      Platform.OS === 'android'
        ? StatusBar.currentHeight ?? moderateScale(24)
        : insets.top;
    // Keep a shared value so worklets can read it on the UI thread.
    const statusBarHeightSV = useSharedValue(resolvedStatusBarHeight);
    useEffect(() => {
      statusBarHeightSV.value = resolvedStatusBarHeight;
    }, [resolvedStatusBarHeight, statusBarHeightSV]);

    // ── Max height (shared value so worklets always see the latest) ──
    const maxHeightShared = useSharedValue(
      variant === 'fullscreen' ? FULLSCREEN_SHEET_HEIGHT : MAX_SHEET_HEIGHT,
    );

    useEffect(() => {
      maxHeightShared.value =
        variant === 'fullscreen' ? FULLSCREEN_SHEET_HEIGHT : MAX_SHEET_HEIGHT;
    }, [variant, maxHeightShared]);

    // ── Animated values ──────────────────────────────────────────────
    // translateY: 0 = fully visible at the bottom, SCREEN_HEIGHT = off-screen
    const translateY = useSharedValue(SCREEN_HEIGHT);
    const overlayOpacity = useSharedValue(0);
    const keyboardHeight = useSharedValue(0);
    const isClosingRef = useRef<boolean>(false);

    // ── Open / Close ─────────────────────────────────────────────────
    const openSheet = useCallback((): void => {
      isClosingRef.current = false;
      translateY.value = withSpring(0, SPRING_CONFIG);
      overlayOpacity.value = withTiming(OVERLAY_OPACITY, {
        duration: OVERLAY_ENTER_DURATION,
        easing: Easing.out(Easing.cubic),
      });
    }, [translateY, overlayOpacity]);

    const closeSheet = useCallback((): void => {
      if (isClosingRef.current) return;
      isClosingRef.current = true;
      Keyboard.dismiss();
      translateY.value = withTiming(
        SCREEN_HEIGHT,
        { duration: OVERLAY_EXIT_DURATION, easing: Easing.in(Easing.cubic) },
        () => {
          runOnJS(onClose)();
        },
      );
      overlayOpacity.value = withTiming(0, {
        duration: OVERLAY_EXIT_DURATION,
        easing: Easing.in(Easing.cubic),
      });
    }, [translateY, overlayOpacity, onClose]);

    // ── Imperative handle ────────────────────────────────────────────
    useImperativeHandle(ref, () => ({
      open: (): void => openSheet(),
      close: closeSheet,
      snapTo: (): void => {
        openSheet();
      },
    }));

    // ── Visibility lifecycle ─────────────────────────────────────────
    useEffect(() => {
      if (visible) {
        isClosingRef.current = false;
        translateY.value = SCREEN_HEIGHT;
        overlayOpacity.value = 0;
        keyboardHeight.value = 0;
        const timer = setTimeout(() => openSheet(), 50);
        return (): void => clearTimeout(timer);
      }
      return undefined;
    }, [visible, openSheet, translateY, overlayOpacity, keyboardHeight]);

    // ── Android back button ──────────────────────────────────────────
    useEffect(() => {
      if (!visible || !dismissOnBackButton) return undefined;

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        (): boolean => {
          closeSheet();
          return true;
        },
      );
      return (): void => subscription.remove();
    }, [visible, dismissOnBackButton, closeSheet]);

    // ── Keyboard handling ────────────────────────────────────────────
    useEffect(() => {
      if (!visible) return undefined;

      const showEvent =
        Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
      const hideEvent =
        Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

      const showSub = Keyboard.addListener(showEvent, e => {
        const duration =
          Platform.OS === 'ios'
            ? Math.max(e.duration, 100)
            : KEYBOARD_ANIM_DURATION_ANDROID;
        keyboardHeight.value = withTiming(e.endCoordinates.height, {
          duration,
          easing: Easing.out(Easing.cubic),
        });
      });

      const hideSub = Keyboard.addListener(hideEvent, () => {
        const duration =
          Platform.OS === 'ios' ? 200 : KEYBOARD_ANIM_DURATION_ANDROID;
        keyboardHeight.value = withTiming(0, {
          duration,
          easing: Easing.in(Easing.cubic),
        });
      });

      return (): void => {
        showSub.remove();
        hideSub.remove();
      };
    }, [visible, keyboardHeight]);

    // ── Gesture handling (on drag handle area only) ──────────────────
    const panGesture = Gesture.Pan()
      .minPointers(1)
      .hitSlop({ top: 20, bottom: 20, left: 40, right: 40 })
      .onUpdate(event => {
        if (!dismissOnDragDown) return;
        // Only allow dragging downward (positive translationY)
        translateY.value = Math.max(0, event.translationY);
      })
      .onEnd(event => {
        if (!dismissOnDragDown) return;

        const shouldDismiss =
          event.velocityY > DISMISS_VELOCITY_THRESHOLD ||
          event.translationY > maxHeightShared.value * DISMISS_DISTANCE_RATIO;

        if (shouldDismiss) {
          runOnJS(closeSheet)();
        } else {
          translateY.value = withSpring(0, SPRING_CONFIG);
        }
      });

    // ── Animated styles ──────────────────────────────────────────────

    /** Sheet slide animation + keyboard offset. */
    const sheetAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value - keyboardHeight.value }],
    }));

    const overlayAnimatedStyle = useAnimatedStyle(() => ({
      opacity: overlayOpacity.value,
    }));

    /**
     * Dynamic maxHeight / minHeight for the sheet body.
     *
     * **Keyboard hidden** → `maxHeight: 85 %` (or 92 % fullscreen).
     *   The sheet sizes to its content up to that cap.
     *
     * **Keyboard visible** → both `minHeight` and `maxHeight` are set
     *   to the available space between the status bar and the keyboard
     *   (minus the close-button-row overhead and container padding).
     *   Setting `minHeight === maxHeight` forces the sheet to expand
     *   and fill the available area, giving TextInputs maximum room.
     */
    const bodyAnimatedStyle = useAnimatedStyle(() => {
      if (keyboardHeight.value > 0) {
        const availableHeight =
          FULLSCREEN_SHEET_HEIGHT -
          keyboardHeight.value -
          statusBarHeightSV.value -
          FIXED_CHROME_OVERHEAD;

        const clampedHeight = Math.min(
          maxHeightShared.value,
          Math.max(availableHeight, MIN_SHEET_HEIGHT),
        );

        return {
          maxHeight: clampedHeight,
          minHeight: clampedHeight,
        };
      }
      return { maxHeight: maxHeightShared.value };
    });

    /**
     * Extra spacer at the bottom of the ScrollView content when the
     * keyboard is visible.  This guarantees the last TextInput can
     * always be scrolled fully into view above the sticky footer.
     */
    const keyboardSpacerStyle = useAnimatedStyle(() => ({
      height: keyboardHeight.value > 0 ? keyboardHeight.value * 0.3 : 0,
    }));

    // ── Determine content state ──────────────────────────────────────
    const hasChildren =
      children !== null && children !== undefined && children !== false;

    const showLoading = loading;
    const showEmpty = !loading && !hasChildren;
    const showContent = !loading && hasChildren;

    // ── Render ───────────────────────────────────────────────────────

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={dismissOnBackButton ? closeSheet : undefined}
      >
        <GestureHandlerRootView style={styles.modalRoot} testID={testID}>
          {/* Overlay */}
          {showOverlay ? (
            <Animated.View style={[styles.overlay, overlayAnimatedStyle]}>
              <Pressable
                style={StyleSheet.absoluteFill}
                onPress={dismissOnOverlayTap ? closeSheet : undefined}
                accessibilityRole="button"
                accessibilityLabel="Close bottom sheet"
              />
            </Animated.View>
          ) : null}

          {/* Sheet — positioned at the bottom, slides via translateY */}
          <Animated.View
            style={[styles.sheetContainer, style, sheetAnimatedStyle]}
          >
            {/* Close button above the sheet */}
            {header?.showCloseButton !== false ? (
              <View style={styles.closeButtonRow}>
                <CloseButton onPress={closeSheet} />
              </View>
            ) : null}

            {/* Sheet body — dynamic height, capped at 85 % screen */}
            <Animated.View style={[styles.sheetBody, bodyAnimatedStyle]}>
              {/* Draggable area: drag handle + sticky header + search */}
              <GestureDetector gesture={panGesture}>
                <Animated.View>
                  <DragHandle />

                  {/* Sticky header */}
                  {header !== undefined && stickyHeader ? (
                    <SheetHeader config={header} />
                  ) : null}

                  {/* Search bar (list variant) */}
                  {search !== undefined ? <SearchBar config={search} /> : null}
                </Animated.View>
              </GestureDetector>

              {/* Scrollable content area */}
              <ScrollView
                style={styles.scrollContent}
                contentContainerStyle={[
                  styles.scrollContentInner,
                  contentStyle,
                ]}
                showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
              >
                {header !== undefined && !stickyHeader ? (
                  <SheetHeader config={header} />
                ) : null}
                {showLoading ? <LoadingContent type={loadingType} /> : null}
                {showEmpty ? <EmptyContent message={emptyMessage} /> : null}
                {showContent ? children : null}
                {footer !== undefined && !stickyFooter ? (
                  <SheetFooter config={footer} onClose={closeSheet} />
                ) : null}
                {/* Extra space so the last input can scroll above the keyboard */}
                <Animated.View style={keyboardSpacerStyle} />
              </ScrollView>

              {/* Sticky footer — always visible at the bottom */}
              {footer !== undefined && stickyFooter ? (
                <SheetFooter config={footer} onClose={closeSheet} />
              ) : null}
            </Animated.View>
          </Animated.View>
        </GestureHandlerRootView>
      </Modal>
    );
  },
);

BottomSheet.displayName = 'BottomSheet';

// ─── Styles ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.OverlayDark,
  },

  /**
   * Sheet outer wrapper.
   * Positioned at the bottom of the screen; `translateY` animates it
   * from off-screen (SCREEN_HEIGHT) to visible (0).
   * NO `top: 0` — the container sizes to its children so the sheet
   * height is driven by content, not by the container.
   */
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-10xl'],
  },

  closeButtonRow: {
    alignItems: 'flex-end',
    marginBottom: spacing['Spacing-xl'],
  },

  closeButton: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    borderRadius: CLOSE_BUTTON_SIZE / 2,
    backgroundColor: colors.OverlayLightGlass,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeIconContainer: {
    width: CLOSE_ICON_SIZE,
    height: CLOSE_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeLine: {
    position: 'absolute',
    width: CLOSE_ICON_SIZE * 0.75,
    height: moderateScale(2),
    backgroundColor: colors.PrimaryMain,
    borderRadius: moderateScale(1),
  },

  closeLineLeft: {
    transform: [{ rotate: '45deg' }],
  },

  closeLineRight: {
    transform: [{ rotate: '-45deg' }],
  },

  /**
   * Sheet body.
   * NO `flex: 1` — the body sizes to its children up to the animated
   * `maxHeight` (85 % screen).  When content exceeds the cap the
   * ScrollView inside handles overflow via scrolling.
   */
  sheetBody: {
    backgroundColor: colors.StatesWhite,
    borderTopLeftRadius: moderateScale(2),
    borderTopRightRadius: moderateScale(2),
    borderBottomLeftRadius: moderateScale(2),
    borderBottomRightRadius: moderateScale(2),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.StatesWhite,
  },

  dragHandleWrapper: {
    alignItems: 'center',
    paddingTop: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-m'],
  },

  dragHandle: {
    width: DRAG_HANDLE_WIDTH,
    height: DRAG_HANDLE_HEIGHT,
    borderRadius: DRAG_HANDLE_HEIGHT / 2,
    backgroundColor: colors.BorderPrimaryDefault,
  },

  headerContainer: {
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingVertical: spacing['Spacing-4xl'],
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  headerTextContainer: {
    flex: 1,
    gap: spacing['Spacing-2xl'],
  },

  headerTitle: {
    ...typography.h0SemiBold,
    color: colors.PrimaryMain,
  },

  headerSubtitle: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },

  headerRight: {
    marginLeft: spacing['Spacing-xl'],
  },

  searchContainer: {
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingBottom: spacing['Spacing-3xl'],
  },

  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.SurfaceSecondaryDefault,
    borderRadius: moderateScale(2),
    paddingHorizontal: spacing['Spacing-3xl'],
    height: moderateScale(44),
    gap: spacing['Spacing-xl'],
  },

  searchIcon: {
    width: iconScale(18),
    height: iconScale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchIconCircle: {
    width: iconScale(12),
    height: iconScale(12),
    borderRadius: iconScale(6),
    borderWidth: moderateScale(1.5),
    borderColor: colors.TextPrimaryDisabled,
  },

  searchIconLine: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: iconScale(5),
    height: moderateScale(1.5),
    backgroundColor: colors.TextPrimaryDisabled,
    borderRadius: moderateScale(1),
    transform: [{ rotate: '45deg' }, { translateX: -1 }, { translateY: -1 }],
  },

  searchInput: {
    flex: 1,
    ...typography.bodySmall1Regular,
    color: colors.PrimaryMain,
    padding: 0,
  },

  clearButton: {
    width: iconScale(16),
    height: iconScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearLine: {
    position: 'absolute',
    width: iconScale(10),
    height: moderateScale(1.5),
    backgroundColor: colors.TextPrimaryDisabled,
    borderRadius: moderateScale(1),
  },

  clearLineLeft: {
    transform: [{ rotate: '45deg' }],
  },

  clearLineRight: {
    transform: [{ rotate: '-45deg' }],
  },

  /**
   * ScrollView style.
   * `flexShrink: 1` lets the ScrollView shrink when the parent
   * (sheetBody) is capped by `maxHeight`, enabling scrolling.
   * No `flexGrow` so the sheet stays compact for small content.
   */
  scrollContent: {
    flexShrink: 1,
  },

  scrollContentInner: {
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingBottom: spacing['Spacing-5xl'],
    flexGrow: 1,
  },

  footerContainer: {
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingVertical: spacing['Spacing-4xl'],
    gap: spacing['Spacing-3xl'],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.StatesOutline,
  },

  footerPrimaryButton: {
    backgroundColor: colors.PrimaryMain,
    borderRadius: moderateScale(2),
    borderWidth: 1,
    borderColor: colors.PrimarySecondary,
    height: moderateScale(52),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: spacing['Spacing-3xl'],
  },

  footerPrimaryButtonDisabled: {
    opacity: 0.5,
  },

  footerPrimaryLabel: {
    ...typography.b1SemiBold,
    color: colors.StatesWhite,
  },

  footerSecondaryButton: {
    height: moderateScale(44),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-3xl'],
  },

  footerSecondaryLabel: {
    ...typography.b1SemiBold,
    color: colors.PrimaryMain,
  },

  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['Spacing-15xl'],
  },

  skeletonContainer: {
    gap: spacing['Spacing-3xl'],
    paddingVertical: spacing['Spacing-5xl'],
  },

  skeletonLine: {
    height: moderateScale(14),
    backgroundColor: colors.SurfacePrimaryDefault,
    borderRadius: moderateScale(4),
  },

  skeletonLineWide: {
    width: '100%',
  },

  skeletonLineMedium: {
    width: '70%',
  },

  skeletonLineNarrow: {
    width: '40%',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['Spacing-15xl'],
  },

  emptyText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
});
