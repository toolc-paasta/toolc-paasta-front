import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import Header from "../../elements/Header";
import { navigationRef } from "../../../../RootNavigation";
import { Input, ListItem } from "react-native-elements";
import Button from "../../elements/Button";
import { messageType } from "../types";
import { colors } from "../../elements/theme";

type Props = {
   messages: messageType[];
   sendMessage: (message: string) => void;
   onChange: (v: string) => void;
   message: string;
   myId: string;
   scrollViewRef: React.RefObject<ScrollView>;
   title: string | undefined;
};

export default function Talk({
   messages,
   message,
   onChange,
   sendMessage,
   myId,
   scrollViewRef,
   title,
}: Props) {
   return (
      <View style={styles.container}>
         <Header
            header_title={title ? `${title} 학부모님` : "담임선생님"}
            navigation={navigationRef.current}
            setIsSubmit={null}
            IsInsert={null}
            setModalVisible={false}
         />
         <View style={{ flex: 1, paddingHorizontal: 4 }}>
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
                              <Text
                                 style={{
                                    fontSize: 10,
                                    color: "gray",
                                    fontFamily: "Font",
                                 }}>
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
                  containerStyle={{ width: "80%" }}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.input}
               />
               <Button
                  title="전송"
                  color="primary"
                  onPress={() => sendMessage(message)}
                  paddingHorizontal={16}
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
         paddingHorizontal: 14,
         borderRadius: 32,
         backgroundColor: isMe ? colors.primary : colors.secondary,
         fontFamily: "Font",
      },
   });

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      // paddingTop: Constants.statusBarHeight,
      backgroundColor: "#fff",
   },
   inputContainer: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 12,
      height: 50,
      paddingHorizontal: 8,
   },
   input: {
      fontFamily: "Font",
   },
   chatBox: {
      flex: 9,
   },
   inputBox: {
      height: 50,
      flexDirection: "row",
   },
});
