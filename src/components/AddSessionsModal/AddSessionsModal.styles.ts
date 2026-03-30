import { StyleSheet } from 'react-native';

import { spacing } from '@/theme';

export default StyleSheet.create({
  tabsContainer: {
    marginVertical: spacing['Spacing-5xl'],
  },
  tabs: {
    marginHorizontal: 0,
  },
  formContainer: {
    marginBottom: spacing['Spacing-7xl'],
  },
  fieldsRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-xl'],
  },
  fieldWrap: {
    flex: 1,
  },
});
