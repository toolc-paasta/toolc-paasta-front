import React, { useState, useEffect, useRef } from "react";
import { BottomTabNavigation } from "../../../screens/ShuttleScreen";
import Shuttle from "../view/Shuttle";
import { usePubNub } from "pubnub-react";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import pubnub from "pubnub";
import { parseToRegion } from "../../../lib/utils/parseLocation";
import { useKeepAwake } from "expo-keep-awake";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules";
import constants from "../../../lib/utils/constants";
import { channel } from "redux-saga";
import {
   sendShuttleFCMMessage,
   sendShuttleFCMMessageTeacher,
} from "../../../lib/api/fcm";

type Props = {
   navigation: BottomTabNavigation;
};

type watchKeyType = {
   remove: () => void;
};

function ShuttleContainer({ navigation }: Props) {
   const pubnub = usePubNub();
   const auth = useSelector(({ auth }: RootState) => auth);
   const [channel, setChannel] = useState(
      auth.authority === constants.authority_director
         ? auth.loginId
         : auth.directorLoginId
   );
   const [location, setLocation] = useState<Location.LocationObject | null>();
   const [region, setRegion] = useState<Region>({
      latitude: 37.564552581327064,
      longitude: 126.97553710474944,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
   });
   const [watchKey, setWatchKey] = useState<watchKeyType | null>();
   const mapViewRef = useRef<MapView>() as React.RefObject<MapView>;
   const [onSharing, setOnSharing] = useState<boolean>(false);

   useKeepAwake();

   useEffect(() => {
      const pubnubListeners = {
         message: handleMessage,
      };
      pubnub.addListener(pubnubListeners);
      if (channel) {
         pubnub.subscribe({ channels: [channel] });
      }
      return () => {
         pubnub.removeListener(pubnubListeners);
         pubnub.unsubscribeAll();
      };
   }, [pubnub, channel]);

   useEffect(() => {
      if (location) {
         const parsed = parseToRegion(location);
         mapViewRef.current?.animateToRegion(parsed, 1000);
      }
   }, [location, mapViewRef]);

   const handleMessage = (event: pubnub.MessageEvent) => {
      setLocation(event.message);
   };

   const onPressSharePosition = async () => {
      // ?????? ??????
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
         return;
      }
      setOnSharing(true);
      if (auth.authority === constants.authority_director) {
         sendShuttleFCMMessage();
      } else if (auth.authority === constants.authority_teacher) {
         sendShuttleFCMMessageTeacher();
      }
      Location.watchPositionAsync(
         {
            accuracy: Location.Accuracy.Highest,
            distanceInterval: 25,
         },
         (position) => {
            if (channel !== null && channel !== undefined) {
               pubnub.publish({
                  message: position,
                  channel: channel, // ????????? ????????? ???????????? ??????.
               });
            }
         }
      ).then((res) => setWatchKey(res));
   };

   // ??????????????? ???????????????, ????????? ???????????? region set

   const onAnimateRegion = (
      reg: Region,
      details?:
         | {
              isGesture: boolean;
           }
         | undefined
   ) => {
      if (!details?.isGesture) {
         setRegion(reg);
      }
   };

   const cancleSharePosition = () => {
      watchKey?.remove();
      setOnSharing(false);
   };

   return (
      <Shuttle
         auth={auth}
         navigation={navigation}
         region={region}
         onSharing={onSharing}
         mapViewRef={mapViewRef}
         onPressSharePosition={onPressSharePosition}
         onAnimateRegion={onAnimateRegion}
         cancleSharePosition={cancleSharePosition}
      />
   );
}

export default ShuttleContainer;
