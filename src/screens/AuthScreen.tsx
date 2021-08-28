import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../App";
import AuthContainer from "../components/auth/container/AuthContainer";
import { createStackNavigator } from "@react-navigation/stack";
import SigninContainer from "../components/auth/container/SigninContainer";

type Props = BottomTabScreenProps<RootBottomTabParamList, "Auth">;

export type BottomTabNavigation = Props["navigation"];

export type AuthStackScreenParamList = {
   Login: undefined;
   Signin: undefined;
};
const Stack = createStackNavigator<AuthStackScreenParamList>();

function AuthScreen({ navigation }: Props) {
   return (
      <Stack.Navigator initialRouteName="Login">
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
      </Stack.Navigator>
   );
}
export default AuthScreen;
