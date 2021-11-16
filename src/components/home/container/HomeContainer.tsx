import React, { useState, useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/HomeScreen";
import Home from "../view/Home";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import { getNotice } from "../../../lib/api/forAdmin";
import { getNotice_T } from "../../../lib/api/forAdmin";
import { getNotice_D } from "../../../lib/api/forAdmin";

type Props = {
   navigation: BottomTabNavigation;
};
function HomeContainer({ navigation }: Props) {
   const auth = useSelector(({ auth }: RootState) => auth);
   const [list, setList] = useState<any>();

   const getData = async () => {
      let data;
      if (auth.authority == "DIRECTOR") data = await getNotice_D();
      else if (auth.authority == "TEACHER") data = await getNotice_T();
      else data = await getNotice();
      setList(data);
   };
   useEffect(() => {
      getData();
   }, []);

   return <Home navigation={navigation} auth={auth} list={list} />;
}

export default HomeContainer;
