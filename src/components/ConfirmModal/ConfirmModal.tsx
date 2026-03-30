import React, { type ReactElement } from 'react';
import { Modal, Text, View, TouchableWithoutFeedback } from 'react-native';
import { LiquidGlassView } from '@callstack/liquid-glass';
import Svg, { Path } from 'react-native-svg';

import { Button } from '../Button';

import styles from './ConfirmModal.styles';
import { ConfirmModalProps } from './ConfirmModal.types';

const SendIcon = (): React.ReactElement => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 2L11 13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ConfirmModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel,
  loading = false,
}: ConfirmModalProps): ReactElement => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <LiquidGlassView style={styles.glassOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.iconContainer}>
                <SendIcon />
              </View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  label={confirmLabel}
                  onPress={onConfirm}
                  variant="primary"
                  size="large"
                  fullWidth
                  loading={loading}
                  disabled={loading}
                />
                <Button
                  label={cancelLabel}
                  onPress={onClose}
                  variant="secondary"
                  size="large"
                  fullWidth
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </LiquidGlassView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
