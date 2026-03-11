import React, {
  forwardRef,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { ScrollView, View } from 'react-native';

import { PageHeader } from '@/components/PageHeader';

import type { PageHeaderScrollViewProps } from '@/types/components.types';

export const PageHeaderScrollView = forwardRef<
  ScrollView,
  PropsWithChildren<PageHeaderScrollViewProps>
>(
  (
    {
      header,
      headerChildren,
      extraStickyHeaderIndices,
      children,
      ...scrollViewProps
    },
    ref,
  ): ReactElement => {
    const extraSticky: number[] = extraStickyHeaderIndices ?? [];

    // Always treat the header block as the first sticky index.
    // When there are no extra sticky items, this is just [0].
    const stickyHeaderIndices: number[] = [
      0,
      ...extraSticky.map(index => index + 1),
    ];

    return (
      <ScrollView
        {...scrollViewProps}
        ref={ref}
        stickyHeaderIndices={stickyHeaderIndices}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View>
          <PageHeader {...header}>{headerChildren}</PageHeader>
        </View>
        {children}
      </ScrollView>
    );
  },
);

PageHeaderScrollView.displayName = 'PageHeaderScrollView';
