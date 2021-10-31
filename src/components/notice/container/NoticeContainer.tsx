import React from "react";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ShuttleScreen";
import Notice from "../view/Notice";

type Props = {
   navigation: BottomTabNavigation;
};

function NoticeContainer({ navigation }: Props) {   

   useEffect(() => {
      
   }, []);

   return <Notice navigation={navigation} />;
}

export default NoticeContainer;
