import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import NoticeContainer from "../components/notice/container/NoticeContainer";

type Props = BottomTabScreenProps<RootBottomTabParamList, "Notice">;

export type BottomTabNavigation = Props["navigation"];

function TalkScreen({ navigation }: Props) {
   return <NoticeContainer navigation={navigation} />;
}

export default TalkScreen;
