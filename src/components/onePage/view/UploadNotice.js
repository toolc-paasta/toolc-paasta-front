import React, { useState, useEffect } from "react";
import { Dimensions, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UploadNotice() {
 
  const [title,setTitle] = useState()
  const [content,setContent] = useState()

  const onSubmit = () => {
    console.log(title,content)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon 
          style={styles.headerBtn}
          name={'arrow-back-outline'}
          size={35}
          color="black"
        />
        <Text style={styles.headerText}>가정통신문</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>onSubmit()}>
          <Text style={styles.btnText}>보내기</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.box, styles.box1]}>
        <TextInput
          style={styles.input1}
          onChangeText={setTitle}
          placeholder="제목"          
        />
      </View>
      <View style={[styles.box, styles.box2]}>
        <TextInput
          style={styles.input2}
          onChangeText={setContent}
          placeholder="내용을 입력하세요"     
          multiline
          numberOfLines={20}     
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  header:{
    height:40,
    alignItems:'center',
    marginTop:10,
    paddingBottom:10,
    width: Dimensions.get('window').width,
    borderBottomWidth:1,
    flexDirection: 'row',
  },
  headerText:{
    textAlign:'center',
    fontSize:17,
    paddingLeft:20
  },
  btn:{
    width:50,
    height:35,
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
  box: {
    paddingTop:10,
    paddingBottom:10,
    width: Dimensions.get('window').width,
  },
  box1:{
    borderBottomWidth:1,
    borderBottomColor:'#bdbdbd'
  },
  input1:{
    padding:5,
    
  },
  input2:{
    textAlignVertical:'top',
    padding:5,
  },
});