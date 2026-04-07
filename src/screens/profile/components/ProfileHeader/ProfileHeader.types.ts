export interface ProfileHeaderProps {
  name: string;
  email: string;
  id: string;
  onEditPress?: () => void;
  onCopyIdPress?: () => void;
}
