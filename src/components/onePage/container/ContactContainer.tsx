import React from "react";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ContactScreen";
import Contact from "../view/Contact";

type Props = {
   navigation: BottomTabNavigation;
};

function ContactContainer({ navigation }: Props) {   

   useEffect(() => {
      
   }, []);

   return <Contact navigation={navigation} />;
}

export default ContactContainer;
