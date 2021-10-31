import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import TalkContainer from "../components/talk/container/TalkContainer"

type Props = BottomTabScreenProps<RootBottomTabParamList, "Shuttle">;

export type BottomTabNavigation = Props["navigation"];

function TalkScreen({ navigation }: Props) {
   return <TalkContainer navigation={navigation} />;
}

export default TalkScreen;
