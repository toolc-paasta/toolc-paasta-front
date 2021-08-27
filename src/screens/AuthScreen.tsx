import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "../../App";
import AuthContainer from "../components/auth/container/AuthContainer";

// 이거처럼 해서 뽑아서 Params 타입으로 하면 됨.
type Props = BottomTabScreenProps<RootBottomTabParamList, "Auth">;

// 이건 navigation 타입.
export type BottomTabNavigation = Props["navigation"];

function AuthScreen({ navigation }: Props) {
   return <AuthContainer navigation={navigation} />;
}
export default AuthScreen;
