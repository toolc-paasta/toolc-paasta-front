import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { AuthStackScreenParamList } from "../../../screens/AuthScreen";
import Landing from "../view/Landing";

function LandingContainer({
   navigation,
}: StackScreenProps<AuthStackScreenParamList, "Landing">) {
   const goTo = (to: keyof AuthStackScreenParamList) => {
      navigation.navigate(to);
   };
   return <Landing goTo={goTo} />;
}

export default LandingContainer;
