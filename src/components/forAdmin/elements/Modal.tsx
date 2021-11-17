import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { colors } from "../../elements/theme";
import { findParent } from "../../../lib/api/forAdmin";
import { postParent } from "../../../lib/api/forAdmin";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../modules/snackbar";
import Button from "../../elements/Button";
import { loading, unloading } from "../../../modules/loading";

type Props = {
   setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
   getListData: any;
   nameList: any;
};

export default function Modal({
   setModalVisible,
   getListData,
   nameList,
}: Props) {
   const dispatch = useDispatch();

   const [name, setName] = useState<any>();
   const [number, setNumber] = useState<any>();

   const findParents = async () => {
      if (!/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(number)) {
         alert(" - 를 포함한 번호를 적어주세요.\nex) 010-1234-5678");
         return;
      }
      if (name != null && number != null) {
         dispatch(loading());
         const res = await findParent(name, number);
         setModalVisible(false);
         if (res == null) {
            dispatch(
               setSnackbar({
                  visible: true,
                  snackbar: "가입되지 않은 사용자입니다.",
               })
            );
         } else if (nameList.find((x: any) => x == number) == undefined) {
            await postParent({ id: res.childId });
            await getListData();
            alert("등록되었습니다");
         } else {
            dispatch(
               setSnackbar({
                  visible: true,
                  snackbar: "이미 추가된 어린이입니다.",
               })
            );
         }
         dispatch(unloading());
      } else {
         dispatch(
            setSnackbar({ visible: true, snackbar: "모두 작성해주세요." })
         );
      }
   };

   return (
      <View style={styles.container}>
         <View style={styles.boxes}>
            <View style={[styles.box, styles.box1]}>
               <TextInput
                  style={styles.input1}
                  onChangeText={setName}
                  placeholder="학부모 이름"
               />
            </View>
            <View style={[styles.box, styles.box1]}>
               <TextInput
                  style={styles.input1}
                  onChangeText={setNumber}
                  placeholder="전화번호 ( - 포함)"
               />
            </View>
         </View>
         <View style={styles.btns}>
            <View style={{ width: "47%" }}>
               <Button
                  title="취소"
                  color="secondary"
                  onPress={() => [setModalVisible(false)]}
               />
            </View>
            <View style={{ width: "47%" }}>
               <Button
                  title="추가"
                  color="primary"
                  onPress={() => [findParents()]}
               />
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      width: "100%",
      height: "100%",
   },
   boxes: {
      height: "70%",
      justifyContent: "center",
      alignItems: "center",
   },
   box: {
      marginVertical: 8,
      width: "100%",
   },
   box1: {},
   btns: {
      position: "absolute",
      bottom: 16,
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
   },
   input1: {
      padding: 10,
      borderWidth: 1,
      borderColor: colors.secondary,
      borderRadius: 10,
      fontFamily: "Font",
   },
});
