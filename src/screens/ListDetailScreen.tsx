import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import ListDetailContainer from "../components/list/container/ListDetailContainer"

type Props = BottomTabScreenProps<RootBottomTabParamList, "ListDetail">;

export type BottomTabNavigation = Props["navigation"];

function ListDetailScreen({ navigation }: Props) {
   return <ListDetailContainer navigation={navigation} />;
}

export default ListDetailScreen;
