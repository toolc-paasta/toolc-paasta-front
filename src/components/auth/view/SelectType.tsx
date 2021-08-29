import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";

type Props = {
   onSelectType: (num: number) => void;
   userType: number;
};
type cardType = {
   name: string;
   type?: string;
   title: string;
};
const cardDatas: cardType[] = [
   {
      name: "user-friends",
      type: "font-awesome-5",
      title: "학부모",
   },
   { name: "chalkboard-teacher", type: "font-awesome-5", title: "교사" },
   { name: "school", type: "font-awesome-5", title: "원장" },
];

function SelectType({ onSelectType, userType }: Props) {
   return (
      <View style={{ flex: 1, paddingTop: 100 }}>
         <View style={styles.typesContainer}>
            {cardDatas.map((item, idx) => (
               <Pressable
                  key={idx}
                  style={[
                     styles.cardContainer,
                     {
                        borderColor: userType === idx ? "#2196f3" : "gray",
                     },
                  ]}
                  onPress={() => onSelectType(idx)}>
                  <Icon
                     name={item.name}
                     type={item.type}
                     size={Dimensions.get("window").width * 0.3 * 0.4}
                     color={userType === idx ? "#2196f3" : "gray"}
                  />
                  <Text
                     style={{
                        alignSelf: "center",
                        color: userType === idx ? "#2196f3" : "gray",
                        paddingTop: 10,
                     }}>
                     {item.title}
                  </Text>
               </Pressable>
            ))}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   typesContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
   },
   cardContainer: {
      width: "30%",
      height: Dimensions.get("window").width * 0.3,
      justifyContent: "center",
      alignItems: "center",
      opacity: 0.8,
      borderWidth: 1,
      borderRadius: 20,
   },
});

export default SelectType;
