import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet,TouchableOpacity, TextInput } from 'react-native';
import { colors } from "../../elements/theme";
import { addClass } from "../../../lib/api/forAdmin"
import { useDispatch } from 'react-redux'
import { setSnackbar } from "../../../modules/snackbar";
import Button from '../../elements/Button'

type Props = {
  setModalVisible:React.Dispatch<React.SetStateAction<boolean>>;
  getListData:any;
  nameList:any;
};

export default function Modal({setModalVisible,getListData,nameList} :Props) {

  const dispatch = useDispatch()
  const [name,setName] = useState<any>()

  const insertClass = () => {
    if(name != null){
      if(nameList.find((x:any) => x==name) == undefined)
        addClass({name:name})
      else
        dispatch(setSnackbar({ visible: true, snackbar: '이미 추가된 반입니다.' }))
      
    }
    else
      dispatch(setSnackbar({ visible: true, snackbar: '반 이름을 입력해주세요.' }))
  }

  const insertMethod = async() =>{
    setModalVisible(false);
    insertClass()
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
        <Button
          title='취소'
          color='secondary'
          onPress={() => [setModalVisible(false)]}
          paddingHorizontal={50}
        />
        <Button
          title='추가'
          color='primary'
          margin
          onPress={() => insertMethod().then(getListData())}
          paddingHorizontal={50}
        />
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
    marginVertical: 8,
    width: '100%',
  },
  box1:{
    
  },
  btns:{
    position:'absolute',
    bottom:16,
    flexDirection:'row',
    justifyContent: 'center'
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
    borderColor: colors.secondary,
    borderRadius:10,
    fontFamily: 'Font'
  },
});