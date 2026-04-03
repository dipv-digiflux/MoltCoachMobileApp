import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
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
  label,
  subLabel = '',
  value,
  isHeader = false,
  onPress,
  onPressValue,
}: TableRowProps): React.ReactElement => {
  const RowComponent = isHeader ? Pressable : View;

  return (
    <RowComponent
      onPress={isHeader ? onPress : undefined}
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
      <View style={styles.verticalDivider} />
      <Pressable
        onPress={() => onPressValue?.(label, subLabel, value)}
        disabled={isHeader}
        style={styles.valueCol}
      >
        <Text style={isHeader ? styles.headerValueText : styles.dayValueText}>
          {value}
        </Text>
      </Pressable>
    </RowComponent>
  );
};

export const CollapsibleTableCard = ({
  sections,
  onPressValue,
  isAllDatesSelected = false,
}: CollapsibleTableCardProps): React.ReactElement => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  // Sync expansion state with All Dates toggle
  React.useEffect(() => {
    if (sections.length > 0) {
      if (isAllDatesSelected) {
        // Collapse all when All Dates is ON
        setExpandedSections({});
      } else {
        // Expand first section by default when All Dates is OFF
        setExpandedSections({ [sections[0].id]: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, isAllDatesSelected]);

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
      <View style={styles.topHeader}>
        <View style={styles.periodCol}>
          <Text style={styles.topHeaderText}>PERIOD</Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.valueCol}>
          <Text style={styles.topHeaderText}>TASK COMPLETED</Text>
        </View>
      </View>

      {sections.map(section => {
        const isExpanded = !!expandedSections[section.id];
        return (
          <View key={section.id} style={styles.sectionContainer}>
            <TableRow
              label={section.period}
              subLabel={section.dateRange}
              value={section.completion}
              isHeader
              onPress={() => toggleSection(section.id)}
              onPressValue={onPressValue}
            />
            {isExpanded && (
              <View style={styles.expandedContent}>
                {section.rows.map(row => (
                  <TableRow
                    key={row.id}
                    label={row.label}
                    subLabel={row.subLabel}
                    value={row.value}
                    onPressValue={onPressValue}
                  />
                ))}
              </View>
            )}
          </View>
        );
      })}
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
