import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  type ImageStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/theme';
import { HeaderCurvedBg } from '@assets/images';

import type { CurvedHeaderProps } from '@/types/components.types';

export const CURVED_HEADER_DEFAULT_HEIGHT = 120;

const DEFAULT_HEADER_HEIGHT = CURVED_HEADER_DEFAULT_HEIGHT;
const DEFAULT_CONTENT_OVERLAP = 24;

export const CurvedHeader = ({
  children,
  statusBarStyle = 'dark-content',
  headerHeight = DEFAULT_HEADER_HEIGHT,
  backgroundSource = HeaderCurvedBg,
  contentOverlap = DEFAULT_CONTENT_OVERLAP,
}: CurvedHeaderProps): React.ReactElement => {
  const insets = useSafeAreaInsets();

  const headerBgStyle: ImageStyle[] = [
    styles.headerBg,
    { height: headerHeight },
  ];

  const wrapperStyle = [
    styles.wrapper,
    contentOverlap > 0 ? { marginBottom: -contentOverlap } : undefined,
  ];

  const contentOverlayStyle = [
    styles.contentOverlay,
    { paddingTop: insets.top },
  ];

  return (
    <View style={wrapperStyle}>
      <StatusBar
        translucent
        barStyle={statusBarStyle}
        backgroundColor={colors.Transparent}
      />
      <View style={styles.headerContainer}>
        <Image source={backgroundSource} style={headerBgStyle} />
      </View>
      <View style={contentOverlayStyle} pointerEvents="box-none">
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerContainer: {
    position: 'relative',
  },
  headerBg: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  contentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
});
