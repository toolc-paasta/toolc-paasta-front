import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import RootBottomTabParamList from "../../App"
import HomeContainer from "../components/home/container/HomeContainer";

// 이거처럼 해서 뽑아서 Params 타입으로 하면 됨.
type Props = BottomTabScreenProps<any, "Home">;

// 이건 navigation 타입.
export type BottomTabNavigation = Props["navigation"];
export type BottomTabNavigation2 = Props["navigation"];

function HomeScreen({ navigation }: Props) {
   return <HomeContainer navigation={navigation} />;
}

export default HomeScreen;
