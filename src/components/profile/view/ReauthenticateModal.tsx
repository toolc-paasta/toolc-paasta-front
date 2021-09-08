import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";

import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";
import CustomModalHeader from "../../elements/CustomModalHeader";

type Props = {
   onClose: () => void;
   visible: boolean;
   reauthWithPw: () => Promise<void>;
   onChange: (v: string) => void;
   errMsg: { password: string };
   password: string;
};

function ReauthenticateModal({
   onClose,
   visible,
   reauthWithPw,
   onChange,
   errMsg,
   password,
}: Props) {
   const titleProps = {
      title: "재인증",
   };
   const footerProps = [
      {
         key: "cancel",
         title: "취소",
         onPress: onClose,
         titleStyle: [{ color: "red" }],
      },
      {
         key: "login",
         title: "로그인",
         onPress: reauthWithPw,
      },
   ];
   return (
      <CustomModal
         visible={visible}
         title={<CustomModalHeader props={titleProps} width={300} />}
         footer={<CustomModalFooter buttons={footerProps} width={300} />}>
         <View style={styles.container}>
            <Text>현재 비밀번호를 입력해주세요.</Text>
            <Input
               secureTextEntry={true}
               value={password}
               errorMessage={errMsg.password}
               onChangeText={onChange}
            />
         </View>
      </CustomModal>
   );
}

const styles = StyleSheet.create({
   container: {
      width: 300,
      padding: 10,
      paddingTop: 20,
      paddingBottom: 0,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default ReauthenticateModal;
