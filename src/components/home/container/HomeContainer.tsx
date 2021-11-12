import React from "react";
import { useEffect } from "react";
import { loading } from "../../../modules/loading";
import { BottomTabNavigation } from "../../../screens/HomeScreen";
import Home from "../view/Home";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import { getParentInfo } from "../../../lib/api/auth";

type Props = {
   navigation: BottomTabNavigation;
};

function HomeContainer({ navigation }: Props) {
   let res;

   const auth = useSelector(({ auth }: RootState) => auth);

   const getInfo = async () => {};

   useEffect(() => {
      getInfo();
   }, []);

   return <Home navigation={navigation} auth={auth} />;
}

export default HomeContainer;
