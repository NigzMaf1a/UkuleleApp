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

  // On Android, KeyboardAvoidingView's 'height' behavior can cause visible
  // resize/flicker. Prefer android:windowSoftInputMode="adjustResize" in the
  // manifest and skip KeyboardAvoidingView on Android entirely. Swap the
  // condition below if you'd rather keep 'height' behavior after testing.
  const content = (
    <>
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
            {/* Outer wrapper owns elevation + radius so the Android shadow
                isn't clipped by overflow:hidden on the inner container */}
            <View style={styles.modalShadowWrapper}>
              <View style={styles.modalContainer}>

                {/* Header */}
                {title && (
                  <View style={styles.header}>
                    <DispText text={title} variant="h3" />

                    <Pressable
                      onPress={onClose}
                      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                      accessibilityRole="button"
                      accessibilityLabel="Close"
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
            </View>
          </TouchableWithoutFeedback>

        </View>
      </TouchableWithoutFeedback>
    </>
  );

  return (
    <Modal
      transparent
      visible={visible}
      animationType={animationType}
      onRequestClose={onClose}
      accessibilityViewIsModal
      statusBarTranslucent
    >
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView style={styles.flexFill} behavior="padding">
          {content}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.flexFill}>
          {content}
        </View>
      )}
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

  modalShadowWrapper: {
    width: '100%',
    maxWidth: scale(480),
    maxHeight: '85%',
  },

  modalContainer: {
    backgroundColor: colors.background,
    borderRadius: scale(16),
    overflow: 'hidden',
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
    width: "100%",
    height: 100,
    elevation: 3,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
});
