import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheet, Button } from '@/components';
import { CurvedHeader } from '@/components/CurvedHeader';
import { Input } from '@/components/Input';
import { moderateScale, spacing, typography, colors } from '@/theme';

const TAB_BAR_HEIGHT = moderateScale(72);

// For Android, we need to scroll to the input after a short delay to avoid the keyboard from opening and closing immediately.
const SCROLL_TO_INPUT_OFFSET = 100;
const ANDROID_SCROLL_DELAY_MS = 100;

export const HomeDashboardScreen = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [filledValue, setFilledValue] = useState('Filled value');
  const [androidKeyboardHeight, setAndroidKeyboardHeight] = useState(0);
  const insets = useSafeAreaInsets();
  // Refs for the scroll view and the section Y positions.
  const scrollRef = useRef<ScrollView>(null);
  const sectionYRef = useRef<Record<number, number>>({});
  // The padding bottom for the scroll view content.
  const scrollPaddingBottom =
    insets.bottom + spacing['Spacing-15xl'] + TAB_BAR_HEIGHT;

  // Scroll to the focused input.
  const scrollToFocusedInput = useCallback((sectionIndex: number) => {
    const y = sectionYRef.current[sectionIndex];
    if (y === undefined) return;
    const scrollY = Math.max(0, y - SCROLL_TO_INPUT_OFFSET);
    const doScroll = (): void => {
      scrollRef.current?.scrollTo({
        y: scrollY,
        animated: true,
      });
    };
    if (Platform.OS === 'android') {
      setTimeout(doScroll, ANDROID_SCROLL_DELAY_MS);
    } else {
      doScroll();
    }
  }, []);

  // Listen for the keyboard show and hide events on Android to set the keyboard height.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setAndroidKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setAndroidKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // The padding bottom for the scroll view content.
  const scrollContentPaddingBottom =
    scrollPaddingBottom +
    (Platform.OS === 'android' ? androidKeyboardHeight : 0);

  const scrollView = (
    <ScrollView
      ref={scrollRef}
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingBottom: scrollContentPaddingBottom },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Input Boxes</Text>

      <View
        onLayout={e => {
          sectionYRef.current[0] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>
          1. Default (label + placeholder)
        </Text>
        <Input
          label="Email"
          placeholder="you@example.com"
          onFocus={() => scrollToFocusedInput(0)}
        />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[1] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>2. With label hint</Text>
        <Input
          label="Nickname"
          labelHint="(optional)"
          placeholder="Add a nickname"
          onFocus={() => scrollToFocusedInput(1)}
        />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[2] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>3. Required</Text>
        <Input
          label="Email"
          required
          placeholder="you@example.com"
          onFocus={() => scrollToFocusedInput(2)}
        />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[3] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>4. With info icon</Text>
        <Input
          label="Code"
          showInfoIcon
          onInfoPress={() => {}}
          placeholder="Tap (i) for help"
          onFocus={() => scrollToFocusedInput(3)}
        />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[4] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>5. Filled (with value)</Text>
        <Input
          label="Name"
          value={filledValue}
          onChangeText={setFilledValue}
          placeholder="Enter name"
          onFocus={() => scrollToFocusedInput(4)}
        />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[5] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>6. With helper text</Text>
        <Input
          label="Username"
          placeholder="Choose a username"
          helperText="Visible to other users."
          onFocus={() => scrollToFocusedInput(5)}
        />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[6] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>7. Error state</Text>
        <Input
          label="Email"
          required
          error
          errorMessage="Please enter a valid email."
          placeholder="you@example.com"
          onFocus={() => scrollToFocusedInput(6)}
        />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[7] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>8. Disabled</Text>
        <Input label="Read only" value="This cannot be edited." disabled />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[8] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>9. Left text add-on</Text>
        <Input
          label="URL"
          leftText="https://"
          placeholder="example.com"
          onFocus={() => scrollToFocusedInput(8)}
        />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[9] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>10. Right text add-on</Text>
        <Input
          label="Amount"
          placeholder="0.00"
          rightText="USD"
          onFocus={() => scrollToFocusedInput(9)}
        />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[10] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>11. Right button</Text>
        <Input
          label="Code"
          placeholder="Enter code"
          rightButton="Apply"
          onRightButtonPress={() => {}}
          onFocus={() => scrollToFocusedInput(10)}
        />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[11] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>12. Password (secure)</Text>
        <Input
          label="Password"
          placeholder="Enter password"
          secureTextEntry
          onFocus={() => scrollToFocusedInput(11)}
        />
      </View>

      <View
        onLayout={e => {
          sectionYRef.current[12] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>13. With max length</Text>
        <Input
          label="Short code"
          maxLength={10}
          placeholder="Max 10 characters"
          helperText="10 characters maximum"
          onFocus={() => scrollToFocusedInput(12)}
        />
      </View>
      <Button
        label=" Bottom sheet"
        onPress={() => {
          setIsOpen(true);
        }}
      />
      {/* <Text style={styles.sectionLabel}>14. With left icon</Text>
            <Input
              label="Search"
              placeholder="Search..."
              onFocus={scrollToBottomWhenFocused}
              leftIcon={
                <SearchIconSvg
                  width={SEARCH_ICON_SIZE}
                  height={SEARCH_ICON_SIZE}
                />
              }
            />

            <Text style={styles.sectionLabel}>15. With right icon</Text>
            <Input
              label="Search"
              placeholder="Search..."
              onFocus={scrollToBottomWhenFocused}
              rightIcon={
                <SearchIconSvg
                  width={SEARCH_ICON_SIZE}
                  height={SEARCH_ICON_SIZE}
                />
              }
            /> */}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <CurvedHeader>
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView
            style={styles.keyboardAvoid}
            behavior="padding"
            keyboardVerticalOffset={insets.top}
          >
            {scrollView}
          </KeyboardAvoidingView>
        ) : (
          <View style={styles.keyboardAvoid}>{scrollView}</View>
        )}
      </CurvedHeader>
      <BottomSheet
        stickyFooter={true}
        dismissOnDragDown
        dismissOnOverlayTap
        dismissOnBackButton
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        header={{ title: 'Select Item', subtitle: 'Choose one' }}
        footer={{ primaryLabel: 'Confirm', onPrimaryPress: () => null }}
        variant="default"
      >
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Input />
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Input />
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Input />
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Input />
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Input />
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Input />
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Input />
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
        <Input />
        <Text>
          Sync your daily steps, workouts, and energy data to get personalized
          insights and accurate progress tracking.
        </Text>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...typography.h6Bold,
    color: colors.TextPrimaryDefault,
  },
  sectionLabel: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryHover,
    marginTop: spacing['Spacing-11xl'],
    marginBottom: spacing['Spacing-xl'],
  },
  content: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  skipButton: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-2xl'],
    borderRadius: 20,
    backgroundColor: colors.StatesFill2,
  },
  skipButtonPressed: {
    opacity: 0.9,
  },
  skipLabel: {
    ...typography.b1Regular,
    color: colors.PrimaryMain,
  },
  logoWrap: {
    marginBottom: spacing['Spacing-6xl'],
  },
  logo: {
    width: 120,
    height: 40,
  },
  actions: {
    marginTop: spacing['Spacing-10xl'],
    gap: spacing['Spacing-xl'],
  },
});
