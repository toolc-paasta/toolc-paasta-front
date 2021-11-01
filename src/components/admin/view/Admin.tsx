import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, Icon, ListItem } from "react-native-elements";
import { RegisterCenterNoti } from "../types";

type Props = {
   registerCenterNotis: RegisterCenterNoti[];
   onPressAdmit: (registerCenterNoti: RegisterCenterNoti) => Promise<void>;
   onPressDeny: (registerCenterNoti: RegisterCenterNoti) => Promise<void>;
};

function Admin({ registerCenterNotis, onPressAdmit, onPressDeny }: Props) {
   const [expandeds, setExpandeds] = React.useState<boolean[]>(
      new Array(registerCenterNotis.length)
   );

   useEffect(() => {
      setExpandeds(new Array(registerCenterNotis.length).fill(false));
   }, [registerCenterNotis]);

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
                  <ListItem.Title>{item.title}</ListItem.Title>
                  <ListItem.Subtitle>{item.body}</ListItem.Subtitle>
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
               <Text style={styles.contentTitle}>{item.body}</Text>
               <Text style={styles.contentSubtitle}>
                  유치원 이름 : {item.data.centerName}
               </Text>

               <Text style={styles.contentSubtitle}>
                  설립일 : {item.data.foundationDate}
               </Text>

               <Text style={styles.contentSubtitle}>
                  주소 : {item.data.address}
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
         <FlatList
            data={registerCenterNotis}
            renderItem={renderItem}
            keyExtractor={(item, index) => `received_${index}`}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   listItemContainer: {},
   contentContainer: {
      padding: 10,
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

export default Admin;
