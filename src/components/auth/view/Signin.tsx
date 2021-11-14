import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, ListItem, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../elements/Button";
import { sexType, signInInfoType } from "../types";
import { colors } from '../../elements/theme'

type AuthProps = {
   userInfo: signInInfoType;
   isDirector: boolean;
   errMsg: signInInfoType;
   onChange: (name: string, value: string) => void;
   selectGender: (v: sexType) => void;
   onPressLogin: () => Promise<void>;
};

function Signin({
   userInfo,
   errMsg,
   isDirector,
   onChange,
   selectGender,
   onPressLogin,
}: AuthProps) {
   return (
      <ScrollView style={styles.container} enabled>
         <ListItem containerStyle={styles.listItem}>
            <Text style={{ paddingBottom: 28 }}>아이디   </Text>
            <ListItem.Content>
               <Input
                  value={userInfo.loginId}
                  onChangeText={(value) => onChange("loginId", value)}
                  containerStyle={{ width: 240 }}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{ fontFamily: "Font" }}
                  errorMessage={errMsg.loginId}
                  errorStyle={styles.err}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem containerStyle={styles.listItem}>
            <Text style={{ paddingBottom: 28 }}>성함      </Text>
            <ListItem.Content>
               <Input
                  value={userInfo.name}
                  onChangeText={(value) => onChange("name", value)}
                  containerStyle={{ width: 240 }}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{ fontFamily: "Font" }}
                  errorMessage={errMsg.name}
                  errorStyle={styles.err}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem containerStyle={styles.listItem}>
            <Text>성별</Text>
            <ListItem.Content
               style={{
                  flexDirection: "row",
               }}>
               <Button
                  title="남자"
                  color={userInfo.sex === '남성' ? 'primary' : 'secondary'}
                  paddingHorizontal={24}
                  onPress={() => selectGender("남성")}
               />
               <Button
                  title="여자"
                  color={userInfo.sex === '여성' ? 'primary' : 'secondary'}
                  paddingHorizontal={24}
                  margin
                  onPress={() => selectGender("여성")}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem containerStyle={styles.listItem}>
            <Text style={{ paddingBottom: 28 }}>전화번호</Text>
            <ListItem.Content>
               <Input
                  value={userInfo.connectionNumber}
                  onChangeText={(value) => onChange("connectionNumber", value)}
                  containerStyle={{ width: 240 }}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{ fontFamily: "Font" }}
                  errorMessage={errMsg.connectionNumber}
                  errorStyle={styles.err}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem containerStyle={styles.listItem}>
            <Text style={{ paddingBottom: 28 }}>비밀번호</Text>
            <ListItem.Content>
               <Input
                  value={userInfo.password}
                  secureTextEntry={true}
                  onChangeText={(value) => onChange("password", value)}
                  containerStyle={{ width: 240 }}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{ fontFamily: "Font" }}
                  errorMessage={errMsg.password}
                  errorStyle={styles.err}
               />
            </ListItem.Content>
         </ListItem>
         <ListItem>
            <Text style={{ paddingBottom: 28 }}>PW확인</Text>
            <ListItem.Content>
               <Input
                  value={userInfo.passwordCheck}
                  secureTextEntry={true}
                  onChangeText={(value) => onChange("passwordCheck", value)}
                  containerStyle={{ width: 240 }}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{ fontFamily: "Font" }}
                  errorMessage={errMsg.passwordCheck}
                  errorStyle={styles.err}
               />
            </ListItem.Content>
         </ListItem>
         <Button
            title="회원가입"
            color="primary"
            wide
            onPress={onPressLogin}
            paddingHorizontal={24}
         />
      </ScrollView>
   );
}
export default Signin;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white",
      paddingHorizontal: 20,
   },
   listItem: {
      paddingBottom: 0
   },
   inputContainer: {
      borderBottomColor: colors.primary
   },
   err: {
      color: "red",
   },
   input: {
      paddingLeft: 10,
   },
   buttonContainer: {
      width: "30%",
   },
   button: {
      borderColor: "gray",
   },
   buttonPwReset: {
      width: 110,
      position: "absolute",
      left: 0,
   },
   info: {
      paddingTop: 30,
      paddingLeft: 10,
   },
   infoText: {
      opacity: 0.5,
   },
});
