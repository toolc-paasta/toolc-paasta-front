import { usePubNub } from "pubnub-react";
import React, { useState, useEffect, useRef } from "react";
import Map from "../view/Map";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import pubnub from "pubnub";

type Props = {};
type watchKeyType = {
   remove: () => void;
};

function MapContainer({}: Props) {
   const pubnub = usePubNub();
   const [channels] = useState(["map-channel"]);
   const [location, setLocation] = useState<Location.LocationObject | null>();
   const [watchKey, setWatchKey] = useState<watchKeyType | null>();
   const mapViewRef = useRef<MapView>();

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

   const handleMessage = (event: pubnub.MessageEvent) => {
      setLocation(event.message);
   };

   const onPressSharePosition = async () => {
      // 권한 확인
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
         return;
      }

      let location = await Location.getCurrentPositionAsync({});

      Location.watchPositionAsync(
         {
            distanceInterval: 25,
         },
         (position) => {
            setLocation(location);
            pubnub.publish({
               message: position,
               channel: "map-channel",
            });
         }
      ).then((res) => setWatchKey(res));
   };

   const cancleSharePosition = () => {
      watchKey?.remove();
   };

   return (
      <Map
         region={location}
         mapViewRef={mapViewRef}
         onPressSharePosition={onPressSharePosition}
         cancleSharePosition={cancleSharePosition}
      />
   );
}

export default MapContainer;
