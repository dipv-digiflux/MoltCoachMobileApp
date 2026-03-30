export const FILTER_TAB_KEYS = [
  'addClientFilterExistingClient',
  'addClientFilterPotentialLead',
] as const;

export type AddClientFilterTabId = (typeof FILTER_TAB_KEYS)[number];

export interface AddClientFilterProps {
  activeTab: AddClientFilterTabId;
  onTabChange: (tab: AddClientFilterTabId) => void;
}
