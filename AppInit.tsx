import AppLoading from "expo-app-loading";
import React, { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./src/modules";
import SnackBar from "rn-animated-snackbar";
import { clearSnackbar } from "./src/modules/snackbar";
import * as Notifications from "expo-notifications";
import { setToken } from "./src/modules/pushToken";
import { navigateTo } from "./RootNavigation";
import { setCustomText } from "react-native-global-props";
import notificationInit from "./src/lib/utils/inits/notificationInit";

type Props = {
   children: JSX.Element;
};

const customTextProps = {
   style: {
      fontFamily: "Font",
   },
};

export default function AppInit({ children }: Props) {
   const [preLoading, setPreloading] = useState(true);
   const loading = useSelector(({ loading }: RootState) => loading);
   const snackbarState = useSelector(({ snackbar }: RootState) => snackbar);

   const dispatch = useDispatch();
   setCustomText(customTextProps);

   // notification 처리 연결
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
         const token = await notificationInit();
         if (token) {
            dispatch(setToken({ token: token }));
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
