import React from "react";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ListDetailScreen";
import ListDetail from "../view/ListDetail";

type Props = {
   navigation: BottomTabNavigation;
};

function ListDetailContainer({ navigation }: Props) {   

   useEffect(() => {
      
   }, []);

   return <ListDetail navigation={navigation} />;
}

export default ListDetailContainer;
