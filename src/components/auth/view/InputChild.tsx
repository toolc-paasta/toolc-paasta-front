import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, ListItem, Button, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { childInfoType } from "../types";

type Props = {
   childInfo: childInfoType;
   onChangeChild: (name: string, value: string) => void;
   birthErr: string | undefined;
   isCheckedSameChild: boolean;
   toggleIsCheckedSameChild: () => void;
};

function InputChild({
   childInfo,
   onChangeChild,
   birthErr,
   isCheckedSameChild,
   toggleIsCheckedSameChild,
}: Props) {
   return (
      <ScrollView style={styles.container}>
         <ListItem pad={10}>
            <Text>아이이름</Text>
            <ListItem.Content>
               <Input
                  value={childInfo.childName}
                  onChangeText={(v) => onChangeChild("childName", v)}
                  containerStyle={{ width: 200 }}
                  inputStyle={{ fontFamily: 'Font' }}
                  renderErrorMessage={false}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem pad={10}>
            <Text>성별</Text>
            <ListItem.Content
               style={{
                  flexDirection: "row",
               }}>
               <Button
                  title="남자"
                  type="outline"
                  containerStyle={[]}
                  buttonStyle={[
                     stylesFunc(childInfo.childSex === "남성").button,
                  ]}
                  titleStyle={[
                     stylesFunc(childInfo.childSex === "남성").buttonTitle,
                  ]}
                  onPress={() => onChangeChild("childSex", "남성")}
               />
               <Button
                  title="여자"
                  type="outline"
                  buttonStyle={[
                     stylesFunc(childInfo.childSex === "여성").button,
                  ]}
                  titleStyle={[
                     stylesFunc(childInfo.childSex === "여성").buttonTitle,
                  ]}
                  onPress={() => onChangeChild("childSex", "여성")}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem pad={10}>
            <Text>생년월일</Text>
            <ListItem.Content
               style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
               }}>
               <Input
                  placeholder="20180429"
                  value={childInfo.childBirthday}
                  onChangeText={(v) => onChangeChild("childBirthday", v)}
                  containerStyle={{ width: 200 }}
                  inputStyle={{ fontFamily: 'Font' }}
                  errorMessage={birthErr}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem pad={10}>
            <CheckBox
               title="이미 배우자분이 같은 아이로 가입하셨습니까?"
               checked={isCheckedSameChild}
               onPress={toggleIsCheckedSameChild}
            />
         </ListItem>
         {isCheckedSameChild && (
            <ListItem pad={10}>
               <Text>배우자 아이디</Text>
               <ListItem.Content>
                  <Input
                     value={childInfo.wifeId}
                     placeholder="배우자분의 아이디를 입력해주세요."
                     onChangeText={(v) => onChangeChild("wifeId", v)}
                     containerStyle={{ width: 250 }}
                     errorMessage={birthErr}
                     style={{ fontSize: 12 }}
                  />
               </ListItem.Content>
            </ListItem>
         )}
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
