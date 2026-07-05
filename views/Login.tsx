import React, { useState } from "react";
import { View } from "react-native";

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
import { containerStyles } from "../styles/containerStyles";{}
import { colors } from "../styles/colors";
import { flexStyles } from "../styles/flexStyles";
import { spacing } from "../styles/spacing";
type RegType =
  | "Customer"
  | "Band"
  | "Accountant"
  | "Deejay"
  | "Dispatch"
  | "Inspector"
  | "Mcee"
  | "Service"
  | "Store"
  | "Supplier";

interface LoginProps {
  setRole: (role: RegType | null) => void;
}

export default function Login({ setRole }: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const { token, user }: LoginResponse = await loginUser({ email, password });

    if (user !== undefined) {
      await storage.set(token, user.regType, user);
      setRole(user.regType as RegType);
    }
  };

  return (
    <Screen>
      <SmallForm>
        <FormStrip>
          <DispText text="Login" />
        </FormStrip>

        <LabelledInput
          label="Email"
          inputPlaceholder="Enter email here"
          value={email}
          onChange={setEmail}
        />

        <LabelledInput
          label="Password"
          inputPlaceholder="Enter password here"
          value={password}
          onChange={setPassword}
        />

        <FormStrip>
          <Button label="Login" fun={() => handleLogin()} />
        </FormStrip>
      </SmallForm>
    </Screen>
  );
}