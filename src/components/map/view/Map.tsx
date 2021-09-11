import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Button, Image } from "react-native-elements";

type Props = {
   region: Region;
   mapViewRef: React.RefObject<MapView>;
   onPressSharePosition: () => Promise<void>;
   cancleSharePosition: () => void;
   onAnimateRegion: (
      reg: Region,
      details?:
         | {
              isGesture: boolean;
           }
         | undefined
   ) => void;
};

function Map({
   region,
   mapViewRef,
   onPressSharePosition,
   cancleSharePosition,
   onAnimateRegion,
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
            ref={mapViewRef}
            provider={PROVIDER_GOOGLE}
            region={region}
            key="Gmap"
            style={styles.map}
            onRegionChangeComplete={onAnimateRegion}>
            <Marker key={`marker`} coordinate={region}>
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
