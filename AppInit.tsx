import AppLoading from "expo-app-loading";
import React from "react";
import { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./src/modules";
import SnackBar from "rn-animated-snackbar";
import { clearSnackbar } from "./src/modules/snackbar";

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
