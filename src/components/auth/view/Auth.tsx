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
   goToMap: () => void;
   goToFCM: () => void;
};

function Auth({
   userInfo,
   errMsg,
   userType,
   settingUserType,
   onChange,
   onPressLogin,
   goToSignin,
   goToMap,
   goToFCM,
}: AuthProps) {
   return (
      <ScrollView style={styles.container} enabled>
         <View style={styles.insideContainer}>
            <View style={styles.headerContainer}>
               <Text style={styles.header}>로그인</Text>
            </View>
            <View style={styles.inputContainer}>
               <ListItem containerStyle={{ padding: 10, paddingBottom: 20 }}>
                  <ListItem.Content
                     style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                     }}>
                     {["학부모", "선생님", "원장님"].map((item, idx) => {
                        return (
                           <RNButton
                              key={`usertype_${idx}`}
                              title={item}
                              type="outline"
                              onPress={() => settingUserType(idx)}
                              containerStyle={styles.userTypeButtonContainer}
                              buttonStyle={{
                                 borderColor:
                                    userType === idx ? "#2196f3" : "gray",
                              }}
                              titleStyle={{
                                 color: userType === idx ? "#2196f3" : "gray",
                              }}
                           />
                        );
                     })}
                  </ListItem.Content>
               </ListItem>
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
                     color="secondary"
                     wide
                     onPress={onPressLogin}
                  />
                  <Button
                     title="회원가입"
                     color="primary"
                     wide
                     margin
                     onPress={goToSignin}
                  />
               </View>
            </View>
            <View
               style={{
                  width: "100%",
                  marginTop: 20,
                  flexDirection: "row",
                  padding: 30,
               }}>
               <Button title="맵" color="primary" onPress={goToMap} wide />
               <Button title="FCM" color="primary" onPress={goToFCM} wide />
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
