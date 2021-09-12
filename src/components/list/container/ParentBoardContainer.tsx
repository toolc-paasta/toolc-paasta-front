import React from "react";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ParentBoardScreen";
import List from "../view/List";

type Props = {
   navigation: BottomTabNavigation;
};

function noticeBoardContainer({ navigation }: Props) {   

   useEffect(() => {
      
   }, []);

   return <List navigation={navigation} headerTitle={'학부모 게시판'}/>;
}

export default noticeBoardContainer;
