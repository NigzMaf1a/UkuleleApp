import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

//interfaces
import Users from "../scripts/interfaces/user";
import RegType from "../scripts/enums/regType";

//endpoints
import endpoints from "../scripts/utils/endpoints";
import apiFetch from "../scripts/utils/apiFetch";

export default function Registration() {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [gender, setGender] = useState<string>("");
  const [regType, setRegType] = useState<string>("");
  const [dLocation, setDLocation] = useState<string>("");

  async function registerUser() {
    await apiFetch(endpoints.addUser,
      {
        method: 'POST',
        body: JSON.stringify(registrationPayload())
      }
    );
  }

  function registrationPayload(): Users {
    return {
      name: name,
      phoneNo: phoneNo,
      email: email,
      password: password,
      gender: gender,
      regType: regType as RegType,
      dLocation: dLocation,
      accStatus: 'Pending'
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#777"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#777"
        keyboardType="phone-pad"
        style={styles.input}
        value={phoneNo}
        onChangeText={setPhoneNo}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Gender */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(val: string) => setGender(String(val))}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      {/* RegType */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Account Type</Text>
        <Picker
          selectedValue={regType}
          onValueChange={(val: string) => setRegType(String(val))}
          style={styles.picker}
        >
          <Picker.Item label="Select Account Type" value="" />
          <Picker.Item label="Customer" value="Customer" />
          <Picker.Item label="DJ" value="DJ" />
          <Picker.Item label="Mcee" value="Mcee" />
          <Picker.Item label="Storeman" value="Storeman" />
          <Picker.Item label="Accountant" value="Accountant" />
          <Picker.Item label="Dispatchman" value="Dispatchman" />
          <Picker.Item label="Inspector" value="Inspector" />
          <Picker.Item label="Band" value="Band" />
          <Picker.Item label="Supplier" value="Supplier" />
        </Picker>
      </View>

      {/* Location */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Delivery Location</Text>
        <Picker
          selectedValue={dLocation}
          onValueChange={(val: string) => setDLocation(String(val))}
          style={styles.picker}
        >
          <Picker.Item label="Select Location" value="" />
          <Picker.Item label="Nairobi CBD" value="Nairobi CBD" />
          <Picker.Item label="Westlands" value="Westlands" />
          <Picker.Item label="Karen" value="Karen" />
          <Picker.Item label="Langata" value="Langata" />
          <Picker.Item label="Kilimani" value="Kilimani" />
          <Picker.Item label="Eastleigh" value="Eastleigh" />
          <Picker.Item label="Umoja" value="Umoja" />
          <Picker.Item label="Parklands" value="Parklands" />
          <Picker.Item label="Ruiru" value="Ruiru" />
          <Picker.Item label="Ruai" value="Ruai" />
          <Picker.Item label="Gikambura" value="Gikambura" />
          <Picker.Item label="Kitengela" value="Kitengela" />
          <Picker.Item label="Nairobi West" value="Nairobi West" />
          <Picker.Item label="Nairobi East" value="Nairobi East" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.registerBtn} onPress={() => registerUser()}>
        <Text style={styles.registerBtnText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 40,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "#222",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    color: "#444",
    fontWeight: "600",
  },
  picker: {
    width: "100%",
  },
  registerBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  registerBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
