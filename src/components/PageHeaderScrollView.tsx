import React, {
  forwardRef,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';
import { ScrollView, type ScrollViewProps, View } from 'react-native';

import { PageHeader } from './PageHeader';

type BaseScrollViewProps = Omit<
  ScrollViewProps,
  'children' | 'stickyHeaderIndices'
>;

type PageHeaderScrollViewProps = BaseScrollViewProps & {
  /** Props forwarded to PageHeader. Required so every page gets a configured header. */
  header: React.ComponentProps<typeof PageHeader>;

  /**
   * Optional content rendered directly under the PageHeader inside the same sticky block.
   * Use this for things like date pickers or tab filters that should scroll together
   * with the header as a single sticky region.
   */
  headerChildren?: ReactNode;

  /**
   * Additional sticky header indices for children AFTER the header block.
   *
   * Example:
   * - header block (PageHeader + headerChildren) is always index 0
   * - first child passed as `children` has logical index 0
   * - to make that child sticky as well, pass extraStickyHeaderIndices={[0]}
   *
   * The component will automatically offset these indices by +1 so they line up
   * with ScrollView's full children array.
   */
  extraStickyHeaderIndices?: number[];
};

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
