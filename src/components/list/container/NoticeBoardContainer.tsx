import React, { useState, useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/NoticeBoardScreen";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import List from "../view/List";
import { getNotice } from "../../../lib/api/forAdmin"

type Props = {
   navigation: BottomTabNavigation;
};

function noticeBoardContainer({ navigation }: Props) {   

   const auth =  useSelector(({auth} :RootState) => auth)
   const [list, setList] = useState<any>();

   const getData = async() => {
      const data = await getNotice();
      data.map((item:any, i:number) => (
         console.log(item)
      ))
      
      setList(data)
   }

   useEffect(() => {
      getData()
   }, []);

   return <List navigation={navigation} headerTitle={'공지 모아보기'} auth={auth} list={list}/>;
}

export default noticeBoardContainer;
