import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, ListItem, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { childInfoType } from "../types";

type Props = {
   childInfo: childInfoType;
   onChangeChild: (name: string, value: string) => void;
   birthErr: string | undefined;
};

function InputChild({ childInfo, onChangeChild, birthErr }: Props) {
   return (
      <ScrollView style={styles.container}>
         <ListItem pad={10}>
            <Text>아이이름</Text>
            <ListItem.Content>
               <Input
                  value={childInfo.name}
                  onChangeText={(v) => onChangeChild("name", v)}
                  containerStyle={{ width: 200 }}
                  renderErrorMessage={false}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem pad={10}>
            <Text>성별</Text>
            <ListItem.Content
               style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
               }}>
               <Button
                  title="남자"
                  type="outline"
                  containerStyle={[]}
                  buttonStyle={[stylesFunc(childInfo.sex === "male").button]}
                  titleStyle={[
                     stylesFunc(childInfo.sex === "male").buttonTitle,
                  ]}
                  onPress={() => onChangeChild("sex", "male")}
               />
               <Button
                  title="여자"
                  type="outline"
                  buttonStyle={[stylesFunc(childInfo.sex === "female").button]}
                  titleStyle={[
                     stylesFunc(childInfo.sex === "female").buttonTitle,
                  ]}
                  onPress={() => onChangeChild("sex", "female")}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem pad={20}>
            <Text>생년월일</Text>
            <ListItem.Content
               style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
               }}>
               <Input
                  placeholder="20180429"
                  value={childInfo.birth}
                  onChangeText={(v) => onChangeChild("birth", v)}
                  containerStyle={{ width: 200 }}
                  errorMessage={birthErr}
               />
            </ListItem.Content>
         </ListItem>
      </ScrollView>
   );
}

const stylesFunc = (selected: boolean) =>
   StyleSheet.create({
      button: {
         borderColor: selected ? "#2196f3" : "gray",
      },
      buttonTitle: {
         color: selected ? "#2196f3" : "gray",
      },
   });

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#fff",
      paddingLeft: 20,
   },
});

export default InputChild;
