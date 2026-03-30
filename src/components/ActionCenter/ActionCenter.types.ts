import { type StyleProp, type ViewStyle } from 'react-native';

export type ActionCenterTabType = 'All' | 'Client' | 'Coach';

export interface ActionCenterTab {
  id: ActionCenterTabType;
  label: string;
  count: number;
}

export interface ActionCenterAction {
  id: string;
  title: string;
  description: string;
  onAccept: () => void;
  onReject: () => void;
}

export interface ActionCenterProps {
  tabs: ActionCenterTab[];
  actions: ActionCenterAction[];
  onViewAll?: () => void;
  style?: StyleProp<ViewStyle>;
}

export interface ActionCenterHeaderProps {
  title: string;
  onViewAll?: () => void;
}

export interface ActionCenterTabsProps {
  tabs: ActionCenterTab[];
  activeTab: ActionCenterTabType;
  onTabChange: (tabId: ActionCenterTabType) => void;
}

export interface ActionCenterCardProps {
  action: ActionCenterAction;
}
