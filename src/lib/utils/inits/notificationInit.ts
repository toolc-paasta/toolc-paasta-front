import Constants from "expo-constants";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export default async () => {
   let token: string = "";
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
      token = (await Notifications.getExpoPushTokenAsync()).data;
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

   return token;
};
