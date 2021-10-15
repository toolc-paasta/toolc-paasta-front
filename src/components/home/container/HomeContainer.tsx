import React from "react";
import { useEffect } from "react";
import { loading } from "../../../modules/loading";
import { BottomTabNavigation } from "../../../screens/HomeScreen";
import Home from "../view/Home";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAccessToken,
  directorLogin,
  getDirectorInfo,
  getParentInfo,
  getTeacherInfo,
  parentLogin,
  teacherLogin,
} from "../../../lib/api/auth";

type Props = {
   navigation: BottomTabNavigation;
};

function HomeContainer({ navigation }: Props) {
   let res;

   const getInfo = async() => {
      console.log('qwer') 
      res = await getParentInfo();
   }
  
    useEffect(() => {
      getInfo()
      console.log('hihihi')
    }, []);

   return <Home navigation={navigation} />;
}

export default HomeContainer;
