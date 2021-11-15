import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions,Image} from 'react-native';
import Constants from 'expo-constants';
import { comment } from '../../elements/data';
import Header from '../../elements/Header'
import { BottomTabNavigation } from "../../../screens/NoticeBoardScreen";
import { colors } from '../../elements/theme'

type List = {
  dateTime: string; 
  title: string; 
  content:string;
}

type Props = {
  data:List;  
  setModalVisible:React.Dispatch<React.SetStateAction<boolean>>;
  header_title:string;
  navigation:BottomTabNavigation;
};

export default function ListDetail({data,setModalVisible,header_title,navigation,} :Props) {

  return (
    <ScrollView style={styles.container}>
      <Header header_title={header_title} setModalVisible={setModalVisible} setIsSubmit={null} navigation={navigation} IsInsert={null}/>
      <View style={styles.listContainer}>
        <View style={[styles.box, styles.box1]}>
          <Text style={styles.input1}>{data.title}</Text>
          <Text style={styles.input1_2}>{data.dateTime.split('-')[1]}월 {data.dateTime.split('-')[2]}일</Text>
        </View>
        <View style={[styles.box, styles.box2]}>
          <Text style={styles.input2} >{data.content}</Text>
        </View>
        {data?.img != '' &&(
          <View style={[styles.box, styles.box2]}>
            <Image
              style={{height:200,width:'100%'}}
              source={{uri:data.img}}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  listContainer: {
    paddingHorizontal: 16
  },
  box: {
    paddingTop:10,
    paddingBottom:10,
    width: Dimensions.get('window').width-30,
    borderBottomWidth:1,
    borderBottomColor: colors.secondary,
  },
  box1:{
    flexDirection: 'row',
  },
  box2:{
    
  },
  box3:{
    borderBottomWidth:0,
  },
  input1:{
    width: 250,
    padding:5,
    fontSize:20
  },
  input1_2:{
    position:'absolute',
    right:0,
    top:20,
  },
  input2:{
    textAlignVertical:'top',
    padding:5,
  },
  list:{
    alignItems: 'center',
    height:70,
    flexDirection: 'row',
    padding:5,
  },
  mainText:{
    fontWeight:'bold',
    fontSize:15,
    paddingBottom:10,
    textAlign:'left',
  },
  subText:{
    width:250,
    fontSize:13,
  },
  numText:{
    position:'absolute',
    right:5,
    fontSize:12,
    textAlign:'right',
    paddingTop:1,
    width:50,
    height:20
  },
});