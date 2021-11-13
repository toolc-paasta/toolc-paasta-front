import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet,TouchableOpacity, TextInput,Button} from 'react-native';
import { colors } from "../../elements/theme";
import { findParent } from "../../../lib/api/forAdmin"
import { postParent } from "../../../lib/api/forAdmin"

type Props = {
  setModalVisible:React.Dispatch<React.SetStateAction<boolean>>;
  getListData:any;
  nameList:any;
};

export default function Modal({setModalVisible,getListData,nameList} :Props) {

  const [name,setName] = useState<any>()
  const [number,setNumber] = useState<any>()
  
  const findParents = async () =>{
    
    if(name != null && number != null){
      const res = await findParent(name,number);
      if(res == null)
        alert('가입되지않은 사용자입니다') 
      else if(nameList.find((x:any) => x==number) == undefined){
        postParent({id:res.childId})
      }
      else
        alert('이미 입력된 이름입니다') 
    }
    else
      alert('양식을 완성해주세요')
    
      
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxes}>
        <View style={[styles.box, styles.box1]}>
            <TextInput
            style={styles.input1}
            onChangeText={setName}
            placeholder="학부모 이름"          
            />
        </View>
        <View style={[styles.box, styles.box1]}>
            <TextInput
            style={styles.input1}
            onChangeText={setNumber}
            placeholder="전화번호 ( - 포함)"          
            />
        </View>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity onPress={() => [setModalVisible(false)]} style={styles.btn}>
            <Text>닫기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => [setModalVisible(false),findParents().then(getListData())]} style={styles.btn}>
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
});