import React from "react";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ListScreen";
import List from "../view/List";

type Props = {
   navigation: BottomTabNavigation;
};

function SearchContainer({ navigation }: Props) {   

   useEffect(() => {
      
   }, []);

   return <List navigation={navigation} />;
}

export default SearchContainer;
