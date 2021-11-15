import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../../App";
import ParentBoardContainer from "../components/list/container/ParentBoardContainer";

type Props = StackScreenProps<RootStackParamList, "ParentBoard">;

export type BottomTabNavigation = Props["navigation"];

function noticeBoardScreen({ navigation }: Props) {
   return <ParentBoardContainer navigation={navigation} />;
}

export default noticeBoardScreen;
