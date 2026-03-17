import React, { useState } from "react";
import { View} from "react-native";

//components
import Screen from "../components/Screen";
import Strip from "../components/Strip";
import LabelledInput from "../sections/LabelledInput";
import Button from "../components/Button";
import DispText from "../components/DispText";
import SmallForm from "../components/SmallForm";
import FormStrip from "../components/FormStript";

//auth
import storage from "../scripts/auth/storage";
import loginUser from "../scripts/utils/loginUser";

//interfaces
import LoginResponse from "../scripts/interfaces/login";

//styles
import { typography } from "../styles/typography";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const {token, user}:LoginResponse = await loginUser({email, password});
    if(user !== undefined) await storage.set(token, user, user.regType);
  };

  return (
    <Screen>
      <SmallForm>
        <FormStrip>
          <DispText text="Login"/>
        </FormStrip>

        <LabelledInput label="Email"
                       inputPlaceholder="Enter email here"
                       value={email}
                       onChange={setEmail}
        />
        <LabelledInput label="Password"
                       inputPlaceholder="Enter password here"
                       value={password}
                       onChange={setPassword}
        /> 

        <FormStrip>
          <Button label="Login" fun={()=> handleLogin()}/>
        </FormStrip>       
      </SmallForm>
    </Screen>
  );
}