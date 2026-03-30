import { colors } from '@/theme';

import type { OverviewCardProps } from '@/components';

export const getClientName = (invitee?: {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}): string => {
  const fullName = `${invitee?.first_name ?? ''} ${
    invitee?.last_name ?? ''
  }`.trim();

  if (fullName) {
    return fullName;
  }

  return invitee?.phone_number || 'Unknown Name';
};

export const SKELETON_COUNT = 4;

export const getOverviewCards = (): OverviewCardProps[] => [
  {
    title: 'Plan Compliance',
    value: '78%',
    subtitle: 'Total Compliance',
    metricsLayout: 'column',
    metrics: [
      { label: 'Steps:', value: '82%', color: colors.MatrixMain },
      { label: 'Food:', value: '74%', color: colors.AccentOrangeDark },
      { label: 'Data sync:', value: '88%', color: colors.MatrixMain },
    ],
  },
  {
    title: 'Goal Velocity',
    value: '74%',
    subtitle: 'Goal Velocity',
    actionText: '3 need plan changes',
    actionColor: colors.AccentOrangeDark,
  },
  {
    title: 'Active Clients',
    value: '24',
    subtitle: 'Total Clients',
    metricsLayout: 'row',
    metrics: [
      { label: '18 Active', type: 'dot', color: colors.MatrixMain },
      {
        label: '4 Inactive',
        type: 'dot',
        color: colors.TextSecondaryDefault,
      },
      { label: '2 Leads', type: 'dot', color: colors.AccentBlueDark },
    ],
  },
  {
    title: 'Clients at Risk',
    value: '4',
    metricsLayout: 'row',
    metrics: [
      { label: '2 High', type: 'dot', color: colors.FeedbackWarningText },
      { label: '2 Medium', type: 'dot', color: colors.AccentOrangeDark },
      { label: '1 Stable', type: 'dot', color: colors.TextSecondaryDefault },
    ],
    actionText: 'Review now',
    actionColor: colors.FeedbackWarningText,
  },
  {
    title: 'Molt Earnings',
    value: '₹48,500',
    subtitle: 'Molt Earnings',
    variant: 'dark',
    metricsLayout: 'row',
    metrics: [{ label: '+12% MoM', type: 'arrow', color: colors.MatrixMain }],
  },
];
