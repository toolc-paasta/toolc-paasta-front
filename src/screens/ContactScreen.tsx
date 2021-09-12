import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootBottomTabParamList } from "../../App";
import ContactContainer from "../components/onePage/container/ContactContainer"

type Props = BottomTabScreenProps<RootBottomTabParamList, "Contact">;

export type BottomTabNavigation = Props["navigation"];

function ContactScreen({ navigation }: Props) {
   return <ContactContainer navigation={navigation} />;
}

export default ContactScreen;
