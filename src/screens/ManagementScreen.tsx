import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import ManageContainer from "../components/management/container/ManageContainer"

type Props = BottomTabScreenProps<RootBottomTabParamList, "Management">;

export type BottomTabNavigation = Props["navigation"];

function ManagementScreen({ navigation }: Props) {
   return <ManageContainer navigation={navigation} />;
}

export default ManagementScreen;
