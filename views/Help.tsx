import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
// import Voice from '@react-native-voice/voice';

//styles
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { scale } from '../styles/responsive';


//components
import HelpMapper from './help/HelpMapper';
import ScrollScreen from '../components/ScrollScreen';
import DispText from '../components/DispText';

//auth
import storage from '../scripts/auth/storage';

//scripts
import User from '../scripts/classes/user';
import { askAssistant } from '../scripts/ai/assistant';

//enums
import RegType from '../scripts/enums/regType';

export default function Help() {
  const [regType, setRegType] = useState<RegType>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [micPressed, setMicPressed] = useState<boolean>(false);
  const [btnPressed, setBtnPressed] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('')

  const placeholder = 'Enter a help query or double tap ';

  useEffect(() => {
    (async () => {
      const id = await storage.get.profile().then(prof => prof?.RegID);
      const key = await storage.get.key().then(key => key);

      if (typeof id === 'number' && typeof key === 'string') {
        const user = new User(id, key);

        const reg_type = await user.getRegType() as RegType;
        setRegType(reg_type);
        setIsLoggedIn(true);
      }
    })();
  }, []);

  async function handleBtnPress() {

    if (!query.trim()) return;

    const response = await askAssistant(query);

    console.log(response);

  }

  function handleMicPress() {
    setMicPressed(prev => !prev);
  }

  // const startListening = async () => {
  //   try {
  //     await Voice.start('en-US');
  //     setMicPressed(true);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // };

  // const stopListening = async () => {
  //   try {
  //     await Voice.stop();
  //     setMicPressed(false);
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {

  //   Voice.onSpeechResults = (event) => {

  //     if (event.value?.length) {
  //       setQuery(event.value[0]);
  //     }

  //   };

  //   return () => {

  //     Voice.destroy();

  //   };

  // }, []);

  return (
    <ScrollScreen>
      <View style={helpStyles.detail}></View>

      <View style={helpStyles.search}>
        <TextInput
          style={helpStyles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textCaption}
          value={query}
          onChangeText={setQuery}
          multiline
        />

        <TouchableOpacity
          style={helpStyles.micButton}
          onPress={handleMicPress}
        >
          <Text style={helpStyles.micIcon}>🎤</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={helpStyles.sendButton}
          onPress={handleBtnPress}
        >
          <Text style={helpStyles.sendIcon}>➜</Text>
        </TouchableOpacity>
      </View>
    </ScrollScreen>
  );

}

const helpStyles = StyleSheet.create({
  detail: {
    width: "100%",
    height: "85%",
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",

    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,

    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,

    borderRadius: scale(30),

    backgroundColor: "#F4F4F4",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  input: {
    flex: 1,

    minHeight: scale(48),
    maxHeight: scale(120),

    fontSize: scale(15),
    color: colors.primary,

    paddingHorizontal: spacing.sm,
  },

  micButton: {
    width: scale(42),
    height: scale(42),

    borderRadius: scale(21),

    backgroundColor: "#FFF",

    borderWidth: 2,
    borderColor: "#0A84FF",

    justifyContent: "center",
    alignItems: "center",

    marginLeft: spacing.sm,
  },

  sendButton: {
    width: scale(42),
    height: scale(42),

    borderRadius: scale(21),

    backgroundColor: "#0A84FF",

    justifyContent: "center",
    alignItems: "center",

    marginLeft: spacing.sm,
  },

  micIcon: {
    color: "#0A84FF",
    fontSize: scale(18),
  },

  sendIcon: {
    color: "#FFF",
    fontSize: scale(18),
    fontWeight: "bold",
  },
});