import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet,TouchableOpacity, TextInput,Button} from 'react-native';
import { colors } from "../../elements/theme";
import { addClass } from "../../../lib/api/forAdmin"

type Props = {
  setModalVisible:React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({setModalVisible} :Props) {

  const [name,setName] = useState<any>()

  const insertClass = () => {
    if(name != null){
      addClass({name:name})
    }
    else
      alert('반 이름을 입력하세요')
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxes}>
        <View style={[styles.box, styles.box1]}>
            <TextInput
            style={styles.input1}
            onChangeText={setName}
            placeholder="반 이름"          
            />
        </View>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity onPress={() => [setModalVisible(false)]} style={styles.btn}>
            <Text>닫기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => [setModalVisible(false),insertClass()]} style={styles.btn}>
            <Text>추가</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
  },
  boxes:{
    height:'70%',
    justifyContent: 'center',
    alignItems: 'center',   
  },
  box: {
    paddingTop:40,
    paddingBottom:40,
    width: '100%',
  },
  box1:{
    
  },
  btns:{
    position:'absolute',
    bottom:10,
    flexDirection:'row'
  },
  btn:{
    flex:1,
    margin:15,
    width:100,
    height:30,
    borderRadius:5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.secondary
  },
  input1:{
    padding:10,
    borderWidth:1,
    borderColor:'#bdbdbd',
    borderRadius:10,
  },
  input2:{
    textAlignVertical:'top',
    padding:5,
  },
});