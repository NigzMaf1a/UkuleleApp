import React, { useState } from "react";
import { View} from "react-native";

//components
import Screen from "../components/Screen";
import Strip from "../components/Strip";
import LabelledInput from "../sections/LabelledInput";
import Button from "../components/Button";
import DispText from "../components/DispText";

//auth
import storage from "../scripts/auth/storage";
import loginUser from "../scripts/auth/loginUser";

//interfaces
import LoginResponse from "../scripts/interfaces/login";

//styles
import viewStyles from "../styles/views";
import colourStyles from "../styles/colours";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const {token, user}:LoginResponse = await loginUser({email, password});
    if(user !== undefined) await storage.set(token, user);
  };

  return (
    <Screen>
      <View style={viewStyles.login_form}>
        <Strip>
          <DispText text="Login"/>
        </Strip>

        <LabelledInput label="Email"
                       inputPlaceholder="Enter email here"
                       placeholderTextColor={String(colourStyles.text_tertiary)}
                       value={email}
                       onChange={setEmail}
        />
        <LabelledInput label="Password"
                       inputPlaceholder="Enter password here"
                       placeholderTextColor={String(colourStyles.text_tertiary)}
                       value={password}
                       onChange={setPassword}
        /> 

        <Strip>
          <Button label="Login" fun={()=> handleLogin()}/>
        </Strip>       
      </View>
    </Screen>
  );
}