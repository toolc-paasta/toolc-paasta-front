import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../../App";
import NoticeContainer from "../components/notice/container/NoticeContainer";

type Props = StackScreenProps<RootStackParamList, "Notice">;

export type StackScreenNavigation = Props["navigation"];

function NoticeScreen({ navigation }: Props) {
   return <NoticeContainer navigation={navigation} />;
}

export default NoticeScreen;
