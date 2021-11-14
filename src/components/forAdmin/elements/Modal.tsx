import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { colors } from "../../elements/theme";
import { findParent } from "../../../lib/api/forAdmin"
import { postParent } from "../../../lib/api/forAdmin"
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
  const [number,setNumber] = useState<any>()
  
  const findParents = async () => {
    
    if(name != null && number != null){
      const res = await findParent(name,number);
      if(res == null)
        dispatch(setSnackbar({ visible: true, snackbar: '가입되지 않은 사용자입니다.' }))
      else if(nameList.find((x:any) => x==number) == undefined){
        postParent({id:res.childId})
      }
      else
        dispatch(setSnackbar({ visible: true, snackbar: '이미 추가된 어린이입니다.' }))
    }
    else
      dispatch(setSnackbar({ visible: true, snackbar: '모두 작성해주세요.' }))
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
          onPress={() => [setModalVisible(false),findParents().then(getListData())]}
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
  input1:{
    padding:10,
    borderWidth:1,
    borderColor: colors.secondary,
    borderRadius:10,
    fontFamily: 'Font'
  },
});