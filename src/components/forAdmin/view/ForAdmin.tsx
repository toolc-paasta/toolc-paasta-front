import React, { useState, useEffect } from "react";
import {
   Text,
   View,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
   Modal,
   Dimensions,
} from "react-native";
import Constants from "expo-constants";
import Header from "../../elements/Header";
import { BottomTabNavigation } from "../../../screens/ForAdminScreen";
import { classList, childList } from "../../elements/data";
import { FAB } from "react-native-elements";
import ModalView from "../elements/Modal";
import ModalView2 from "../elements/Modal2";
import { colors } from "../../elements/theme";

type Props = {
   navigation: BottomTabNavigation;
   auth: any;
   list: any;
   nameList: any;
   getListData: any;
};

export default function ForAdmin({
   navigation,
   auth,
   list,
   getListData,
   nameList,
}: Props) {
   const [modalVisible, setModalVisible] = useState<boolean>(false);

   const DATA = list;

   return (
      <View
         style={[
            styles.container,
            modalVisible == true
               ? { backgroundColor: "#bdbdbd" }
               : { backgroundColor: "#fff" },
         ]}>
         <Header
            header_title={
               auth.authority === "DIRECTOR" ? "반 추가" : "어린이 추가"
            }
            navigation={navigation}
            setIsSubmit={null}
            IsInsert={null}
            setModalVisible={false}
         />
         <ScrollView style={styles.listContainer}>
            {DATA == "" ? (
               <Text style={{ textAlign: "center", marginTop: 200 }}>
                  등록된 데이터가 없습니다
               </Text>
            ) : (
               <>
                  {DATA?.map((item: any, i: number) => (
                     <View style={styles.list} key={i}>
                        <View>
                           {auth.authority === "DIRECTOR" ? (
                              <Text style={styles.subText} numberOfLines={1}>
                                 {item.className} 반
                              </Text>
                           ) : (
                              <Text style={styles.subText} numberOfLines={1}>
                                 {item.childName} 어린이
                              </Text>
                           )}
                        </View>
                     </View>
                  ))}
               </>
            )}
         </ScrollView>
         <View style={styles.fabButtonWrap}>
            <FAB
               visible={true}
               raised
               icon={{
                  name: "plus",
                  type: "font-awesome",
                  color: "white",
               }}
               containerStyle={{ backgroundColor: colors.primary }}
               buttonStyle={styles.fabButton}
               onPress={() => setModalVisible(true)}
            />
         </View>
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
               {auth.authority == "TEACHER" ? (
                  <ModalView
                     setModalVisible={setModalVisible}
                     getListData={getListData}
                     nameList={nameList}
                  />
               ) : (
                  <ModalView2
                     setModalVisible={setModalVisible}
                     getListData={getListData}
                     nameList={nameList}
                  />
               )}
            </View>
         </Modal>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      // paddingTop: Constants.statusBarHeight,
      backgroundColor: "#fff",
   },
   listContainer: {
      padding: 15,
   },
   list: {
      alignItems: "center",
      height: 60,
      paddingLeft: 10,
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: colors.secondary,
   },
   mainText: {
      fontWeight: "bold",
      fontSize: 15,
      paddingBottom: 10,
      textAlign: "left",
   },
   subText: {
      width: 250,
      fontSize: 15,
   },
   numText: {
      position: "absolute",
      right: 5,
      fontSize: 12,
      textAlign: "right",
      paddingTop: 1,
      width: 50,
      height: 20,
   },
   fabButtonWrap: {
      position: "absolute",
      bottom: 25,
      right: 25,
   },
   fabButton: {
      width: 60,
      height: 60,
      borderRadius: 28,
      backgroundColor: colors.primary,
   },
   modalView: {
      height: (Dimensions.get("window").height / 10) * 3,
      width: (Dimensions.get("window").width / 10) * 8,
      position: "relative",
      left:
         Dimensions.get("window").width / 2 -
         (Dimensions.get("window").width / 10) * 4,
      top:
         Dimensions.get("window").height / 2 -
         (Dimensions.get("window").height / 10) * 2,
      paddingLeft: 16,
      paddingRight: 16,
      backgroundColor: "#ffffff",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      borderRadius: 16,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
});
