import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//components
import ScrollScreen from "../components/ScrollScreen";
import BigForm from "../components/BigForm";
import FormStrip from "../components/FormStript";
import LabelledInput from "../sections/LabelledInput";
import LabelledDropdown from "../components/LabelledDropdown";
import Button from "../components/Button";
import DispText from "../components/DispText";
import RegLogRedirector from "../sections/RegLogRedirector";

//navigation
import { AuthStackParamList } from "../navigation/AuthStack";

//interfaces
import Users from "../scripts/interfaces/user";
import RegType from "../scripts/enums/regType";

//endpoints
import endpoints from "../scripts/utils/endpoints";
import apiFetch from "../scripts/utils/apiFetch";

//styles
import { colors } from "../styles/colors";

interface RegisterResponse {
  error?: string;
}

type AuthNavProp = NativeStackNavigationProp<AuthStackParamList>;

const genderItems = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" }
];

const regTypeItems = [
  { label: "Customer", value: "Customer" },
  { label: "DJ", value: "Deejay" },
  { label: "Mcee", value: "Mcee" },
  { label: "Storeman", value: "Store" },
  { label: "Accountant", value: "Accountant" },
  { label: "Dispatchman", value: "Dispatch" },
  { label: "Inspector", value: "Inspector" },
  { label: "Band", value: "Band" },
  { label: "Supplier", value: "Supplier" },
  { label: "Service Provider", value: "Service" }
];

const locationItems = [
  { label: "Nairobi CBD", value: "Nairobi CBD" },
  { label: "Westlands", value: "Westlands" },
  { label: "Karen", value: "Karen" },
  { label: "Langata", value: "Langata" },
  { label: "Kilimani", value: "Kilimani" },
  { label: "Eastleigh", value: "Eastleigh" },
  { label: "Umoja", value: "Umoja" },
  { label: "Parklands", value: "Parklands" },
  { label: "Ruiru", value: "Ruiru" },
  { label: "Ruai", value: "Ruai" },
  { label: "Gikambura", value: "Gikambura" },
  { label: "Kitengela", value: "Kitengela" },
  { label: "Nairobi West", value: "Nairobi West" },
  { label: "Nairobi East", value: "Nairobi East" }
];

export default function Registration() {
  const navigation = useNavigation<AuthNavProp>();

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [gender, setGender] = useState<string>("");
  const [regType, setRegType] = useState<string>("");
  const [dLocation, setDLocation] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  function registrationPayload(): Users {
    return {
      name: name,
      phoneno: phoneNo,
      email: email,
      password: password,
      gender: gender,
      regtype: regType as RegType,
      dlocation: dLocation,
      accstatus: "Pending"
    };
  }

  async function registerUser() {
    setError(null);

    if (!name || !email || !password || !regType) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await apiFetch<RegisterResponse>(endpoints.addUser, {
        method: "POST",
        body: JSON.stringify(registrationPayload())
      });

      if (!response || response.error) {
        setError(response?.error ?? "Registration failed. Please try again.");
        return;
      }

      navigation.navigate("Login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <ScrollScreen>
      <BigForm>
        <FormStrip>
          <DispText text="Create Account" variant="h2" />
        </FormStrip>

        <LabelledInput
          label="Full Name"
          inputPlaceholder="Enter your full name"
          value={name}
          onChange={setName}
          autoCapitalize="words"
          autoComplete="name"
          returnKeyType="next"
        />

        <LabelledInput
          label="Phone Number"
          inputPlaceholder="Enter your phone number"
          value={phoneNo}
          onChange={setPhoneNo}
          keyboardType="phone-pad"
          autoComplete="tel"
          returnKeyType="next"
        />

        <LabelledInput
          label="Email"
          inputPlaceholder="Enter your email"
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          returnKeyType="next"
        />

        <LabelledInput
          label="Password"
          inputPlaceholder="Enter a password"
          value={password}
          onChange={setPassword}
          secureTextEntry
          autoComplete="password"
          returnKeyType="next"
        />

        <LabelledDropdown
          label="Gender"
          values={genderItems}
          selectedValue={gender}
          onValueChange={setGender}
          placeholder="Select Gender"
        />

        <LabelledDropdown
          label="Account Type"
          values={regTypeItems}
          selectedValue={regType}
          onValueChange={setRegType}
          placeholder="Select Account Type"
        />

        <LabelledDropdown
          label="Delivery Location"
          values={locationItems}
          selectedValue={dLocation}
          onValueChange={setDLocation}
          placeholder="Select Location"
        />

        {error && (
          <FormStrip>
            <DispText text={error} variant="caption" textColor={colors.danger} />
          </FormStrip>
        )}

        <RegLogRedirector view="register" />

        <FormStrip>
          <Button label="Register" fun={registerUser} />
        </FormStrip>
      </BigForm>
    </ScrollScreen>
  );
}
