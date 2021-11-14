import React, { useState, useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/HomeScreen";
import Home from "../view/Home";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import { getNotice } from "../../../lib/api/forAdmin"

type Props = {
   navigation: BottomTabNavigation;
}
function HomeContainer({ navigation }: Props) {

   const auth = useSelector(({ auth }: RootState) => auth);
   const [list, setList] = useState<any>();

   const getData = async() => {
      const data = await getNotice();
      data.map((item:any, i:number) => (
         console.log(item)
      ))
      
      setList(data)
   }
   useEffect(() => {      
      getData();
   }, []);

   return <Home navigation={navigation} auth={auth} list={list} />;
}

export default HomeContainer;
