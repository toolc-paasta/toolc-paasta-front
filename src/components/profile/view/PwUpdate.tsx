import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";

import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";

type Props = {
   visible: boolean;
   password: string;
   clear: (resetReauth: boolean) => void;
   onChange: (v: string) => void;
   onPasswordUpdate: (pw: string) => Promise<void>;
   errMsg: { password: string };
   success: boolean;
};

function PwUpdate({
   visible,
   password,
   clear,
   onChange,
   onPasswordUpdate,
   errMsg,
   success,
}: Props) {
   const footerProps = [
      {
         key: "cancel",
         title: "취소",
         onPress: () => clear(false),
         titleStyle: [{ color: "red" }],
      },
      {
         key: "update",
         title: "변경",
         onPress: () => onPasswordUpdate(password),
      },
   ];
   const footerOnSuccess = [
      {
         key: "success",
         title: "확인",
         onPress: () => clear(true),
      },
   ];

   return (
      <CustomModal
         visible={visible}
         footer={
            <CustomModalFooter
               buttons={success ? footerOnSuccess : footerProps}
               width={300}
            />
         }>
         <View style={styles.container}>
            {success ? (
               <Text>비밀번호 변경에 성공하셨습니다.</Text>
            ) : (
               <>
                  <Text>새로운 비밀번호를 입력해주세요.</Text>
                  <Input
                     style={{ width: "80%" }}
                     secureTextEntry={true}
                     value={password}
                     errorMessage={errMsg.password}
                     onChangeText={onChange}
                  />
               </>
            )}
         </View>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      width: 300,
      padding: 10,
      paddingBottom: 0,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default PwUpdate;
