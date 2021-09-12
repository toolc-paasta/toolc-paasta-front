import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import NoticeBoardContainer from "../components/list/container/NoticeBoardContainer"

type Props = BottomTabScreenProps<RootBottomTabParamList, "NoticeBoard">;

export type BottomTabNavigation = Props["navigation"];

function noticeBoardScreen({ navigation }: Props) {
   return <NoticeBoardContainer navigation={navigation} />;
}

export default noticeBoardScreen;
