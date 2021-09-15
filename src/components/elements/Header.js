import React, { useState, useEffect } from "react";
import { Dimensions, Text, View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header({header_title,setIsSubmit,IsInsert,navigation,setModalVisible,}) {
 

  const onSubmit = () => {
    Alert.alert(
      "가정통신문",
      "전송하시겠습니까?",
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
          name={'arrow-back-outline'}
          size={30}
          color="black"
          onPress={() => back()}
        />
        <Text style={styles.headerText}>{header_title}</Text>
        {setIsSubmit!=null && (
          <TouchableOpacity style={styles.btn} onPress={()=>onSubmit()}>
            <Text style={styles.btnText}>전송</Text>
          </TouchableOpacity>
        )}
        {IsInsert!=null && (
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('UploadNotice')}>
            <Text style={styles.btnText}>글쓰기</Text>
          </TouchableOpacity>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  header:{
    height:40,
    alignItems:'center',    
    borderBottomWidth:1,
    flexDirection: 'row',
  },
  headerText:{
    fontSize:17,
    paddingLeft:20,  
  },
  btn:{
    width:50,
    height:30,
    borderRadius:10,
    backgroundColor:'#e2e2e2',
    justifyContent: 'center',
    position: 'absolute', 
    right: 5
  },
  btnText:{
    textAlign:'center',
    fontSize:15
  },  
});