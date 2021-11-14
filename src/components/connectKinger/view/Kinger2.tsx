import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { loading, unloading } from "../../../modules/loading";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert 
} from 'react-native';
import Constants from 'expo-constants';
import { colors } from "../../elements/theme";

type Props = {
  kingerClasses: any;
  kingerClass: string;
  setKingerClass:React.Dispatch<React.SetStateAction<any>>;
};

export default function Kinger2({ kingerClasses, kingerClass, setKingerClass }:Props) {

  const dispatch = useDispatch();

  useEffect(() => {

    
  }, [])

  const ItemView = ({ item }: any) => {
    return (
      <TouchableOpacity style={[
        styles.list,
        kingerClass === item.className ? styles.selectedList : styles.defaultList
      ]} onPress={() => setKingerClass(item.className)}>
        <Text style={[styles.itemStyle,styles.itemStyle1]}>
          {item.className}
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
      <View style={{ flex: 1 }}>
        {kingerClasses.length === 0 && (
          <Text style={{ textAlign: 'center', fontSize: 20 }}>아직 등록된 반이 없습니다.</Text>
        )}
        <FlatList
          data={kingerClasses}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: 5,
    overflow:'hidden',
    height:'90%'
  },
  searchBox:{
    flexDirection: 'row',
    alignItems:'center',
    borderRadius:10,
    height:50,
    borderWidth: 1,
    borderColor:colors.primary,
    marginBottom:15,
    padding:10,
  },
  list:{
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:'#fff',
    marginHorizontal: 8
  },
  selectedList: {
    backgroundColor: '#fee9b0'
  },
  defaultList: {
    backgroundColor:'#fff'
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
  },
  iconBox:{
  },
  icon:{
  },
  textInputStyle: {
    paddingLeft:10,
  },
});