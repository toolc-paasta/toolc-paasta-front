import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../../App";
import AdminContainer from "../components/admin/container/AdminContainer";

// 이거처럼 해서 뽑아서 Params 타입으로 하면 됨.
type Props = StackScreenProps<RootStackParamList, "Admin">;

// 이건 navigation 타입.
export type StackNavigation = Props["navigation"];

function AdminScreen({ navigation }: Props) {
   return <AdminContainer navigation={navigation} />;
}

export default AdminScreen;
