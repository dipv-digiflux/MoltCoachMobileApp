import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  useWindowDimensions,
  View,
} from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import {
  CollapsibleTableCardProps,
  TableRowProps,
} from './CollapsibleTableCard.types';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TableRow = ({
  id,
  label,
  subLabel = '',
  values,
  columns,
  isHeader = false,
  onPress,
  onPressValue,
  onPressRow,
}: TableRowProps): React.ReactElement => {
  const RowComponent = isHeader || onPressRow ? Pressable : View;

  return (
    <RowComponent
      onPress={isHeader ? onPress : () => onPressRow?.(id, label)}
      style={[styles.row, isHeader && styles.headerRow]}
    >
      <View style={styles.periodCol}>
        {isHeader ? (
          <View>
            <Text style={styles.headerLabelText}>{label}</Text>
            <Text style={styles.headerSubLabelText}>{subLabel}</Text>
          </View>
        ) : (
          <View style={styles.dayRow}>
            <Text style={styles.dayLabelText}>{label}</Text>
            <Text style={styles.daySubLabelText}>{subLabel}</Text>
          </View>
        )}
      </View>

      {columns.slice(1).map((col, index) => (
        <React.Fragment key={col.id}>
          <View style={styles.verticalDivider} />
          <Pressable
            onPress={() => onPressValue?.(id, col.id, values[index], label)}
            disabled={isHeader}
            style={[
              styles.valueCol,
              col.width
                ? { width: col.width }
                : col.flex
                ? { flex: col.flex }
                : {},
            ]}
          >
            <Text
              style={isHeader ? styles.headerValueText : styles.dayValueText}
            >
              {values[index]}
            </Text>
          </Pressable>
        </React.Fragment>
      ))}
    </RowComponent>
  );
};

export const CollapsibleTableCard = ({
  columns,
  sections,
  onPressValue,
  onPressRow,
  isAllDatesSelected = false,
}: CollapsibleTableCardProps): React.ReactElement => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  // Sync expansion state with All Dates toggle and sections change
  React.useEffect(() => {
    if (sections.length > 0) {
      if (isAllDatesSelected) {
        // Expand ALL sections when All Dates is ON
        const allExpanded: Record<string, boolean> = sections.reduce(
          (acc: Record<string, boolean>, section) => {
            acc[section.id] = true;
            return acc;
          },
          {},
        );
        setExpandedSections(allExpanded);
      } else {
        // Expand ONLY the first section by default
        setExpandedSections({ [sections[0].id]: false }); // Default to collapsed if not specified?
        // Wait, previous code expanded ONLY the first one.
        // Let's keep it as is.
        setExpandedSections({ [sections[0].id]: true });
      }
    }
  }, [sections, isAllDatesSelected]);

  const { width: screenWidth } = useWindowDimensions();
  const tableMinWidth = screenWidth - spacing['Spacing-5xl'] * 2;

  const toggleSection = (id: string): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections(prev => {
      const next = { ...prev };
      next[id] = !next[id];
      return next;
    });
  };

  return (
    <View style={styles.card}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[styles.tableContainer, { minWidth: tableMinWidth }]}>
          <View style={styles.topHeader}>
            <View style={styles.periodCol}>
              <Text style={styles.topHeaderText}>{columns[0].label}</Text>
            </View>
            {columns.slice(1).map(col => (
              <React.Fragment key={col.id}>
                <View style={styles.verticalDivider} />
                <View
                  style={[
                    styles.valueCol,
                    col.width
                      ? { width: col.width }
                      : col.flex
                      ? { flex: col.flex }
                      : {},
                  ]}
                >
                  <Text style={styles.topHeaderText}>{col.label}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>

          {sections.map(section => {
            const isExpanded = !!expandedSections[section.id];
            return (
              <View key={section.id} style={styles.sectionContainer}>
                <TableRow
                  id={section.id}
                  label={section.label}
                  subLabel={section.subLabel}
                  values={section.values}
                  columns={columns}
                  isHeader
                  onPress={() => toggleSection(section.id)}
                  onPressValue={onPressValue}
                  onPressRow={onPressRow}
                />
                {isExpanded && (
                  <View style={styles.expandedContent}>
                    {section.rows.map(row => (
                      <TableRow
                        key={row.id}
                        id={row.id}
                        label={row.label}
                        subLabel={row.subLabel}
                        values={row.values}
                        columns={columns}
                        onPressValue={onPressValue}
                        onPressRow={onPressRow}
                      />
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    marginHorizontal: spacing['Spacing-5xl'],
    overflow: 'hidden',
  },
  tableContainer: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    backgroundColor: colors.StatesFill1,
    paddingVertical: spacing['Spacing-xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
  },
  topHeaderText: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
    paddingHorizontal: spacing['Spacing-xl'],
  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: moderateScale(48),
  },
  headerRow: {
    backgroundColor: colors.SurfaceSubtleDefault,
  },
  periodCol: {
    flex: 1,
    minWidth: moderateScale(140),
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-xl'],
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: colors.StatesOutline,
    borderStyle: 'dashed',
  },
  valueCol: {
    width: moderateScale(140),
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-xl'],
  },
  headerLabelText: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
    textTransform: 'uppercase',
  },
  headerSubLabelText: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  headerValueText: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  dayLabelText: {
    ...typography.bodySmall2SemiBold,
    color: colors.TextPrimaryDefault,
  },
  daySubLabelText: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
    textTransform: 'uppercase',
  },
  dayValueText: {
    ...typography.bodySmall2SemiBold,
    color: colors.TextPrimaryDefault,
  },
  expandedContent: {
    backgroundColor: colors.StatesWhite,
  },
});
