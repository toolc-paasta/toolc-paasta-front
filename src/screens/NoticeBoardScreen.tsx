import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../../App";
import NoticeBoardContainer from "../components/list/container/NoticeBoardContainer";

type Props = StackScreenProps<RootStackParamList, "NoticeBoard">;

export type BottomTabNavigation = Props["navigation"];

function noticeBoardScreen({ navigation, route }: Props) {
   return <NoticeBoardContainer navigation={navigation} route={route} />;
}

export default noticeBoardScreen;
