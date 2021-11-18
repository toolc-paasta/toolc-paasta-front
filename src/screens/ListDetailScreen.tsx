import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../../App";
import ListDetail from "../components/list/view/ListDetail";

type Props = StackScreenProps<RootStackParamList, "ListDetail">;

export type ListDetailStackScreenNav = Props["navigation"];

function ListDetailScreen({ navigation, route }: Props) {
   return (
      <ListDetail
         navigation={navigation}
         data={route?.params?.data}
         header_title={route?.params?.header_title}
      />
   );
}

export default ListDetailScreen;
