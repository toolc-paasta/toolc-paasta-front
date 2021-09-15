import React from "react";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/UploadNoticeScreen";
import UploadNotice from "../view/UploadNotice";

type Props = {
   navigation: BottomTabNavigation;
};

function noticeBoardContainer({ navigation }: Props) {   

   useEffect(() => {
      
   }, []);

   return <UploadNotice navigation={navigation}/>;
}

export default noticeBoardContainer;
