import React, { type ReactElement } from 'react';

import { ScreenHeader } from '@/components/ScreenHeader';

export const SelectedContactsHeader = (): ReactElement => {
  return (
    <ScreenHeader
      title="Selected Contacts"
      subtitle="Configure as leads or clients before sending requests."
    />
  );
};
