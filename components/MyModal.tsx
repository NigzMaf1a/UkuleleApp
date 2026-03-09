import React, { ReactNode, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';

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

  /**
   * Android hardware back button support
   */
  useEffect(() => {
    if (!visible) return;

    const backAction = () => {
      onClose();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => subscription.remove();
  }, [visible, onClose]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType={animationType}
      onRequestClose={onClose} // required for Android
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
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              
              {/* Header */}
              {title && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>

                  <Pressable onPress={onClose}>
                    <Text style={styles.closeText}>✕</Text>
                  </Pressable>
                </View>
              )}

              {/* Body */}
              <View style={styles.body}>
                {children}
              </View>

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
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContainer: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },

  closeText: {
    fontSize: 20,
    fontWeight: '600',
  },

  body: {
    padding: 16,
  },

  footer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
  },
});