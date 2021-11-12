import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../../App";
import UploadNoticeContainer from "../components/list/container/UploadNoticeContainer";

type Props = StackScreenProps<RootStackParamList, "ParentBoard">;

export type StackScreenNavigation = Props["navigation"];

function noticeBoardScreen({ navigation }: Props) {
   return <UploadNoticeContainer navigation={navigation} />;
}

export default noticeBoardScreen;
