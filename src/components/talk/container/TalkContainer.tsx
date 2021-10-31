import React from "react";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ShuttleScreen";
import Talk from "../view/Talk";

type Props = {
   navigation: BottomTabNavigation;
};

function TalkContainer({ navigation }: Props) {   

   useEffect(() => {
      
   }, []);

   return <Talk navigation={navigation} />;
}

export default TalkContainer;
