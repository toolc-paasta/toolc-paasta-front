import React from "react";
import { useEffect } from "react";;
import { BottomTabNavigation } from "../../../screens/ManagementScreen";
import Manage from "../view/Manage";
import {
   getParentList,
} from "../../../lib/api/parentInfo";


type Props = {
   navigation: BottomTabNavigation;
};

function ManageContainer({ navigation }: Props) {

   
   
   useEffect(() => {
      console.log(getParentList())
   }, []);

   return <Manage navigation={navigation} />;
}

export default ManageContainer;
