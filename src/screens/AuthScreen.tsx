import React, { useEffect } from "react";
import { RootStackParamList } from "../../App";
import AuthContainer from "../components/auth/container/AuthContainer";
import {
   createStackNavigator,
   StackScreenProps,
} from "@react-navigation/stack";
import SigninContainer from "../components/auth/container/SigninContainer";
import ProfileContainer from "../components/profile/container/ProfileContainer";
import FcmContainer from "../components/fcm/container/FcmContainer";
import LandingContainer from "../components/landing/container/LandingContainer";
import { RootState } from "../modules";
import { useSelector } from "react-redux";

type Props = StackScreenProps<RootStackParamList, "Auth">;

export type StackScreenNavigation = Props["navigation"];

export type AuthStackScreenParamList = {
   Landing: undefined;
   Login: undefined;
   Signin: undefined;
   Profile: undefined;
   FCM: undefined;
};

const Stack = createStackNavigator<AuthStackScreenParamList>();

function AuthScreen({ navigation }: Props) {
   const auth = useSelector(({ auth }: RootState) => auth);

   /*
   useEffect(() => {
      if (auth.signined) {
         if (auth.authority === "ADMIN") {
            navigation.navigate("Notice");
         } else {
            navigation.navigate("Home");
         }
      }
   }, [auth.signined]);
*/
   return (
      <Stack.Navigator initialRouteName={"Landing"}>
         <Stack.Screen
            name="Landing"
            component={LandingContainer}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="Login"
            component={AuthContainer}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="Signin"
            component={SigninContainer}
            options={{ title: "회원가입" }}
         />
         <Stack.Screen
            name="Profile"
            component={ProfileContainer}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="FCM"
            component={FcmContainer}
            options={{ headerShown: false }}
         />
      </Stack.Navigator>
   );
}
export default AuthScreen;
