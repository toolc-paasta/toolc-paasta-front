import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AuthStackScreenParamList } from "../../../screens/AuthScreen";
import StyledButton from "../../elements/Button";

type Props = {
   goTo: (v: keyof AuthStackScreenParamList) => void;
};

function Landing({ goTo }: Props) {
   return (
      <View style={styles.container}>
         <View style={styles.imageListConatiner}></View>
         <View style={styles.buttonContainer}>
            <StyledButton
               title="로그인"
               color="primary"
               wide
               onPress={() => goTo("Login")}
            />
            <StyledButton
               title="회원가입"
               color="clear"
               wide
               margin
               onPress={() => goTo("Signin")}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   imageListConatiner: {
      flex: 7,
   },
   buttonContainer: {
      flex: 3,
      paddingLeft: "10%",
      paddingRight: "10%",
   },
});

export default Landing;
