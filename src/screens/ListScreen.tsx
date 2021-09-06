import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import ListContainer from "../components/onePage/container/ListContainer"

type Props = BottomTabScreenProps<RootBottomTabParamList, "List">;

export type BottomTabNavigation = Props["navigation"];

function HomeScreen({ navigation }: Props) {
   return <ListContainer navigation={navigation} />;
}

export default HomeScreen;
