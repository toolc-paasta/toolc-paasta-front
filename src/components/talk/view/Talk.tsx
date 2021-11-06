import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import Header from "../../elements/Header";
import { navigationRef } from "../../../../RootNavigation";
import { Button, Input, ListItem } from "react-native-elements";
import { messageType } from "../types";

type Props = {
   messages: messageType[];
   sendMessage: (message: string) => void;
   onChange: (v: string) => void;
   message: string;
   myId: string;
   scrollViewRef: React.RefObject<ScrollView | undefined>;
};

export default function Talk({
   messages,
   message,
   onChange,
   sendMessage,
   myId,
   scrollViewRef,
}: Props) {
   return (
      <View style={styles.container}>
         <Header
            header_title={"개인톡"}
            navigation={navigationRef.current}
            setIsSubmit={null}
            IsInsert={null}
            setModalVisible={false}
         />
         <View style={{ flex: 1 }}>
            <View style={styles.chatBox}>
               <ScrollView ref={scrollViewRef}>
                  {messages?.map((item, idx) => {
                     const isMe = myId === item.sender;
                     return (
                        <View key={`message_${idx}`}>
                           <ListItem key={idx}>
                              <ListItem.Content
                                 style={
                                    stylesFunc({
                                       isMe: isMe,
                                    }).chat
                                 }>
                                 <ListItem.Title
                                    style={
                                       stylesFunc({
                                          isMe: isMe,
                                       }).content
                                    }>
                                    {item.text}
                                 </ListItem.Title>
                              </ListItem.Content>
                           </ListItem>
                           <View
                              style={[
                                 stylesFunc({
                                    isMe: isMe,
                                 }).chat,
                                 {
                                    paddingLeft: isMe ? 0 : 25,
                                    paddingRight: isMe ? 25 : 0,
                                    bottom: 10,
                                 },
                              ]}>
                              <Text style={{ fontSize: 10, color: "gray" }}>
                                 {item.time}
                              </Text>
                           </View>
                        </View>
                     );
                  })}
               </ScrollView>
            </View>
            <View style={styles.inputBox}>
               <Input
                  value={message}
                  onChangeText={onChange}
                  containerStyle={{ width: "85%" }}
               />
               <Button
                  title="send"
                  type="clear"
                  onPress={() => sendMessage(message)}
                  containerStyle={{ width: "13%" }}
               />
            </View>
         </View>
      </View>
   );
}

const stylesFunc = ({ isMe }: { isMe: boolean }) =>
   StyleSheet.create({
      chat: {
         flexDirection: "row",
         justifyContent: isMe ? "flex-end" : "flex-start",
      },
      content: {
         padding: 10,
         borderWidth: 1,
         borderRadius: 20,
         borderColor: "rgba(0,0,0,0.5)",
      },
   });

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      paddingTop: Constants.statusBarHeight,
      backgroundColor: "#fff",
      padding: 15,
   },
   chatBox: {
      flex: 9,
   },
   inputBox: {
      flex: 1,
      flexDirection: "row",
   },
});
