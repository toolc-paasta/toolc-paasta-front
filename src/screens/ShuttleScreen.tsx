import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import ShuttleContainer from "../components/shuttle/container/ShuttleContainer";

type Props = BottomTabScreenProps<RootBottomTabParamList, "Shuttle">;

export type BottomTabNavigation = Props["navigation"];

function ShuttleScreen({ navigation }: Props) {
   return <ShuttleContainer navigation={navigation} />;
}

export default ShuttleScreen;
