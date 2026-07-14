import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';

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
      const id = await storage.get.profile().then(prof => prof?.regID);
      const key = await storage.get.key().then(key => key);

      if (typeof id === 'number' && typeof key === 'string') {
        const user = new User(id, key);

        const reg_type = await user.getRegType() as RegType;
        setRegType(reg_type);
        setIsLoggedIn(true);
      }
    })();
  }, []);

  function handleBtnPress() {
    setBtnPressed(prev => !prev);
  }
  function handleMicPress() {
    setMicPressed(prev => !prev);
  }

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
        />

        <TouchableOpacity
          style={[
            { ...helpStyles.button },
            { ...helpStyles.search_btn }
          ]}
          onPressIn={() => handleBtnPress()}
          onPressOut={() => handleBtnPress()}
        >
          <Text style={helpStyles.text_mic}>{''}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            { ...helpStyles.button },
            { ...helpStyles.search_btn }
          ]}
          onPressIn={() => handleMicPress()}
          onPressOut={() => handleMicPress()}
        >
          <Text style={helpStyles.text_btn}>{''}</Text>
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
    justifyContent: "space-between",
    width: "100%",
    height: "15%",
    backgroundColor: colors.surface,
    shadowRadius: scale(6),
    elevation: 3
  },
  input: {
    height: "100%",
    width: "80%"
  },
  button: {
    height: "100%",
    width: "10%"
  },
  search_btn: {},
  mic_btn: {},
  text_btn: {},
  text_mic: {}
});