import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import UploadNoticeContainer from "../components/list/container/UploadNoticeContainer"

type Props = BottomTabScreenProps<RootBottomTabParamList, "ParentBoard">;

export type BottomTabNavigation = Props["navigation"];

function noticeBoardScreen({ navigation }: Props) {
   return <UploadNoticeContainer navigation={navigation} />;
}

export default noticeBoardScreen;
