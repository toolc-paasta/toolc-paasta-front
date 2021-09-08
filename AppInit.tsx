import AppLoading from "expo-app-loading";
import React, { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./src/modules";
import SnackBar from "rn-animated-snackbar";
import { clearSnackbar } from "./src/modules/snackbar";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import { setToken } from "./src/modules/pushToken";
import { navigateTo } from "./RootNavigation";

type Props = {
   children: JSX.Element;
};

export default function AppInit({ children }: Props) {
   const [preLoading, setPreloading] = useState(true);
   const loading = useSelector(({ loading }: RootState) => loading);
   const snackbarState = useSelector(({ snackbar }: RootState) => snackbar);

   const dispatch = useDispatch();

   useEffect(() => {
      // killed 되면 인식 안함
      /*
         {
            to:"Auth",
            params: {
               screen:"Login"
            }
         }
         {
            to:"Auth",
            params: {
               screen:"Login"
               params:{
                  screen:"Profile"
               }
            }
         }
         */
      const subscription_fore = Notifications.addNotificationReceivedListener(
         (notification) => {
            const data = notification.request.content.data;
         }
      );
      const subscription_back =
         Notifications.addNotificationResponseReceivedListener((res) => {
            const data = res.notification.request.content.data;
            if (data.to) {
               navigateTo(data.to, data.params || {});
            }
         });
      return () => {
         subscription_fore.remove();
         subscription_back.remove();
      };
   }, []);

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
               importance: Notifications.AndroidImportance.DEFAULT,
               vibrationPattern: [0, 250, 250, 250],
               lightColor: "#FF231F7C",
            });
         }
         Notifications.setNotificationHandler({
            handleNotification: async () => ({
               shouldShowAlert: true,
               shouldPlaySound: true,
               shouldSetBadge: true,
            }),
         });
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
