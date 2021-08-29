import React from "react";
import { StyleSheet, View, Text } from "react-native";
import code from "../sigungu.json";
import ModalSelector from "react-native-modal-selector";
import { Button } from "react-native-elements";

const state = code.map((item, idx) => ({ key: idx, label: item.name }));
const area = code.map((item) =>
   item.gugun.map((item) => ({
      key: item.code,
      label: item.name,
   }))
);

function FindKindergarden({ areaInfo, setAreaInfo }) {
   return (
      <View iew style={styles.container}>
         <View style={styles.selectContaienr}>
            <ModalSelector
               data={state}
               initValue="지역"
               keyExtractor={(item) => item.key}
               onChange={(option) =>
                  setAreaInfo({
                     area: 0,
                     state: option.key,
                  })
               }
               style={{ width: 120, marginRight: 20 }}
            />
            <ModalSelector
               data={area[areaInfo.state]}
               initValue="시군구"
               onChange={(option) =>
                  setAreaInfo((prev) => ({
                     ...prev,
                     area: parseInt(option.key),
                  }))
               }
               style={{ width: 120, marginRight: 20 }}
            />
            <Button title="검색" type="clear" />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   selectContaienr: {
      flexDirection: "row",
      paddingLeft: 30,
      paddingTop: 30,
   },
});

export default FindKindergarden;
