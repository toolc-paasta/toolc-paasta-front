import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../App";
import AuthContainer from "../components/auth/container/AuthContainer";
import { createStackNavigator } from "@react-navigation/stack";
import SigninContainer from "../components/auth/container/SigninContainer";
import { useSelector } from "react-redux";
import { RootState } from "../modules";
import ProfileContainer from "../components/profile/container/ProfileContainer";
import FcmContainer from "../components/fcm/container/FcmContainer";

type Props = BottomTabScreenProps<RootBottomTabParamList, "Auth">;

export type BottomTabNavigation = Props["navigation"];

export type AuthStackScreenParamList = {
   Login: undefined;
   Signin: undefined;
   Profile: undefined;
   FCM: undefined;
};

const Stack = createStackNavigator<AuthStackScreenParamList>();

function AuthScreen({ navigation }: Props) {
   const auth = useSelector(({ auth }: RootState) => auth);
   return (
      <Stack.Navigator initialRouteName={auth.signined ? "Profile" : "FCM"}>
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
