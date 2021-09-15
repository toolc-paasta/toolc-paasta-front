import React from "react";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/NoticeBoardScreen";
import List from "../view/List";

type Props = {
   navigation: BottomTabNavigation;
};

function noticeBoardContainer({ navigation }: Props) {   

   useEffect(() => {
      
   }, []);

   return <List navigation={navigation} headerTitle={'공지 모아보기'}/>;
}

export default noticeBoardContainer;
