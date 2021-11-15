import { StackScreenProps } from "@react-navigation/stack";
import { usePubNub } from "pubnub-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getParentsList } from "../../../lib/api/parentsList";
import { pnTimeTokenToHHMM } from "../../../lib/utils/pnTimeToken";
import { authStateType } from "../../../modules/auth";
import { loading, unloading } from "../../../modules/loading";
import { TalkStackScreenParamList } from "../../../screens/TalkScreen";
import { messageType } from "../types";
import ParentList from "../view/ParentList";

type Props = {};

const tempData: authStateType[] = [
   {
      authority: "PARENT",
      childBirthday: "2020-12-12",
      childName: "신성일",
      childSex: "여성",
      connectionNumber: "010-2222-1111",
      hasCenter: true,
      id: 18,
      loginId: "testp11",
      name: "신성일",
      sex: "남성",
   },
];

function ParentListContainer({
   navigation,
}: StackScreenProps<TalkStackScreenParamList, "ParentList">) {
   const [parents, setParents] = useState<authStateType[]>([]);
   const [message, addMessage] = useState<messageType[]>([]);
   const pubnub = usePubNub();

   const dispatch = useDispatch();

   useEffect(() => {
      const getList = async () => {
         try {
            dispatch(loading());
            const data = await getParentsList();
            setParents(data);
            addMessage([]);
            const channels = data.map((item: authStateType) => item.loginId);
            pubnub.fetchMessages(
               {
                  channels: channels,
                  end: Date.now(),
                  count: 1,
               },
               function (status, response) {
                  for (let list in response.channels) {
                     addMessage((prev) => [
                        ...prev,
                        {
                           text: response.channels[list][0].message.text,
                           sender: list,
                        },
                     ]);
                  }
               }
            );
            dispatch(unloading());
         } catch (e) {
            console.log(e.response.data);
         }
      };
      const unsubscribe = navigation.addListener("focus", () => {
         // Screen was focused
         // Do something
         getList();
      });
      return unsubscribe;
   }, [pubnub]);

   const goToTalkRoom = (item: authStateType) => {
      navigation.navigate("TalkRoom", {
         channel: item.loginId,
         title: item.name,
      });
   };

   return (
      <ParentList
         parents={parents}
         goToTalkRoom={goToTalkRoom}
         message={message}
      />
   );
}

export default ParentListContainer;
