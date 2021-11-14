import React, { useState, useEffect } from "react";
import {
   Text,
   View,
   StyleSheet,
   TouchableOpacity,
   Dimensions,
} from "react-native";
import { btns_for_di, btns_for_pr } from "../../elements/data";
import { btns_for_ad } from "../../elements/data";
import Icon from "react-native-vector-icons/Ionicons";
import { BottomTabNavigation } from "../../../screens/HomeScreen";

type Btn = {
   id: number;
   title: string;
   img: string;
   onclick: string;
};

type Props = {
   user_type: string;
   navigation: BottomTabNavigation;
};

const btnPr: Btn[] = btns_for_pr;
const btnAd: Btn[] = btns_for_ad;
const btnDi: Btn[] = btns_for_di;

export default function MenuWithBtns({ user_type, navigation }: Props) {
   const [authType, setAuthType] = useState<any>();

   useEffect(() => {
      user_type !== "PARENT"
         ? user_type === "DIRECTOR"
            ? setAuthType(btnDi)
            : setAuthType(btnAd)
         : setAuthType(btnPr);
   }, []);

   return (
      <>
         <View style={styles.row}>
            {authType?.map((item: any, i: any) => (
               <View style={styles.btnContainer} key={i}>
                  <TouchableOpacity
                     style={styles.btn}
                     onPress={() => navigation.navigate(item.onclick)}>
                     <Icon
                        name={item.img}
                        size={35}
                        color="black"
                        style={styles.icon}
                     />
                  </TouchableOpacity>
                  <View style={styles.textView}>
                     <Text style={styles.text}>{item.title}</Text>
                  </View>
               </View>
            ))}
         </View>
      </>
   );
}

const styles = StyleSheet.create({
   row: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      paddingVertical: 8,
   },
   btnContainer: {
      width: (Dimensions.get("window").width * 0.8) / 3 - 10,
      height: 100,
      alignItems: "center",
   },
   btn: {
      width: 60,
      height: 60,
      borderRadius: 100,
      backgroundColor: "#FEE9B0",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
   },
   icon: {
      fontSize: 25,
   },
   textView: {},
   text: {
      textAlign: "center",
      fontSize: 10,
   },
});
