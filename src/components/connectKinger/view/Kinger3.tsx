import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { BottomTabNavigation } from "../../../screens/ShuttleScreen";
import Button from '../../elements/Button'
import { registerClass } from '../../../lib/api/connectKinger'

type Props = {
    kingerName: string;
    kingerClass: string;
    auth: any;
    navigation: BottomTabNavigation;
  };

export default function Kinger3({ kingerName, kingerClass, auth, navigation }:Props) {

  return (
    
    <View style={styles.container}>
      <Text style={styles.notice}>
        해당 정보로 가입 요청하시겠습니까?
      </Text>
      <View style={[styles.graph]}>
        <View style={styles.row}>
          <View style={[styles.left, styles.left0]}>
            <Text style={[styles.confirmText,styles.leftText]}>가입 유치원</Text>
          </View>
          <View style={styles.right}>
            <Text style={[styles.confirmText,styles.rightText]}>{kingerName}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.left]}>
            <Text style={[styles.confirmText,styles.leftText]}>가입 반</Text>
          </View>
          <View style={styles.right}>
            <Text style={[styles.confirmText,styles.rightText]}>{kingerClass}</Text>
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
      <Button
        title='요청하기                  '
        color='primary'
        wide
        onPress={() => {
          registerClass({centerName: kingerName, className: kingerClass})
          navigation.navigate('Home')
        }}
        paddingHorizontal={24}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    height:'100%'
  },
  notice: {
    fontSize: 24,
    marginVertical: 32
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
    marginBottom: 32
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