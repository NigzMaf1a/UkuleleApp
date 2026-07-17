import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from "react-native";

// components
import MyModal from "../components/MyModal";
import DispText from "../components/DispText";

// styles
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { scale } from "../styles/responsive";

const BAR_COUNT = 7;

interface FancyLoadProps {
  loading: boolean;
}

export default function FancyLoad({ loading }: FancyLoadProps) {
  const bars = useRef(
    Array.from({ length: BAR_COUNT }, () => new Animated.Value(0.25))
  ).current;

  useEffect(() => {
    if (!loading) return;

    const animations = bars.map((bar, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),

          Animated.timing(bar, {
            toValue: 1,
            duration: 320,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(bar, {
            toValue: 0.25,
            duration: 320,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      )
    );

    animations.forEach(animation => animation.start());

    return () => {
      animations.forEach(animation => animation.stop());

      // Reset bars so the animation always starts from the same state
      bars.forEach(bar => bar.setValue(0.25));
    };
  }, [loading, bars]);

  return (
    <MyModal
      visible={loading}
      onClose={() => { }}
      closeOnBackdropPress={false}
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.equalizer}>
          {bars.map((bar, index) => (
            <Animated.View
              key={index}
              style={[
                styles.bar,
                {
                  transform: [{ scaleY: bar }],
                },
              ]}
            />
          ))}
        </View>

        <DispText
          text="Loading..."
          variant="body"
          textColor={colors.textSecondary}
        />
      </View>
    </MyModal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    minWidth: scale(220),
  },

  equalizer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    height: scale(56),
    marginBottom: spacing.md,
  },

  bar: {
    width: scale(7),
    height: scale(44),
    marginHorizontal: scale(3),
    borderRadius: scale(8),
    backgroundColor: colors.primary,
  },
});