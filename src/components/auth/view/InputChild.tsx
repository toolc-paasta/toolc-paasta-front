import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, ListItem, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { childInfoType } from "../types";
import Button from '../../elements/Button'
import { colors } from '../../elements/theme'

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
         <ListItem>
            <Text>아이이름</Text>
            <ListItem.Content>
               <Input
                  value={childInfo.childName}
                  onChangeText={(v) => onChangeChild("childName", v)}
                  containerStyle={{ width: 250 }}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{ fontFamily: "Font" }}
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
                  color={childInfo.childSex === '남성' ? 'primary' : 'secondary'}
                  paddingHorizontal={24}
                  onPress={() => onChangeChild("childSex", "남성")}
               />
               <Button
                  title="여자"
                  color={childInfo.childSex === '여성' ? 'primary' : 'secondary'}
                  paddingHorizontal={24}
                  margin
                  onPress={() => onChangeChild("childSex", "여성")}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem pad={10}>
            <Text style={{ paddingBottom: 28 }}>생년월일</Text>
            <ListItem.Content
               style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
               }}>
               <Input
                  placeholder="20180429"
                  value={childInfo.childBirthday}
                  onChangeText={(v) => onChangeChild("childBirthday", v)}
                  containerStyle={{ width: 250 }}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{ fontFamily: "Font" }}
                  errorMessage={birthErr}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem>
            <CheckBox
               title={<Text style={{ marginLeft: 4, fontFamily: "Font"}}>이미 배우자분이 같은 아이로 가입하셨습니까?</Text>}
               checked={isCheckedSameChild}
               checkedColor={colors.primary}
               containerStyle={styles.checkBoxContainer}
               onPress={toggleIsCheckedSameChild}
            />
         </ListItem>
         {isCheckedSameChild && (
            <ListItem pad={10}>
               <Text style={{ paddingBottom: 28 }}>배우자 ID</Text>
               <ListItem.Content>
                  <Input
                     value={childInfo.wifeId}
                     placeholder="배우자 ID"
                     onChangeText={(v) => onChangeChild("wifeId", v)}
                     containerStyle={{ width: 250 }}
                     inputContainerStyle={styles.inputContainer}
                     inputStyle={{ fontFamily: "Font" }}
                     errorMessage={birthErr}
                  />
               </ListItem.Content>
            </ListItem>
         )}
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#fff",
      paddingLeft: 20,
   },
   inputContainer: {
      borderBottomColor: colors.primary
   },
   checkBoxContainer: {
      backgroundColor: '#fff',
      borderWidth: 0
   }
});

export default InputChild;
