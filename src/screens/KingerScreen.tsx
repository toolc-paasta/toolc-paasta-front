import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import KingerContainer from "../components/connectKinger/container/KingerContainer"

type Props = BottomTabScreenProps<RootBottomTabParamList, "Talk">;

export type BottomTabNavigation = Props["navigation"];

function TalkScreen({ navigation }: Props) {
   return <KingerContainer navigation={navigation} />;
}

export default TalkScreen;
