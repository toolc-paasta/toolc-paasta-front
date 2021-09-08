import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loading } from "../../../modules/loading";
import { BottomTabNavigation } from "../../../screens/SearchScreen";
import Search from "../view/Search";

type Props = {
   navigation: BottomTabNavigation;
};

function SearchContainer({ navigation }: Props) {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(loading());
   }, []);

   return <Search navigation={navigation} />;
}

export default SearchContainer;
