import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomModal from "../../elements/CustomModal";
import CustomModalFooter from "../../elements/CustomModalFooter";

type Props = {
   visible: boolean;
   close: () => void;
   afterRemove: () => void;
   removeUserFunc: () => Promise<void>;
   success: boolean;
};

function RemoveUserModal({
   visible,
   close,
   afterRemove,
   removeUserFunc,
   success,
}: Props) {
   const footerProps = [
      {
         key: "cancel",
         title: "취소",
         onPress: close,
         titleStyle: [{ color: "red" }],
      },
      {
         key: "remove",
         title: "탈퇴",
         onPress: removeUserFunc,
      },
   ];
   const footerOnSuccess = [
      {
         key: "success",
         title: "확인",
         onPress: afterRemove,
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
            <Text>
               {success
                  ? "이용해주셔서 감사합니다."
                  : "회원님의 모든 정보가 삭제됩니다.\n정말로 탈퇴하시겠습니까?"}
            </Text>
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

export default RemoveUserModal;
