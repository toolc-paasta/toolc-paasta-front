import React, { useState, useEffect } from "react";
import { Dimensions, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../elements/Header'
export default function UploadNotice() {
 
  const [title,setTitle] = useState()
  const [content,setContent] = useState()
  const [isSubmit,setIsSubmit] = useState(false)

  useEffect(() => {
    if(isSubmit){
      console.log('제출')
      console.log(title,content)
      setIsSubmit(false)
    }
  }, [isSubmit]);

  return (
    <View style={styles.container}>
      <Header header_title={'가정통신문 보내기'} setIsSubmit={setIsSubmit}/>
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