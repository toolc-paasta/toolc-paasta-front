import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import { comment } from '../../elements/data';
import Header from '../../elements/Header'
export default function ListDetail({data,date,setModalVisible,navigation,header_title}) {

  const makeTime = (t) => {
    const sec = Math.floor((date.getTime()-t.getTime())/1000)
    let temp = sec
    let count = 0
    const unit = ['초','분','시간','일']
    while(temp>24){
      if(count<2 && temp>60)
        temp = parseInt(temp/60)
      else if(count>=2)
        temp = parseInt(temp/24)
      else
        return(temp+unit[count]+' 전')
      count++
    }
    return(temp+unit[count]+' 전')
    
  }

  return (
    <ScrollView style={styles.container}>
      <Header header_title={header_title} setModalVisible={setModalVisible} navigation={navigation}/>
      <View style={[styles.box, styles.box1]}>
        <Text style={styles.input1}>{data.title}</Text>
        <Text style={styles.input1_2}>{data.time.getMonth()+1}월 {data.time.getDate()}일</Text>
      </View>
      <View style={[styles.box, styles.box2]}>
        <Text style={styles.input2}>{data.content}</Text>
      </View>
      <View style={[styles.box, styles.box3]}>
        <Text style={styles.input1}>댓글</Text>
      </View>
      {comment.map((item, i) => (
        <View style={styles.list} key={i} >
          <View>
            <Text style={styles.mainText}>{item.nickname}</Text>
            <Text style={styles.subText} numberOfLines={1}>{item.content}</Text>
          </View>
          <Text style={styles.numText}>{makeTime(item.time)}</Text>
        </View>  
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  box: {
    paddingTop:10,
    paddingBottom:10,
    width: Dimensions.get('window').width-30,
    borderBottomWidth:1,
    borderBottomColor:'#bdbdbd',
  },
  box1:{
    flexDirection: 'row',
  },
  box3:{
    borderBottomWidth:0,
  },
  input1:{
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