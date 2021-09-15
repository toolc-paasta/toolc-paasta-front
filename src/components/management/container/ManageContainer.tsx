import React from "react";
import { useEffect } from "react";;
import { BottomTabNavigation } from "../../../screens/ManagementScreen";
import Manage from "../view/Manage";

type Props = {
   navigation: BottomTabNavigation;
};

function ManageContainer({ navigation }: Props) {

   useEffect(() => {
      
   }, []);

   return <Manage navigation={navigation} />;
}

export default ManageContainer;
