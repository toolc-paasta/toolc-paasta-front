import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../../App";
import ShuttleContainer from "../components/shuttle/container/ShuttleContainer";

type Props = StackScreenProps<RootStackParamList, "Shuttle">;

export type BottomTabNavigation = Props["navigation"];

function ShuttleScreen({ navigation }: Props) {
   return <ShuttleContainer navigation={navigation} />;
}

export default ShuttleScreen;
