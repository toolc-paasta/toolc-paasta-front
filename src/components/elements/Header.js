import React, { useState, useEffect } from "react";
import { Dimensions, Text, View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from './theme'

export default function Header({header_title,setIsSubmit,IsInsert,navigation,setModalVisible,}) {
 
  const onSubmit = () => {
    Alert.alert(
      "공지 작성",
      "공지를 등록하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "확인", onPress: () => {          
          setIsSubmit(true)
        }}
      ]
    );
  }

  const back = () => {
    if(setModalVisible)
      setModalVisible(false)
    else
      navigation.goBack()
  }

  return (
      <View style={styles.header}>
        <Icon 
          style={styles.headerBtn}
          name={'arrow-back'}
          size={25}
          color="black"
          onPress={() => back()}
        />
        <Text style={styles.headerText}>{header_title}</Text>
        {setIsSubmit!=null && (
          <TouchableOpacity style={styles.btn} onPress={()=>onSubmit()}>
            <Text style={styles.btnText}>등록</Text>
          </TouchableOpacity>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  header:{
    height:56,
    alignItems:'center',
    flexDirection: 'row',
    paddingLeft: 14,
    backgroundColor: colors.secondary

  },
  headerText:{
    fontSize:17,
    paddingLeft:20,  
  },
  btn:{
    width:80,
    height:36,
    marginRight: 8,
    borderRadius:10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    position: 'absolute', 
    right: 5
  },
  btnText:{
    textAlign:'center',
    fontSize:15,
    color: colors.background
  },  
});