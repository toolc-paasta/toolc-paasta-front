import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, ListItem, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import StyledButton from "../../elements/Button";
import { sexType, signInInfoType } from "../types";

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
         <View style={styles.insideContainer}>
            <View style={styles.inputContainer}>
               <Input
                  placeholder={"아이디"}
                  leftIcon={
                     <Icon name="id-card" type="font-awesome" size={24} />
                  }
                  value={userInfo.loginId}
                  style={styles.input}
                  errorMessage={errMsg.loginId}
                  onChangeText={(value) => onChange("loginId", value)}
                  errorStyle={styles.err}
               />
               <Input
                  placeholder={"성함"}
                  leftIcon={<Icon name="perm-identity" size={24} />}
                  value={userInfo.name}
                  style={styles.input}
                  errorMessage={errMsg.name}
                  onChangeText={(value) => onChange("name", value)}
                  errorStyle={styles.err}
               />
               <ListItem containerStyle={{ padding: 10, paddingBottom: 20 }}>
                  <Icon name="wc" size={24} />
                  <ListItem.Content
                     style={{
                        flexDirection: "row",
                     }}>
                     <Button
                        title="남자"
                        type="outline"
                        onPress={() => selectGender("남성")}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={{
                           borderColor:
                              userInfo.sex === "남성" ? "#2196f3" : "gray",
                        }}
                        titleStyle={{
                           color: userInfo.sex === "남성" ? "#2196f3" : "gray",
                        }}
                     />
                     <Button
                        title="여자"
                        type="outline"
                        onPress={() => selectGender("여성")}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={{
                           borderColor:
                              userInfo.sex === "여성" ? "#2196f3" : "gray",
                        }}
                        titleStyle={{
                           color: userInfo.sex === "여성" ? "#2196f3" : "gray",
                        }}
                     />
                  </ListItem.Content>
               </ListItem>

               <Input
                  placeholder={"전화번호"}
                  leftIcon={<Icon name="phone" size={24} />}
                  style={styles.input}
                  value={userInfo.connectionNumber}
                  errorMessage={errMsg.connectionNumber}
                  onChangeText={(value) => onChange("connectionNumber", value)}
                  errorStyle={styles.err}
               />
               <Input
                  placeholder={"비밀번호"}
                  leftIcon={<Icon name="lock" type="font-awesome" size={24} />}
                  secureTextEntry={true}
                  style={styles.input}
                  value={userInfo.password}
                  onChangeText={(value) => onChange("password", value)}
                  errorMessage={errMsg.password}
                  errorStyle={styles.err}
               />
               <Input
                  placeholder={"비밀번호 확인"}
                  leftIcon={<Icon name="lock" type="font-awesome" size={24} />}
                  secureTextEntry={true}
                  style={styles.input}
                  value={userInfo.passwordCheck}
                  errorMessage={errMsg.passwordCheck}
                  onChangeText={(value) => onChange("passwordCheck", value)}
                  errorStyle={styles.err}
               />
               <StyledButton
                  title="회원가입"
                  color="primary"
                  wide
                  onPress={onPressLogin}
                  paddingHorizontal={20}
               />
            </View>
         </View>
      </ScrollView>
   );
}
export default Signin;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white",
   },
   insideContainer: {
      padding: 30,
      paddingTop: 50,
   },
   err: {
      color: "red",
   },
   inputContainer: {
      width: "100%",
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
