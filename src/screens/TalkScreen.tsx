import {
   createStackNavigator,
   StackScreenProps,
} from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";
import { RootStackParamList } from "../../App";
import ParentListContainer from "../components/talk/container/ParentListContainer";
import TalkContainer from "../components/talk/container/TalkContainer";
import Constants from "../lib/utils/constants";
import { RootState } from "../modules";

type Props = StackScreenProps<RootStackParamList, "Talk">;

export type BottomTabNavigation = Props["navigation"];

export type TalkStackScreenParamList = {
   ParentList: undefined;
   TalkRoom: {
      channel: string;
      title?: string;
   };
};

const Stack = createStackNavigator<TalkStackScreenParamList>();

function TalkScreen({ navigation }: Props) {
   const auth = useSelector(({ auth }: RootState) => auth);

   return (
      <Stack.Navigator
         initialRouteName={
            auth.authority === Constants.authority_parent
               ? "TalkRoom"
               : "ParentList"
         }>
         <Stack.Screen
            name="TalkRoom"
            component={TalkContainer}
            options={{ headerShown: false }}
            initialParams={{
               channel:
                  auth.authority === Constants.authority_parent
                     ? auth.loginId
                     : "",
            }}
         />
         <Stack.Screen
            name="ParentList"
            component={ParentListContainer}
            options={{ headerShown: false }}
         />
      </Stack.Navigator>
   );
}

export default TalkScreen;
