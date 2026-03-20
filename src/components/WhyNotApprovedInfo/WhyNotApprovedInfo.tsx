import React, { type ReactElement } from 'react';

import { InfoIconSvg } from '@/assets/images';
import { InfoCard } from '@/components/InfoCard';
import { useAppSelector } from '@/store/hooks';
import { colors } from '@/theme';

const INFO_ICON_SIZE = 20;

export const WhyNotApprovedInfo = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <InfoCard
      title={translation.applicationNotApprovedWhyTitle}
      description={translation.applicationNotApprovedWhyDescription}
      icon={
        <InfoIconSvg
          width={INFO_ICON_SIZE}
          height={INFO_ICON_SIZE}
          color={colors.IconTertiarySubtle}
        />
      }
    />
  );
};
