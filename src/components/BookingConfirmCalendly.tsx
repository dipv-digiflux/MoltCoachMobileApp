import React, { type ReactElement, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { colors, spacing } from '@/theme';

import type { BookingConfirmCalendlyProps } from '@/types/components.types';

export const BookingConfirmCalendly = ({
  url,
}: BookingConfirmCalendlyProps): ReactElement => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          paddingHorizontal: spacing['Spacing-5xl'],
          paddingBottom: spacing['Spacing-11xl'],
          backgroundColor: colors.StatesWhite,
        },
        webviewWrapper: {
          flex: 1,
          overflow: 'hidden',
          backgroundColor: colors.StatesWhite,
          borderRadius: spacing['Spacing-xs'],
        },
      }),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.webviewWrapper}>
        <WebView
          source={{ uri: url }}
          startInLoadingState
          javaScriptEnabled
          domStorageEnabled
          style={{ flex: 1, backgroundColor: colors.StatesWhite }}
          containerStyle={{ backgroundColor: colors.StatesWhite }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          injectedJavaScriptBeforeContentLoaded={`
            (function() {
              try {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.appendChild(
                  document.createTextNode(
                    'html, body { background-color: #ffffff !important; } ::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }'
                  )
                );
                document.head.appendChild(style);
                document.documentElement.style.backgroundColor = '#ffffff';
                document.body.style.backgroundColor = '#ffffff';
              } catch (e) {
                // no-op
              }
            })();
            true;
          `}
        />
      </View>
    </View>
  );
};
