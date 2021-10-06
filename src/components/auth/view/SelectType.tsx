import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { colors } from "../../elements/theme";

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
      <View style={{ flex: 1, paddingTop: 80 }}>
         <View
            style={{
               justifyContent: "center",
               alignItems: "center",
               paddingBottom: 30,
            }}>
            <Text style={{ fontSize: 20 }}>어떤 계정으로 가입하시나요?</Text>
         </View>
         <View style={styles.typesContainer}>
            {cardDatas.map((item, idx) => (
               <View style={styles.typeContainer} key={`type_${idx}`}>
                  <Pressable
                     key={idx}
                     style={[
                        styles.cardContainer,
                        {
                           backgroundColor:
                              userType === idx
                                 ? colors.primary
                                 : colors.secondary,
                        },
                     ]}
                     onPress={() => onSelectType(idx)}>
                     <Icon
                        name={item.name}
                        type={item.type}
                        size={Dimensions.get("window").width * 0.1}
                        color={
                           userType === idx ? colors.background : colors.primary
                        }
                     />
                  </Pressable>
                  <Text
                     style={{
                        alignSelf: "center",
                        color: colors.primary,
                        paddingTop: 10,
                        fontSize: 18,
                     }}>
                     {item.title}
                  </Text>
               </View>
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
   typeContainer: {
      width: "25%",
   },
   cardContainer: {
      width: "100%",
      height: Dimensions.get("window").width * 0.25,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 999,
   },
});

export default SelectType;
