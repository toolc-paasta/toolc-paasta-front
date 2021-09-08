import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loading } from "../../../modules/loading";
import { BottomTabNavigation } from "../../../screens/HomeScreen";
import Home from "../view/Home";

type Props = {
   navigation: BottomTabNavigation;
};

function HomeContainer({ navigation }: Props) {
   const dispatch = useDispatch();

   useEffect(() => {
      
   }, []);

   return <Home navigation={navigation} />;
}

export default HomeContainer;
