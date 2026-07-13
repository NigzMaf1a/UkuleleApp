import React, { ReactNode } from 'react';
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

//components
import DispText from './DispText';

//styles
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { scale } from '../styles/responsive';

interface MyModalProps {
  visible: boolean;
  onClose: () => void;

  title?: string;

  children: ReactNode;
  footer?: ReactNode;

  animationType?: 'none' | 'slide' | 'fade';
  closeOnBackdropPress?: boolean;
}

export default function MyModal({
  visible,
  onClose,
  title,
  children,
  footer,
  animationType = 'fade',
  closeOnBackdropPress = true,
}: MyModalProps) {


  return (
    <Modal
      transparent
      visible={visible}
      animationType={animationType}
      onRequestClose={onClose} // required for Android
    >
      <KeyboardAvoidingView
        style={styles.flexFill}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Backdrop */}
        <TouchableWithoutFeedback
          onPress={() => {
            if (closeOnBackdropPress) {
              Keyboard.dismiss();
              onClose();
            }
          }}
        >
          <View style={styles.backdrop}>

            {/* Prevent closing when pressing inside modal */}
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.modalContainer}>

                {/* Header */}
                {title && (
                  <View style={styles.header}>
                    <DispText text={title} variant="h3" />

                    <Pressable
                      onPress={onClose}
                      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    >
                      <DispText text="✕" variant="h3" textColor={colors.textSecondary} />
                    </Pressable>
                  </View>
                )}

                {/* Body — scrollable so long content doesn't overflow/clip */}
                <ScrollView
                  contentContainerStyle={styles.body}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  {children}
                </ScrollView>

                {/* Footer */}
                {footer && (
                  <View style={styles.footer}>
                    {footer}
                  </View>
                )}

              </View>
            </TouchableWithoutFeedback>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },

  modalContainer: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: colors.background,
    borderRadius: scale(16),
    overflow: 'hidden',
    elevation: 10
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },

  body: {
    padding: spacing.md,
  },

  footer: {
    padding: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
