import type { Contact } from 'react-native-contacts';

export interface UseContactsReturn {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
