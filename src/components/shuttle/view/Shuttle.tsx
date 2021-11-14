import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Constants from "expo-constants";
import Header from "../../elements/Header";
import { BottomTabNavigation } from "../../../screens/ShuttleScreen";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Button, Image } from "react-native-elements";
import { authStateType } from "../../../modules/auth";
import constants from "../../../lib/utils/constants";

type Props = {
   navigation: BottomTabNavigation;
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
   auth: authStateType;
   onSharing: boolean;
};

export default function Shuttle({
   auth,
   navigation,
   region,
   onSharing,
   mapViewRef,
   onPressSharePosition,
   cancleSharePosition,
   onAnimateRegion,
}: Props) {
   return (
      <View style={styles.container}>
         <Header
            header_title={"셔틀버스"}
            navigation={navigation}
            setIsSubmit={null}
            IsInsert={null}
            setModalVisible={false}
         />
         <View style={{ flex: 1 }}>
            {(auth.authority === constants.authority_director ||
               auth.authority === constants.authority_teacher) && (
               <>
                  {!onSharing ? (
                     <Button
                        title="위치 공유 시작"
                        type="clear"
                        onPress={onPressSharePosition}
                     />
                  ) : (
                     <Button
                        title="종료"
                        type="clear"
                        onPress={cancleSharePosition}
                     />
                  )}
               </>
            )}
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
