import React, { useState, useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ShuttleScreen";
import ForAdmin from "../view/ForAdmin";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import { getClass } from "../../../lib/api/forAdmin"
type Props = {
   navigation: BottomTabNavigation;
};

function ForAdminContainer({ navigation }: Props) {   

   const auth =  useSelector(({auth} :RootState) => auth)
   const [list, setList] = useState<any>();
   const [nameList,setNameList] = useState<any>([])

   const getListData = async() => {
      const data = await getClass();
      const newData = data.filter((x:any)=>x.directorLoginId==auth.loginId).map((x:any)=>x.classVOList)[0]
      setList(newData)
      console.log(newData)
      newData.map((item:any, i:number) => {
         setNameList((nameList:any)=>[...nameList,item.className])
      })
      
   }

   useEffect(() => {
      
      getListData()
   }, []);

   return <ForAdmin navigation={navigation} auth={auth} list={list} getListData={getListData} nameList={nameList}/>;
}

export default ForAdminContainer;
