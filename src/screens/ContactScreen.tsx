import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../../App";
import ContactContainer from "../components/onePage/container/ContactContainer";

type Props = StackScreenProps<RootStackParamList, "Contact">;

export type BottomTabNavigation = Props["navigation"];

function ContactScreen({ navigation }: Props) {
   return <ContactContainer navigation={navigation} />;
}

export default ContactScreen;
