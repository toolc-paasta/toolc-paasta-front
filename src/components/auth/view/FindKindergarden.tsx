import React from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import code from "../sigungu.json";
import ModalSelector from "react-native-modal-selector";
import { Button, Input, ListItem } from "react-native-elements";
import { areaInfoType, kinderListType, kinderType } from "../types";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from '../../elements/theme'

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

   const ItemView = ({ item }: any) => {
      return (
        <TouchableOpacity style={[
          styles.list,
          selectedKinder?.centerName === item.centerName ? styles.selectedList : styles.defaultList
        ]} onPress={() => onPressKinder(item)}>
          <Text style={[styles.itemStyle, styles.itemStyle1]}>
            {item.centerName}
          </Text>
          <Text style={[styles.itemStyle, styles.itemStyle2]}>
            {item.address}
            {"\n"}
            {item.tel}
          </Text>
        </TouchableOpacity>
      )
   }

   const ItemSeparatorView = () => {
      return (
        // Flat List Item Separator
        <View
          style={{
            height: 0.6,
            width: '100%',
            backgroundColor: '#ffd257',
          }}
        />
      );
   };

   return (
      <View style={styles.container}>
         <ListItem>
            <Text style={{ paddingBottom: 28 }}>설립일</Text>
            <ListItem.Content>
               <Input
                  placeholder="20180429"
                  value={selectedKinder?.foundationDate}
                  onChangeText={(v) => onChangeFoundationDate(v)}
                  containerStyle={{ width: 250 }}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{ fontFamily: "Font" }}
                  errorMessage={foundationDateErr}
               />
            </ListItem.Content>
         </ListItem>
         <View style={styles.selectContainer}>
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
               style={styles.modal}
               cancelText="취소"
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
               style={styles.modal}
               renderItem={() => <></>}
            />
            <Button title="검색" type="clear" 
               titleStyle={{ fontFamily: 'Font', color: colors.primary }}
               onPress={onSearchKinder} />
         </View>
         <FlatList
            data={kinderList}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 20
   },
   selectContainer: {
      flexDirection: "row",
      paddingLeft: 30,
      marginBottom: 32
   },
   listItem: {
      paddingBottom: 0
   },
   list: {
      flexDirection: 'row',
      alignItems:'center',
   },
   selectedList: {
      backgroundColor: colors.secondary
   },
   defaultList: {
      backgroundColor: '#fff'
   },
   inputContainer: {
      borderBottomColor: colors.primary
   },
   kinderListContainer: {
      paddingHorizontal: 20,
      marginVertical: 20
   },
   modal: {
      width: 100,
      marginRight: 20,
      borderRadius: 32
   },
   itemStyle: {
      padding: 5,
      height:60,
      textAlignVertical:'center',
      justifyContent: 'center',
      fontSize:15,
   },
   itemStyle1: {
      position:'relative',
      left:5,
   },
   itemStyle2: {
      position:'absolute',
      right:5,
      fontSize: 11,
      textAlign: 'right'
   },
});

export default FindKindergarden;
