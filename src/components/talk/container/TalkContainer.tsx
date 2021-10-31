import { StackScreenProps } from "@react-navigation/stack";
import { usePubNub } from "pubnub-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules";
import { TalkStackScreenParamList } from "../../../screens/TalkScreen";
import { messageType } from "../types";
import Talk from "../view/Talk";

type Props = {};

function TalkContainer({
   route,
}: StackScreenProps<TalkStackScreenParamList, "TalkRoom">) {
   const { channel } = route?.params;
   const auth = useSelector(({ auth }: RootState) => auth);
   const pubnub = usePubNub();
   const [channels] = useState([channel]);
   const [messages, addMessage] = useState<messageType[]>([]);
   const [message, setMessage] = useState("");

   useEffect(() => {
      pubnub.fetchMessages(
         {
            channels: [channel],
            end: Date.now(),
            count: 25, // default/max is 25 messages for multiple channels (up to 500)
         },
         function (status, response) {
            addMessage(
               response?.channels[channel]?.map((item) => item.message)
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

   const handleMessage = (event: any) => {
      const message = event.message;
      if (message.sender === auth.loginId) {
         addMessage((messages) => [...messages, message]);
      } else {
         addMessage((messages) => [...messages, message]);
      }
   };

   const sendMessage = (message: string) => {
      if (message) {
         pubnub
            .publish({
               channel: channels[0],
               message: { text: message, sender: auth.loginId },
            })
            .then(() => setMessage(""));
      }
   };

   const onChange = (v: string) => {
      setMessage(v);
   };

   return (
      <Talk
         messages={messages}
         message={message}
         onChange={onChange}
         sendMessage={sendMessage}
         myId={auth.loginId}
      />
   );
}

export default TalkContainer;
