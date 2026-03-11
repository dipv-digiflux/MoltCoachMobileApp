import React, { type ReactElement, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import type { CalendlyEvent } from '@/types/calendly.types';

interface BookingConfirmCalendlyProps {
  url: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  onEventScheduled?: (data: CalendlyEvent) => void;
}

/**
 * Calendly WebView component for booking confirmation.
 * Handles event messaging and fallback detection for scheduled events.
 */
export const BookingConfirmCalendly = ({
  url,
  name,
  email,
  phoneNumber,
  onEventScheduled,
}: BookingConfirmCalendlyProps): ReactElement => {
  const calendlyUrl = useMemo((): string => {
    if (!url) {
      return '';
    }

    const urlObj = new URL(url);

    if (name) {
      urlObj.searchParams.append('name', name);
    }
    if (email) {
      urlObj.searchParams.append('email', email);
    }
    if (phoneNumber) {
      // Calendly standard phone field is usually 'phone_number'
      urlObj.searchParams.append('phone_number', phoneNumber);
      // Fallback for some custom question configurations
      urlObj.searchParams.append('a2', phoneNumber);
    }

    urlObj.searchParams.append('embed_domain', 'react-native');
    urlObj.searchParams.append('embed_type', 'Inline');

    return urlObj.toString();
  }, [url, name, email, phoneNumber]);

  const source = useMemo(() => ({ uri: calendlyUrl }), [calendlyUrl]);

  const injectedJS = `
    (function() {
      function sendEvent(data){
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      }

      window.addEventListener("message", function(e){
        if(!e.data) return;

        if(e.data.event && e.data.event.indexOf("calendly") === 0){
          sendEvent(e.data);
        }
      });

      // DOM detection fallback for confirmation screen
      setInterval(function(){
        var bodyText = document.body ? document.body.innerText : "";

        if(
          bodyText.includes("You are scheduled") ||
          bodyText.includes("Booking Confirmed") ||
          bodyText.includes("calendar invitation")
        ){
          sendEvent({ event: "calendly.event_scheduled" });
        }
      }, 1500);
    })();
    true;
  `;

  return (
    <View style={styles.container}>
      <View style={styles.webviewWrapper}>
        <WebView
          source={source}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          style={styles.webview}
          injectedJavaScriptBeforeContentLoaded={injectedJS}
          originWhitelist={['*']}
          mixedContentMode="always"
          thirdPartyCookiesEnabled
          sharedCookiesEnabled
          allowsInlineMediaPlayback
          onMessage={(event): void => {
            try {
              const data = JSON.parse(event.nativeEvent.data) as CalendlyEvent;

              if (
                data?.event === 'calendly.event_scheduled' ||
                data?.type === 'calendly.event_scheduled'
              ) {
                onEventScheduled?.(data);
              }
            } catch {
              // Ignore parse errors from other messages
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webviewWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});
