import React from "react";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/NoticeBoardScreen";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import List from "../view/List";

type Props = {
   navigation: BottomTabNavigation;
};

function noticeBoardContainer({ navigation }: Props) {   

   const auth =  useSelector(({auth} :RootState) => auth)
   useEffect(() => {
      
   }, []);

   return <List navigation={navigation} headerTitle={'공지 모아보기'} auth={auth}/>;
}

export default noticeBoardContainer;
