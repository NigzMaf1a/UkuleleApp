import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

//components
import ScrollScreen from "./components/ScrollScreen";

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

  /**
   * Check session when app starts
   */
  const checkSession = async () => {
    const storedRole = await storage.get.role();

    if (storedRole) {
      setRole(storedRole as RegType);
    } else {
      setRole(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkSession();

    /**
     * Poll storage every second
     * (detect login without props)
     */
    const interval = setInterval(checkSession, 1000);

    return () => clearInterval(interval);

  }, []);

  return (

    <NavigationContainer>

      <ScrollScreen>

        <StatusBar style="auto" />

        {loading ? (

          <SplashScreen />

        ) : role ? (

          <Menu regType={role} />

        ) : (

          <Login />

        )}

      </ScrollScreen>

    </NavigationContainer>
  );
}