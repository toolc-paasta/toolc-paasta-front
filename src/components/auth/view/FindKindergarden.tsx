import React from "react";
import { StyleSheet, View, Text } from "react-native";
import code from "../sigungu.json";
import ModalSelector from "react-native-modal-selector";
import { Button, Input, ListItem } from "react-native-elements";
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
   foundationDateErr: string;
   onChangeFoundationDate: (v: string) => void;
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
   foundationDateErr,
   onChangeFoundationDate,
}: Props) {
   return (
      <View style={styles.container}>
         <ListItem>
            <Text>설립일</Text>
            <ListItem.Content
               style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
               }}>
               <Input
                  placeholder="20180429"
                  value={selectedKinder?.foundationDate}
                  onChangeText={(v) => onChangeFoundationDate(v)}
                  containerStyle={{ width: 200 }}
                  errorMessage={foundationDateErr}
               />
            </ListItem.Content>
         </ListItem>
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
                     styleFunc(item.centerName === selectedKinder?.centerName)
                        .listItem,
                  ]}>
                  <ListItem.Content>
                     <ListItem.Title>{item.centerName}</ListItem.Title>
                     <ListItem.Subtitle>
                        {item.tel}
                        {"\t"}
                        {item.address}
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
   },
   kinderListContainer: {
      padding: 20,
   },
});

export default FindKindergarden;
