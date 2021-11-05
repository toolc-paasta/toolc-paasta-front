import React, { useEffect } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import Constants from "expo-constants";
import Header from "../../elements/Header";
import { RegisterCenterNoti } from "../types";
import { StackScreenNavigation } from "../../../screens/NoticeScreen";
import { Button, ListItem } from "react-native-elements";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules";

type Props = {
   navigation: StackScreenNavigation;
   registerCenterNotis: RegisterCenterNoti[];
   onPressAdmit: (registerCenterNoti: RegisterCenterNoti) => Promise<void>;
   onPressDeny: (registerCenterNoti: RegisterCenterNoti) => Promise<void>;
};

export default function Notice({
   navigation,
   registerCenterNotis,
   onPressAdmit,
   onPressDeny,
}: Props) {
   const [expandeds, setExpandeds] = React.useState<boolean[]>(
      new Array(registerCenterNotis.length)
   );
   const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
   const auth = useSelector(({ auth }: RootState) => auth);

   useEffect(() => {
      setExpandeds(new Array(registerCenterNotis.length).fill(false));
      if (auth.authority === "ADMIN") {
         setIsAdmin(true);
      }
   }, [registerCenterNotis, auth]);

   console.log(registerCenterNotis);
   const renderItem = ({
      item,
      index,
   }: {
      item: RegisterCenterNoti;
      index: number;
   }) => {
      return (
         <ListItem.Accordion
            bottomDivider={!expandeds[index]}
            content={
               <ListItem.Content>
                  <ListItem.Title>
                     {item.user.name}님의 {isAdmin ? "유치원 " : "반 "} 등록
                     요청
                  </ListItem.Title>
                  <ListItem.Subtitle>
                     아이디 : {item.user.id}, 전화번호 :{" "}
                     {item.user.connectionNumber}
                  </ListItem.Subtitle>
               </ListItem.Content>
            }
            isExpanded={expandeds[index]}
            onPress={() => {
               setExpandeds((prev) => {
                  const newExpandeds = [...prev];
                  newExpandeds[index] = !newExpandeds[index];
                  return newExpandeds;
               });
            }}>
            <View style={styles.contentContainer}>
               <Text style={styles.contentSubtitle}>
                  {isAdmin ? `유치원 이름 : ${item.centerName}` : ""}
               </Text>

               <Text style={styles.contentSubtitle}>
                  {isAdmin ? `설립일 : ${item.foundationDate}` : ""}
               </Text>

               <Text style={styles.contentSubtitle}>
                  {isAdmin ? `주소 : ${item.address}` : ""}
               </Text>
               <View style={styles.contentButtonContainer}>
                  <Button
                     title={"수락"}
                     type="clear"
                     containerStyle={{ flexGrow: 1 }}
                     onPress={() => onPressAdmit(item)}
                  />
                  <Button
                     title={"거절"}
                     type="clear"
                     containerStyle={{ flexGrow: 1 }}
                     titleStyle={{ color: "red" }}
                     onPress={() => onPressDeny(item)}
                  />
               </View>
            </View>
         </ListItem.Accordion>
      );
   };
   return (
      <View style={styles.container}>
         <Header
            header_title={"알림"}
            navigation={navigation}
            setIsSubmit={null}
            IsInsert={null}
            setModalVisible={false}
         />
         <View style={styles.container}>
            <FlatList
               data={registerCenterNotis}
               renderItem={renderItem}
               keyExtractor={(item, index) => `received_${index}`}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      paddingTop: Constants.statusBarHeight,
      backgroundColor: "#fff",
   },
   listItemContainer: {},
   contentContainer: {
      padding: 15,
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
   },
   contentTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
   },
   contentSubtitle: {
      marginBottom: 10,
      color: "gray",
   },
   contentButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
   },
});
