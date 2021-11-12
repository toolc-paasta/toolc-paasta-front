import React, { useEffect } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import Constants from "expo-constants";
import Header from "../../elements/Header";
import { RegisterCenterNoti } from "../types";
import { StackScreenNavigation } from "../../../screens/NoticeScreen";
import { ListItem } from "react-native-elements";
import Button from '../../elements/Button'
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
                  <ListItem.Title style={styles.listItemTitle}>
                     {item.user.name}님이 {isAdmin ? "유치원" : "반"} 등록을 요청했습니다.
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.listItemSubTitle}>
                     아이디 : {item.user.loginId}&nbsp;&nbsp;&nbsp;&nbsp;전화번호 :{" "}
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
                  {isAdmin
                     ? `유치원 이름 : ${item.centerName}`
                     : `유치원 아이디 : ${item.centerId}`}
               </Text>

               <Text style={styles.contentSubtitle}>
                  {isAdmin
                     ? `설립일 : ${item.foundationDate}`
                     : `반 아이디 : ${item.classId}`}
               </Text>
               {isAdmin ? (
                  <Text style={styles.contentSubtitle}>
                     {`주소 : ${item.address}`}
                  </Text>
               ) : (
                  <></>
               )}
               <View style={styles.contentButtonContainer}>
                  <Button
                     title="수락"
                     color="primary"
                     paddingHorizontal={60}
                     onPress={() => onPressAdmit(item)}
                  />
                  <Button
                     title="거절"
                     color="secondary"
                     paddingHorizontal={60}
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
      // paddingTop: Constants.statusBarHeight,
      backgroundColor: "#fff",
   },
   listItemContainer: {},
   contentContainer: {
      padding: 16,
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
      color: "gray",
   },
   contentButtonContainer: {
      marginTop: 16,
      flexDirection: "row",
      justifyContent: "space-around",
   },
   listItemTitle: {
      fontFamily: 'Font',
   },
   listItemSubTitle: {
      fontFamily: 'Font',
   }
});
