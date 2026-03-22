import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

//views
import Login from "./views/Login";
import SplashScreen from "./views/SplashScreen";

//navigation
import Menu from "./navigation/Menu";

//storage
import storage from "./scripts/auth/storage";

//utils
import toaster from "./scripts/utils/toaster";

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
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const connected =
        state.isConnected === true && state.isInternetReachable === true;

      setIsConnected(connected);

      if (!connected) {
        toaster("Network disconnected", "danger");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const state: NetInfoState = await NetInfo.fetch();

        const connected =
          state.isConnected === true &&
          state.isInternetReachable === true;

        if (!connected) {
          toaster("Network disconnected", "danger");
        }
      } catch (error) {
        console.log("Network check failed:", error);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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