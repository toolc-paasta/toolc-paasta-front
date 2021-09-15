import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import ParentBoardContainer from "../components/list/container/ParentBoardContainer"

type Props = BottomTabScreenProps<RootBottomTabParamList, "ParentBoard">;

export type BottomTabNavigation = Props["navigation"];

function noticeBoardScreen({ navigation }: Props) {
   return <ParentBoardContainer navigation={navigation} />;
}

export default noticeBoardScreen;
