import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { SearchiconSvg } from '@/assets/images';
import { Input } from '@/components';
import { colors, radius, spacing } from '@/theme';

import type { SelectContactsSearchBarProps } from './SelectContactsSearchBar.types';

export const SelectContactsSearchBar = ({
  value,
  onChangeText,
  placeholder,
}: SelectContactsSearchBarProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        leftIcon={<SearchiconSvg width={20} height={20} />}
        autoCapitalize="none"
        returnKeyType="search"
        inputContainerStyle={styles.inputContainer}
        textInputStyle={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderRadius: radius.md, // 8px
    // backgroundColor: 'blue',
    paddingVertical: spacing['Spacing-5xl'], // 16px
    backgroundColor: colors.SurfaceSearchBackground,
    paddingHorizontal: spacing['Spacing-5xl'], // 16px
  },
  inputContainer: {
    borderRadius: radius.md, // 8px
    paddingVertical: spacing['Spacing-xl'], // 8px
    paddingHorizontal: spacing['Spacing-3xl'], // 12px
    gap: spacing['Spacing-xl'], // 8px
    backgroundColor: colors.SurfaceSecondaryHover,
    borderWidth: 0,
  },
  textInput: {
    paddingVertical: spacing['Spacing-1'], // 8px
    paddingHorizontal: spacing['Spacing-sm'], // 12px
    gap: spacing['Spacing-xl'], // 8px
  },
});
//
