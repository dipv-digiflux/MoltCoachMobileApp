export interface Client {
  id: string;
  name: string;
  avatarUrl?: string;
  status: string; // e.g. "Active • 3 sessions/week"
}

export interface SearchClientBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  clients: Client[];
  onSelect: (client: Client) => void;
  selectedClientId?: string;
  title?: string;
  placeholder?: string;
  selectButtonLabel?: string;
}

export interface ClientListItemProps {
  client: Client;
  isSelected: boolean;
  onPress: (client: Client) => void;
}
