import AppLoading from "expo-app-loading";
import React from "react";
import { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./src/modules";
import SnackBar from "rn-animated-snackbar";
import { clearSnackbar } from "./src/modules/snackbar";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { setToken } from "./src/modules/pushToken";

type Props = {
   children: JSX.Element;
};

export default function AppInit({ children }: Props) {
   const [preLoading, setPreloading] = useState(true);
   const loading = useSelector(({ loading }: RootState) => loading);
   const snackbarState = useSelector(({ snackbar }: RootState) => snackbar);

   const dispatch = useDispatch();

   const preload = async (): Promise<void> => {
      try {
         //초기화 작업
         if (Constants.isDevice) {
            const { status: existingStatus } =
               await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
               const { status } = await Notifications.requestPermissionsAsync();
               finalStatus = status;
            }
            if (finalStatus !== "granted") {
               alert("Failed to get push token for push notification!");
               return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            dispatch(setToken({ token: token }));
         } else {
            alert("Must use physical device for Push Notifications");
         }

         if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
               name: "default",
               importance: Notifications.AndroidImportance.MAX,
               vibrationPattern: [0, 250, 250, 250],
               lightColor: "#FF231F7C",
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
   const onFinish = (): void => setPreloading(false);

   if (preLoading) {
      return (
         <AppLoading
            startAsync={preload}
            onError={console.warn}
            onFinish={onFinish}
         />
      );
   }

   return (
      <>
         {children}
         <Spinner
            visible={loading}
            cancelable={true}
            textContent={"Loading..."}
            textStyle={{
               color: "#FFF",
            }}
         />
         <SnackBar
            visible={snackbarState.visible}
            onDismiss={() => dispatch(clearSnackbar())}
            text={snackbarState.snackbar}
            duration={3000}
            containerStyle={{
               position: "absolute",
               bottom: 50,
               left: 10,
               width: "80%",
               zIndex: 200,
            }}
         />
      </>
   );
}
