import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../styles/colors";

/**
 * SplashScreen
 * Musical splash with animated speakers + music note
 */
export default function SplashScreen() {

  // animated scale for speaker pulse
  const scale = useRef(new Animated.Value(1)).current;

  // animated bounce for music note
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    /**
     * Speaker pulse animation
     */
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.15,
          duration: 600,
          useNativeDriver: true
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true
        })
      ])
    ).start();

    /**
     * Music note bounce animation
     */
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: -15,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })
      ])
    ).start();

  }, []);

  return (

    <View style={styles.container}>

      {/* Speaker left */}
      <Animated.View style={{ transform: [{ scale }] }}>
        <MaterialIcons name="speaker" size={60} color="#6366F1" />
      </Animated.View>

      {/* Music note */}
      <Animated.View
        style={{
          transform: [{ translateY: bounce }]
        }}
      >
        <FontAwesome5 name="music" size={40} color="#3B82F6" />
      </Animated.View>

      {/* Speaker right */}
      <Animated.View style={{ transform: [{ scale }] }}>
        <MaterialIcons name="speaker" size={60} color="#6366F1" />
      </Animated.View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 30
  }

});