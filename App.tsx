import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

//views
import Login from "./views/Login";
import SplashScreen from "./views/SplashScreen";

//navigation
import Menu from "./navigation/Menu";

//storage
import storage from "./scripts/auth/storage";

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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<RegType | null>(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        const storedRole = await storage.get.role();

        setTimeout(() => {
          if (storedRole) {
            setRole(storedRole as RegType);
          } else {
            setRole(null);
          }

          setLoading(false); 
        }, 3000);
      } catch (error) {
        console.log("Session check failed:", error);
        setRole(null);
        setLoading(false);
      }
    };

    initApp();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      {loading ? (
        <SplashScreen />
      ) : role ? (
        <Menu regType={role} />
      ) : (
        <Login setRole={setRole} /> 
      )}
    </NavigationContainer>
  );
}