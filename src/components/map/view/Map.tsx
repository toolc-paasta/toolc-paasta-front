import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Button, Image } from "react-native-elements";

type Props = {
   region: Location.LocationObject | null | undefined;
   mapViewRef: React.MutableRefObject<MapView | undefined>;
   onPressSharePosition: () => Promise<void>;
   cancleSharePosition: () => void;
};

function Map({
   region,
   mapViewRef,
   onPressSharePosition,
   cancleSharePosition,
}: Props) {
   return (
      <View style={styles.container}>
         <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Button
               title="위치 공유"
               type="clear"
               onPress={onPressSharePosition}
            />
            <Button title="종료" type="clear" onPress={cancleSharePosition} />
         </View>
         <MapView
            provider={PROVIDER_GOOGLE}
            region={{
               latitude: region?.coords.latitude || 0,
               longitude: region?.coords.longitude || 0,
               latitudeDelta: 0.005,
               longitudeDelta: 0.005,
            }}
            key="Gmap"
            style={styles.map}>
            <Marker
               key={`marker`}
               coordinate={{
                  latitude: region?.coords.latitude || 0,
                  longitude: region?.coords.longitude || 0,
               }}>
               <View style={[styles.markerWrap]}>
                  <Image
                     source={require("../../../../assets/map_marker.png")}
                     style={[styles.marker]}
                     resizeMode="cover"
                  />
               </View>
            </Marker>
         </MapView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   map: {
      width: Dimensions.get("window").width,
      height: "100%",
      zIndex: 1,
   },
   markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
   },
   marker: {
      width: 30,
      height: 30,
   },
});

export default Map;
