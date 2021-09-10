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
import MapContainer from "../components/map/container/MapContainer";

type Props = BottomTabScreenProps<RootBottomTabParamList, "Auth">;

export type BottomTabNavigation = Props["navigation"];

export type AuthStackScreenParamList = {
   Login: undefined;
   Signin: undefined;
   Profile: undefined;
   FCM: undefined;
   Map: undefined;
};

const Stack = createStackNavigator<AuthStackScreenParamList>();

function AuthScreen({ navigation }: Props) {
   const auth = useSelector(({ auth }: RootState) => auth);
   return (
      <Stack.Navigator initialRouteName={auth.signined ? "Profile" : "Login"}>
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
         <Stack.Screen
            name="Map"
            component={MapContainer}
            options={{ title: "맵" }}
         />
      </Stack.Navigator>
   );
}
export default AuthScreen;
