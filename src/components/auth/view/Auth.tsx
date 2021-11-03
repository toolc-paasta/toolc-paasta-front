import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, Button as RNButton, ListItem } from "react-native-elements";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import { ScrollView } from "react-native-gesture-handler";
import { userInfoType } from "../types";

type AuthProps = {
   userInfo: userInfoType;
   errMsg: userInfoType;
   userType: number;
   settingUserType: (v: number) => void;
   onChange: (name: string, value: string) => void;
   onPressLogin: () => void;
   goToSignin: () => void;
};

function Auth({
   userInfo,
   errMsg,
   userType,
   settingUserType,
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
            <View
               style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: 'center',
                  marginBottom: 16
               }}>
               {["학부모", "선생님", "원장님"].map((item, idx) => {
                  return (
                     <Button
                        key={`usertype_${idx}`}
                        title={item}
                        color={userType === idx ? 'primary' : 'secondary'}
                        onPress={() => settingUserType(idx)}
                        margin={idx !== 0}
                        paddingHorizontal={24}
                     />
                  );
               })}
            </View>
            <View style={styles.inputContainer}>
               <Input
                  placeholder={"아이디"}
                  icon="person"
                  value={userInfo.loginId}
                  errorMessage={errMsg.loginId}
                  onChangeText={(value: any) => onChange("loginId", value)}
               />
               <Input
                  placeholder={"비밀번호"}
                  icon="lock"
                  secureTextEntry={true}
                  value={userInfo.password}
                  onChangeText={(value: any) => onChange("password", value)}
                  errorMessage={errMsg.password}
               />

               <View style={styles.buttonContainer}>
                  <Button
                     title="로그인"
                     color="primary"
                     wide
                     onPress={onPressLogin}
                  />
                  <Button
                     title="회원가입"
                     color="secondary"
                     wide
                     margin
                     onPress={goToSignin}
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
   userTypeButtonContainer: {
      flexGrow: 1,
   },
   buttonContainer: {
      width: "100%",
      marginTop: 24,
   },
   info: {
      paddingTop: 30,
      paddingLeft: 10,
   },
   infoText: {
      opacity: 0.5,
   },
});
