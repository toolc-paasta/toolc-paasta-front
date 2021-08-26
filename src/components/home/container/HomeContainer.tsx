import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../modules/snackbar";
import { BottomTabNavigation } from "../../../screens/HomeScreen";
import Home from "../view/Home";

type Props = {
   navigation: BottomTabNavigation;
};

function HomeContainer({ navigation }: Props) {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setSnackbar({ visible: true, snackbar: "테스트" }));
   }, []);

   return <Home />;
}

export default HomeContainer;
