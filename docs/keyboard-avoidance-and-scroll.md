# Keyboard avoidance and auto-scroll to focused input

This document describes how to implement **keyboard-aware scrolling** in screens that contain form inputs (e.g. `ScrollView` + inputs), so that:

1. **Android:** No persistent colored band or extra height below the screen when the keyboard closes.
2. **Android:** The focused input scrolls into view above the keyboard automatically.
3. **iOS:** Standard `KeyboardAvoidingView` behavior is kept; focused input is scrolled into view.

You can reuse this pattern on any screen (e.g. forms, settings, creation flows) by following the steps below.

---

## 1. Why this approach?

### Problem on Android

- `KeyboardAvoidingView` with `behavior="height"` or `behavior="padding"` often leaves a **persistent band** at the bottom of the screen after the keyboard closes. The view’s layout doesn’t fully reset, so that area stays visible (e.g. background color or image).
- The app already uses `android:windowSoftInputMode="adjustResize"`, so the **window** resizes when the keyboard opens. Using `KeyboardAvoidingView` on top of that causes double adjustment and layout glitches.

### Chosen approach

| Platform    | Strategy                                                                                                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Android** | Do **not** use `KeyboardAvoidingView`. Use `Keyboard` listeners to add **extra bottom padding** to the `ScrollView` content only while the keyboard is visible, and **scroll to the focused input** when it gains focus. |
| **iOS**     | Keep **`KeyboardAvoidingView`** with `behavior="padding"` and **scroll to the focused input** on focus.                                                                                                                  |

Result:

- No persistent band on Android (padding is removed when the keyboard hides).
- Inputs stay visible above the keyboard on both platforms via scroll-on-focus.

---

## 2. What you need in the screen

- A **ScrollView** that contains the form/inputs.
- **Refs** for the ScrollView and for storing each focusable section’s Y position.
- **Platform-specific** wrapper: `KeyboardAvoidingView` on iOS, plain `View` on Android.
- **Keyboard listeners** only on Android (for extra bottom padding).
- **Scroll-on-focus**: when an input is focused, scroll so that input is in view (using stored Y positions).

---

## 3. Step-by-step implementation

### 3.1 Imports

```ts
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  // ... other imports
} from 'react-native';
```

### 3.2 Constants (tune per screen if needed)

```ts
const SCROLL_TO_INPUT_OFFSET = 100; // px from top of visible area for focused input
const ANDROID_SCROLL_DELAY_MS = 300; // delay before scrolling on Android (keyboard animation)
// If you have a tab bar, include its height in bottom padding (see 3.4).
const TAB_BAR_HEIGHT = moderateScale(72);
```

### 3.3 State and refs

```ts
const [androidKeyboardHeight, setAndroidKeyboardHeight] = useState(0);
const scrollRef = useRef<ScrollView>(null);
const sectionYRef = useRef<Record<number, number>>({});
```

- `androidKeyboardHeight`: extra bottom padding for ScrollView content on Android while keyboard is open.
- `scrollRef`: to call `scrollTo` when an input is focused.
- `sectionYRef`: stores the Y position (in scroll content coordinates) of each “section” (e.g. label + input) by index.

### 3.4 Bottom padding for ScrollView content

Compute base padding (safe area + tab bar if any), then add keyboard height on Android:

```ts
const insets = useSafeAreaInsets();
const scrollPaddingBottom =
  insets.bottom + spacing['Spacing-15xl'] + TAB_BAR_HEIGHT; // adjust to your layout

const scrollContentPaddingBottom =
  scrollPaddingBottom + (Platform.OS === 'android' ? androidKeyboardHeight : 0);
```

Use `scrollContentPaddingBottom` in the `ScrollView`’s `contentContainerStyle` (e.g. `paddingBottom: scrollContentPaddingBottom`).

### 3.5 Android: keyboard listeners

Only on Android, subscribe to keyboard show/hide and set the keyboard height used for padding:

```ts
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
```

When the keyboard closes, `androidKeyboardHeight` becomes 0, so the extra padding is removed and the band disappears.

### 3.6 Scroll-to-focused-input callback

When an input is focused, scroll so that its section is in view (e.g. section top at `SCROLL_TO_INPUT_OFFSET` from the top). On Android, a short delay helps after the keyboard starts opening:

```ts
const scrollToFocusedInput = useCallback((sectionIndex: number) => {
  const y = sectionYRef.current[sectionIndex];
  if (y === undefined) return;
  const scrollY = Math.max(0, y - SCROLL_TO_INPUT_OFFSET);
  const doScroll = () => {
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
```

### 3.7 Wrapping each focusable section

For every **focusable** input (or group of label + input), wrap the block in a `View` that reports its Y position, and pass `onFocus` to the input:

- Use **one** wrapper per “section” (e.g. one label + one input).
- In the wrapper’s `onLayout`, store `layout.y` in `sectionYRef.current[sectionIndex]`. That `y` is relative to the ScrollView content, which is what `scrollTo({ y })` expects.
- Give the **input** `onFocus={() => scrollToFocusedInput(sectionIndex)}`.

Example for one section:

```tsx
<View
  onLayout={e => {
    sectionYRef.current[0] = e.nativeEvent.layout.y;
  }}
>
  <Text style={styles.sectionLabel}>Label</Text>
  <Input
    label="Email"
    placeholder="you@example.com"
    onFocus={() => scrollToFocusedInput(0)}
  />
</View>
```

Repeat for each section, incrementing the index (0, 1, 2, …). Skip `onFocus` for non-focusable fields (e.g. disabled inputs).

### 3.8 ScrollView and platform wrapper

- **ScrollView:**

  - `ref={scrollRef}`
  - `contentContainerStyle` with `paddingBottom: scrollContentPaddingBottom`
  - `keyboardShouldPersistTaps="handled"` so taps on buttons work while the keyboard is open.

- **Wrapper:**
  - **iOS:** Wrap the ScrollView in `KeyboardAvoidingView` with `behavior="padding"` and `keyboardVerticalOffset={insets.top}` (or your header height).
  - **Android:** Wrap the ScrollView in a plain `View` with the same flex style (e.g. `style={styles.keyboardAvoid}` with `flex: 1`).

Example:

```tsx
const scrollView = (
  <ScrollView
    ref={scrollRef}
    contentContainerStyle={[
      styles.scrollContent,
      { paddingBottom: scrollContentPaddingBottom },
    ]}
    keyboardShouldPersistTaps="handled"
    // ... rest of props
  >
    {/* sections with onLayout + onFocus as above */}
  </ScrollView>
);

return (
  <View style={styles.container}>
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
  </View>
);
```

---

## 4. Checklist for a new screen

- [ ] Add state `androidKeyboardHeight` and refs `scrollRef`, `sectionYRef`.
- [ ] Compute `scrollContentPaddingBottom` (base padding + Android keyboard height).
- [ ] Add Android-only `useEffect` with `Keyboard.addListener('keyboardDidShow' | 'keyboardDidHide')`.
- [ ] Implement `scrollToFocusedInput(sectionIndex)` and use it in inputs’ `onFocus`.
- [ ] Wrap each focusable section in a `View` with `onLayout` storing `layout.y` in `sectionYRef.current[index]`.
- [ ] Use `KeyboardAvoidingView` only on iOS; use a plain `View` on Android.
- [ ] Set ScrollView `paddingBottom` to `scrollContentPaddingBottom` and `keyboardShouldPersistTaps="handled"`.

---

## 5. Reference: Android manifest

5
Ensure the activity uses `adjustResize` so the window resizes when the keyboard opens (your app already has this):

```xml
android:windowSoftInputMode="adjustResize"
```

---

## 6. Summary

| What                                 | Why                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------- |
| No `KeyboardAvoidingView` on Android | Avoids persistent band and layout glitches when the keyboard closes.      |
| Keyboard listeners on Android        | Add bottom padding only while the keyboard is visible; remove it on hide. |
| Scroll-on-focus with stored Y        | Keeps the focused input above the keyboard on both platforms.             |
| Section wrappers with `onLayout`     | Get scroll-content Y for each section so we can `scrollTo` correctly.     |
| Delayed scroll on Android            | Gives the keyboard and layout time to update before scrolling.            |
| `KeyboardAvoidingView` on iOS only   | Works well on iOS; no need to change existing behavior there.             |

You can copy this pattern into any screen that has a form inside a `ScrollView` and adjust constants (e.g. `SCROLL_TO_INPUT_OFFSET`, `ANDROID_SCROLL_DELAY_MS`, bottom padding) as needed.
