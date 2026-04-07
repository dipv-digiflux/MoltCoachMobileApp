import React, { type ReactElement } from 'react';

import { TransferStatus } from '@/components';

import type { TransferRequest } from '@/components';

// ── Mock Data (replace with Redux/API data when available) ──────────
const MOCK_REQUESTS: TransferRequest[] = [
  {
    id: '1',
    date: '12 March 2024',
    duration: 'Temporary',
    days: 30,
    client: {
      name: 'Sarah Connor',
      status: 'Pending',
    },
    coach: {
      name: 'John Doe',
      status: 'Pending',
    },
  },
  {
    id: '2',
    date: '10 March 2024',
    duration: 'Permanent',
    client: {
      name: 'Jane Smith',
      status: 'Accepted',
    },
    coach: {
      name: 'Mike Johnson',
      status: 'Accepted',
    },
  },
];

export const TransferStatusScreen = (): ReactElement => {
  return <TransferStatus requests={MOCK_REQUESTS} />;
};
