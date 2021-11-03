import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,

  TouchableOpacity
} from 'react-native';

type Props = {
    area1:string;
    area2:string;
    kingerName:string;
    auth:any;
  };

export default function Kinger3({area1,area2,kingerName,auth}:Props) {

  return (
    
    <View style={styles.container}>      
      <View style={[styles.graph]}>
        <View style={styles.row}>
          <View style={[styles.left,styles.left0]}>
            <Text style={[styles.confirmText,styles.leftText]}>소속 시/도</Text>  
          </View>
          <View style={styles.right}>
            <Text style={[styles.confirmText,styles.rightText]}>{area1}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.left]}>
            <Text style={[styles.confirmText,styles.leftText]}>소속 시/군/구</Text>
          </View>
          <View style={styles.right}>
            <Text style={[styles.confirmText,styles.rightText]}>{area2}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.left]}>
            <Text style={[styles.confirmText,styles.leftText]}>가입 유치원</Text>
          </View>
          <View style={styles.right}>
            <Text style={[styles.confirmText,styles.rightText]}>{kingerName}</Text>
          </View>
        </View>
        <View style={[styles.row,styles.row0]}>
          <View style={[styles.left,styles.left1]}>
            <Text style={[styles.confirmText,styles.leftText]}>가입자</Text>
          </View>
          <View style={styles.right}>
            <Text style={[styles.confirmText,styles.rightText]}>{auth.name}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.confirmBtn]} onPress={() => console.log()}>
        <Text style={[styles.confirmText,styles.confirmBtnText]}>등록하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    height:'100%'
  },
  questionText:{
    fontSize:25,
    paddingBottom:10
  },
  graph:{
    width:'90%',
    borderWidth:1,
    borderColor:'#ffd257',
    borderRadius:10,
    flexDirection:'column',
  },
  row:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'#fee9b0',
    height:60,
    justifyContent: 'center',
    alignItems:'center',
  },
  row0:{
    borderBottomWidth:0,
  },
  confirmText:{
    
    fontSize:15,
    paddingBottom:10,
    textAlign:'center'
  },
  left0:{
    borderTopLeftRadius:10,
  },
  left1:{
    borderBottomLeftRadius:10,
  },
  left:{
    flex:1,
    height:'100%',
    justifyContent:'center',
    backgroundColor:'#ffd257',
  },
  right:{
    flex:1.5,
    height:'100%',
    justifyContent:'center',
  },
  leftText:{
    color:"#ffffff"
  },
  rightText:{

  },
  confirmBtn:{
    marginTop:30,
    borderRadius:10,
    backgroundColor:'#ffd257',
    width:150,
    height:50,
    paddingTop:10,
    justifyContent: 'center',
  },
  confirmBtnText:{
    fontSize:18,
    textAlign:'center',
    color:'#fff',
    fontWeight:'bold',
    
  },
});