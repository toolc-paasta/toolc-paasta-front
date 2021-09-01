import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import SearchContainer from "../components/search/container/SearchContainer";

type Props = BottomTabScreenProps<RootBottomTabParamList, "Search">;

export type BottomTabNavigation = Props["navigation"];

function HomeScreen({ navigation }: Props) {
   return <SearchContainer navigation={navigation} />;
}

export default HomeScreen;
