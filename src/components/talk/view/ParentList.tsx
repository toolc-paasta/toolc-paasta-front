import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { navigationRef } from "../../../../RootNavigation";
import Header from "../../elements/Header";
import Constants from "expo-constants";
import { authStateType } from "../../../modules/auth";
import { Icon, ListItem } from "react-native-elements";
import { messageType } from "../types";

type Props = {
   parents: authStateType[];
   goToTalkRoom: (channel: authStateType) => void;
   message: messageType[];
};

function ParentList({ parents, goToTalkRoom, message }: Props) {
   return (
      <View style={styles.container}>
         <Header
            header_title={"담당 학부모님들"}
            navigation={navigationRef.current}
            setIsSubmit={null}
            IsInsert={null}
            setModalVisible={false}
         />
         <View style={{ flex: 1 }}>
            {parents.length === 0 ? (
               <View
                  style={{
                     flex: 1,
                     alignItems: "center",
                     justifyContent: "center",
                  }}>
                  <Text style={{ fontSize: 20 }}>
                     아직 등록된 학부모님이 없습니다.
                  </Text>
               </View>
            ) : (
               <FlatList
                  data={parents}
                  renderItem={({ item }) => (
                     <ListItem onPress={() => goToTalkRoom(item)}>
                        <ListItem.Content>
                           <ListItem.Title style={{ fontFamily: 'Font' }}>{item.name} 학부모님</ListItem.Title>
                           <ListItem.Subtitle style={{ fontFamily: 'Font' }}>
                              최근 메시지 :{" "}
                              {
                                 message?.filter(
                                    (m) => m.sender === item.loginId
                                 )[0]?.text
                              }
                           </ListItem.Subtitle>
                        </ListItem.Content>
                     </ListItem>
                  )}
                  keyExtractor={(item, index) => `${item.loginId}`}
               />
            )}
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
});

export default ParentList;
