import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet} from 'react-native';
import { current_list } from './data';

export default function MenuWithList() {


  return (
    <>
      <Text style={styles.articleMainText}>즐겨찾기 메뉴</Text>
      <View style={styles.listContainer}>
        {current_list.map((item, i) => (
          <View style={styles.list} key={i}>
            <Text style={styles.mainText}>{item.title}</Text>
            <Text style={styles.subText} numberOfLines={1}>{item.content}</Text>
            <Text style={styles.newText}>N</Text>
          </View>  
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    listContainer:{
    justifyContent: 'center',
    padding:10
  },
  list:{
    alignItems: 'center',
    height:40,
    flexDirection: 'row',
    
  },
  mainText:{
    fontWeight:'bold',
    fontSize:13,
    paddingRight:10,
    textAlign:'left'
  },
  subText:{
      width:150,
  },
  newText:{
    borderRadius:10,
    backgroundColor:'red',
    color:'#fff',
    position:'absolute',
    right:5,
    fontSize:12,
    textAlign:'center',
    paddingTop:1,
    width:20,
    height:20
  },
  articleMainText:{
    fontSize:20,
    paddingBottom:5,
    fontFamily:'Font'
  },
});
