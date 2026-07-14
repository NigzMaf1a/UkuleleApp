import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

//styles
import { colors } from "../styles/colors";

export default function SplashScreen() {

  const scale = useRef(new Animated.Value(1)).current;

  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {

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

      <Animated.View style={{ transform: [{ scale }] }}>
        <MaterialIcons name="speaker" size={60} color={colors.anim_one} />
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ translateY: bounce }]
        }}
      >
        <FontAwesome5 name="music" size={40} color={colors.anim_two} />
      </Animated.View>

      <Animated.View style={{ transform: [{ scale }] }}>
        <MaterialIcons name="speaker" size={60} color={colors.anim_one} />
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