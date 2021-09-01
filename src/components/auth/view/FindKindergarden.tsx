import React from "react";
import { StyleSheet, View, Text } from "react-native";
import code from "../sigungu.json";
import ModalSelector from "react-native-modal-selector";
import { Button, ListItem } from "react-native-elements";
import { areaInfoType, kinderListType, kinderType } from "../types";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
   areaInfo: areaInfoType;
   setAreaInfo: (
      value: areaInfoType | ((prev: areaInfoType) => areaInfoType)
   ) => void;
   onSearchKinder: () => Promise<void>;
   kinderList: kinderListType | null;
   onPressKinder: (kinder: kinderType) => void;
   selectedKinder: kinderType | null;
};

const state = code.map((item, idx) => ({ key: idx, label: item.name }));
const area = code.map((item) =>
   item.gugun.map((item) => ({
      key: item.code,
      label: item.name,
   }))
);

// 현재는 테스트 아이디라 리스트 50개까지만 받아올 수 있음
function FindKindergarden({
   areaInfo,
   setAreaInfo,
   onSearchKinder,
   kinderList,
   onPressKinder,
   selectedKinder,
}: Props) {
   return (
      <View style={styles.container}>
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
               renderItem={() => <></>}
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
               renderItem={() => <></>}
            />
            <Button title="검색" type="clear" onPress={onSearchKinder} />
         </View>
         <ScrollView style={styles.kinderListContainer}>
            {kinderList?.map((item, idx) => (
               <ListItem
                  key={`kinder_${idx}`}
                  onPress={() => onPressKinder(item)}
                  style={[
                     styleFunc(item.name === selectedKinder?.name).listItem,
                  ]}>
                  <ListItem.Content>
                     <ListItem.Title>{item.name}</ListItem.Title>
                     <ListItem.Subtitle>
                        {item.tel}
                        {"\t"}
                        {item.addr}
                     </ListItem.Subtitle>
                  </ListItem.Content>
               </ListItem>
            ))}
         </ScrollView>
      </View>
   );
}

const styleFunc = (selected: boolean) =>
   StyleSheet.create({
      listItem: {
         borderColor: selected ? "#2196f3" : "transparent",
         borderWidth: selected ? 2 : 0,
         borderRadius: 20,
         overflow: "hidden",
      },
   });

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
   kinderListContainer: {
      padding: 20,
   },
});

export default FindKindergarden;
