import React, { useState, useEffect } from "react";

//components
import ScrollScreen from "../components/ScrollScreen";
import SmallForm from "../components/SmallForm";
import FormStrip from "../components/FormStript";
import LabelledInput from "../sections/LabelledInput";
import Button from "../components/Button";
import DispText from "../components/DispText";
import RegLogRedirector from "../sections/RegLogRedirector";

//auth
import storage from "../scripts/auth/storage";
import loginUser from "../scripts/utils/loginUser";

//interfaces
import LoginResponse from "../scripts/interfaces/login";

//styles
import { colors } from "../styles/colors";
import RegType from "../scripts/enums/regTypeTwo";

interface LoginProps {
  setRole: (role: RegType | null) => void;
}

export default function Login({ setRole }: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(password);
  }, [password]);

  const handleLogin = async () => {
    setError(null);

    try {
      const { token, user }: LoginResponse = await loginUser({ email, password });

      if (user !== undefined) {
        await storage.set(token, user.RegType, user);
        setRole(user.RegType as RegType);
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login screen:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <ScrollScreen
      contentContainerStyle={{
        justifyContent: "center",
      }}
    >
      <SmallForm>
        <FormStrip>
          <DispText text="Login" variant="h2" />
        </FormStrip>

        <LabelledInput
          label="Email"
          inputPlaceholder="Enter email here"
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          returnKeyType="next"
        />

        <LabelledInput
          label="Password"
          inputPlaceholder="Enter password here"
          value={password}
          onChange={setPassword}
          autoComplete="password"
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        {error && (
          <FormStrip>
            <DispText text={error} variant="caption" textColor={colors.danger} />
          </FormStrip>
        )}

        <RegLogRedirector view="login" />

        <FormStrip>
          <Button label="Login" fun={handleLogin} />
        </FormStrip>
      </SmallForm>
    </ScrollScreen>
  );
}
