import AppLoading from "expo-app-loading";
import React, { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./src/modules";
import SnackBar from "rn-animated-snackbar";
import { clearSnackbar } from "./src/modules/snackbar";
import * as Notifications from "expo-notifications";
import { setToken } from "./src/modules/pushToken";
import { navigateTo, navigationRef } from "./RootNavigation";
import { setCustomText } from "react-native-global-props";
import notificationInit from "./src/lib/utils/inits/notificationInit";

import { init, logout } from "./src/lib/api/auth";
import { signin } from "./src/modules/auth";
import { usePubNub } from "pubnub-react";
import { StackScreenList } from "./App";
import { colors } from "./src/components/elements/theme";

type Props = {
   children: JSX.Element;
   setInitialRouteName: (
      v: StackScreenList | ((prev: StackScreenList) => StackScreenList)
   ) => void;
};

const customTextProps = {
   style: {
      fontFamily: "Font",
   },
};

export default function AppInit({ children, setInitialRouteName }: Props) {
   const [preLoading, setPreloading] = useState(true);
   const loading = useSelector(({ loading }: RootState) => loading);
   const snackbarState = useSelector(({ snackbar }: RootState) => snackbar);

   const pubnubState = usePubNub();

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

         // 인증 후 정보 받아오기
         // await logout();
         const userInfo = await init();
         if (userInfo) {
            dispatch(signin(userInfo));

            if (userInfo.authority === "ADMIN") {
               setInitialRouteName("Notice");
            } else {
               setInitialRouteName("Home");
            }
            pubnubState.setUUID(userInfo.loginId);
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
               bottom: 20,
               left: 10,
               width: "80%",
               zIndex: 100,
               backgroundColor: colors.primary,
               borderRadius: 20,
               borderColor: colors.primary,
               borderWidth: 3,
            }}
            textStyle={{ color: colors.black }}
         />
      </>
   );
}
