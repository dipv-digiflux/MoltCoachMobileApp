import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
  DropdownOption,
  DropdownValue,
  UseDropdownConfig,
  UseDropdownReturn,
} from '@/types/dropdown.types';

const DEBOUNCE_MS = 250;

const normalizeToArray = (
  val?: DropdownValue | ReadonlyArray<DropdownValue>,
): ReadonlyArray<DropdownValue> => {
  if (val === undefined || val === null) return [];
  if (typeof val === 'string' || typeof val === 'number') return [val];
  return val;
};

export const useDropdown = ({
  options,
  multiple,
  value,
  defaultValue,
  onChange,
  closeOnSelect,
}: UseDropdownConfig): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<
    ReadonlyArray<DropdownValue>
  >(() => normalizeToArray(defaultValue));

  const selectedValues = isControlled ? normalizeToArray(value) : internalValue;

  // ── Debounced search ──────────────────────────────────────
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setDebouncedTerm(searchTerm),
      DEBOUNCE_MS,
    );
    return (): void => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [searchTerm]);

  // ── Filtered & sorted options ─────────────────────────────
  const filteredOptions = useMemo((): ReadonlyArray<DropdownOption> => {
    const term = debouncedTerm.toLowerCase().trim();
    const filtered =
      term.length === 0
        ? [...options]
        : options.filter(opt => opt.label.toLowerCase().includes(term));

    if (selectedValues.length > 0 && multiple) {
      const selectedSet = new Set(selectedValues);
      return [...filtered].sort((a, b) => {
        const aIdx = selectedSet.has(a.value) ? 0 : 1;
        const bIdx = selectedSet.has(b.value) ? 0 : 1;
        return aIdx - bIdx;
      });
    }

    return filtered;
  }, [options, debouncedTerm, selectedValues, multiple]);

  // ── Selection helpers ─────────────────────────────────────
  const isSelected = useCallback(
    (val: DropdownValue): boolean => selectedValues.includes(val),
    [selectedValues],
  );

  const toggleOption = useCallback(
    (optionValue: DropdownValue): void => {
      if (multiple) {
        const next = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue];
        if (!isControlled) setInternalValue(next);
        onChange(next);
      } else {
        if (!isControlled) setInternalValue([optionValue]);
        onChange(optionValue);
        if (closeOnSelect) {
          setIsOpen(false);
          setSearchTerm('');
          setDebouncedTerm('');
        }
      }
    },
    [multiple, selectedValues, isControlled, onChange, closeOnSelect],
  );

  const selectAll = useCallback((): void => {
    const all = options.filter(o => o.disabled !== true).map(o => o.value);
    if (!isControlled) setInternalValue(all);
    onChange(all);
  }, [options, isControlled, onChange]);

  const clearSelection = useCallback((): void => {
    if (!isControlled) setInternalValue([]);
    onChange([]);
  }, [isControlled, onChange]);

  // ── Display text ──────────────────────────────────────────
  const displayText = useMemo((): string => {
    if (selectedValues.length === 0) return '';
    const labels = selectedValues
      .map(v => options.find(o => o.value === v)?.label)
      .filter((l): l is string => l !== undefined);
    return labels.join(', ');
  }, [selectedValues, options]);

  // ── Open / Close ──────────────────────────────────────────
  const open = useCallback((): void => setIsOpen(true), []);

  const close = useCallback((): void => {
    setIsOpen(false);
    setSearchTerm('');
    setDebouncedTerm('');
  }, []);

  return {
    isOpen,
    open,
    close,
    searchTerm,
    setSearchTerm,
    filteredOptions,
    selectedValues,
    isSelected,
    toggleOption,
    selectAll,
    clearSelection,
    displayText,
  };
};
