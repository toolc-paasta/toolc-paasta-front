import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { ScrollView } from "react-native-gesture-handler";
import { signInInfoType } from "../container/SigninContainer";

type AuthProps = {
   userInfo: signInInfoType;
   errMsg: signInInfoType;
   onChange: (name: string, value: string) => void;
};

function Signin({ userInfo, errMsg, onChange }: AuthProps) {
   return (
      <ScrollView style={styles.container} enabled>
         <View style={styles.insideContainer}>
            <View style={styles.inputContainer}>
               <Input
                  placeholder={"아이디"}
                  leftIcon={<Icon name="user" type="font-awesome" size={24} />}
                  value={userInfo.id}
                  style={styles.input}
                  errorMessage={errMsg.id}
                  onChangeText={(value) => onChange("id", value)}
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
   button: {
      width: 100,
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
