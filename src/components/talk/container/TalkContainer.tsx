import { StackScreenProps } from "@react-navigation/stack";
import { usePubNub } from "pubnub-react";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import constants from "../../../lib/utils/constants";
import { pnTimeTokenToHHMM } from "../../../lib/utils/pnTimeToken";
import { RootState } from "../../../modules";
import { TalkStackScreenParamList } from "../../../screens/TalkScreen";
import { messageType } from "../types";
import Talk from "../view/Talk";
import { sendFCMMessage } from "../../../lib/api/fcm";

type Props = {};

function TalkContainer({
   route,
}: StackScreenProps<TalkStackScreenParamList, "TalkRoom">) {
   const { channel, title } = route?.params;
   const auth = useSelector(({ auth }: RootState) => auth);
   const pubnub = usePubNub();
   const [channels] = useState([channel]);
   const [messages, addMessage] = useState<messageType[]>([]);
   const [message, setMessage] = useState("");
   const scrollViewRef = useRef<ScrollView | null>(null);

   useEffect(() => {
      pubnub.fetchMessages(
         {
            channels: [channel],
            end: Date.now(),
            count: 25, // default/max is 25 messages for multiple channels (up to 500)
         },
         function (status, response) {
            addMessage(
               response?.channels[channel]?.map((item) => {
                  return {
                     ...item.message,
                     time: pnTimeTokenToHHMM(item.timetoken),
                  };
               })
            );
         }
      );
   }, [auth, pubnub, channels]);

   useEffect(() => {
      const pubnubListeners = {
         message: handleMessage,
      };
      pubnub.addListener(pubnubListeners);
      pubnub.subscribe({ channels });
      return () => {
         pubnub.removeListener(pubnubListeners);
         pubnub.unsubscribeAll();
      };
   }, [pubnub, channels]);

   useEffect(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
   }, [messages, scrollViewRef.current]);

   useEffect(() => {
      const keyboardShowCallback = () => {
         scrollViewRef.current?.scrollToEnd({ animated: true });
      };
      Keyboard.addListener("keyboardDidShow", keyboardShowCallback);
      return () => {
         Keyboard.removeAllListeners("keyboardDidShow");
      };
   }, [scrollViewRef]);

   const handleMessage = (event: any) => {
      const message = event.message;
      addMessage((messages) => {
         if (messages && messages.length > 0) {
            return [
               ...messages,
               { ...message, time: pnTimeTokenToHHMM(event.timetoken) },
            ];
         } else {
            return [{ ...message, time: pnTimeTokenToHHMM(event.timetoken) }];
         }
      });
   };

   const checkPresence = (message: string) => {
      // 상대 있는지 체크
      pubnub.hereNow(
         {
            channels: channels,
            includeState: true,
         },
         function (status, response) {
            let check = false;
            response?.channels?.[channel]?.occupants.forEach((item) => {
               if (auth.authority === constants.authority_parent) {
                  if (
                     item.uuid !== auth.loginId &&
                     item.uuid !== "Console_Admin"
                  ) {
                     // 학부모일때 나 아닌 존재는 선생님
                     check = true;
                  }
               } else {
                  if (item.uuid === channel) {
                     // 선생님일때는 채널명이 학부모 아이디
                     check = true;
                  }
               }
            });
            if (!check) {
               // check = false면, 아직 아무도 없는 것 -> 1:1 메세지 보내기
               if (
                  auth.authority === constants.authority_parent &&
                  auth.teacherLoginId
               ) {
                  sendFCMMessage(
                     `${auth.name} 님의 메세지`,
                     message,
                     auth.teacherLoginId
                  );
               } else {
                  sendFCMMessage(`담임선생님의 메세지`, message, channel);
               }
            }
         }
      );
   };

   const sendMessage = (message: string) => {
      if (message) {
         pubnub
            .publish({
               channel: channels[0],
               message: { text: message, sender: auth.loginId },
            })
            .then(() => {
               // 상대 있는지 체크
               checkPresence(message);
               setMessage("");
            });
      }
   };

   const onChange = (v: string) => {
      setMessage(v);
   };

   return (
      <Talk
         title={title}
         messages={messages}
         message={message}
         onChange={onChange}
         sendMessage={sendMessage}
         myId={auth.loginId}
         scrollViewRef={scrollViewRef}
      />
   );
}

export default TalkContainer;
