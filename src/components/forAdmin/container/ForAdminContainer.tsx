import React from "react";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ShuttleScreen";
import ForAdmin from "../view/ForAdmin";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";

type Props = {
   navigation: BottomTabNavigation;
};

function ForAdminContainer({ navigation }: Props) {   

   const auth =  useSelector(({auth} :RootState) => auth)

   useEffect(() => {
      
   }, []);

   return <ForAdmin navigation={navigation} auth={auth}/>;
}

export default ForAdminContainer;
