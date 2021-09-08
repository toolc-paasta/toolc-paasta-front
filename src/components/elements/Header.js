import React, { useState, useEffect } from "react";
import { Dimensions, Text, View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UploadNotice({header_title,setIsSubmit,setModalVisible,navigation}) {
 
  const [title,setTitle] = useState()
  const [content,setContent] = useState()

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

  return (
      <View style={styles.header}>
        <Icon 
          style={styles.headerBtn}
          name={'arrow-back-outline'}
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>{header_title}</Text>
        {setIsSubmit!=null && (
          <TouchableOpacity style={styles.btn} onPress={()=>onSubmit()}>
            <Text style={styles.btnText}>전송</Text>
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
    right: 35
  },
  btnText:{
    textAlign:'center',
    fontSize:15
  },  
});