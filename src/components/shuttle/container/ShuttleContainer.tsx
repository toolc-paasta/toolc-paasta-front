import React from "react";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ShuttleScreen";
import Shuttle from "../view/Shuttle";

type Props = {
   navigation: BottomTabNavigation;
};

function ShuttleContainer({ navigation }: Props) {   

   useEffect(() => {
      
   }, []);

   return <Shuttle navigation={navigation} />;
}

export default ShuttleContainer;
