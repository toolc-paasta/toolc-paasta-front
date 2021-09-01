import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { userInfoType } from "../types";

type AuthProps = {
   userInfo: userInfoType;
   errMsg: userInfoType;
   onChange: (name: string, value: string) => void;
   onPressLogin: () => void;
   goToSignin: () => void;
};

function Auth({
   userInfo,
   errMsg,
   onChange,
   onPressLogin,
   goToSignin,
}: AuthProps) {
   return (
      <ScrollView style={styles.container} enabled>
         <View style={styles.insideContainer}>
            <View style={styles.headerContainer}>
               <Text style={styles.header}>로그인</Text>
            </View>
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

               <View style={styles.buttonContainer}>
                  <Button
                     title={"회원가입"}
                     type="clear"
                     containerStyle={styles.button}
                     titleStyle={{ color: "black" }}
                     onPress={goToSignin}
                  />
                  <Button
                     title={"로그인"}
                     onPress={onPressLogin}
                     containerStyle={styles.button}
                  />
               </View>
            </View>
         </View>
      </ScrollView>
   );
}

export default Auth;

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
   headerContainer: {
      height: 100,
      alignItems: "center",
   },
   header: {
      fontSize: 32,
      fontWeight: "600",
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
   buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      width: "100%",
      marginTop: 30,
   },
   info: {
      paddingTop: 30,
      paddingLeft: 10,
   },
   infoText: {
      opacity: 0.5,
   },
});
