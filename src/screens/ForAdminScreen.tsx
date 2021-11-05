import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import ForAdminContainer from "../components/forAdmin/container/ForAdminContainer"

type Props = BottomTabScreenProps<RootBottomTabParamList, "ForAdmin">;

export type BottomTabNavigation = Props["navigation"];

function ForAdminScreen({ navigation }: Props) {
   return <ForAdminContainer navigation={navigation} />;
}

export default ForAdminScreen;
