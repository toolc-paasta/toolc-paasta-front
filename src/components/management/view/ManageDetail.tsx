import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../elements/Button'
import { colors } from "../../elements/theme";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";

type Users = {
  id: number; 
  name:string;
  connectionNumber: string; 
  childName:string;
  childBirthday:string;
  className:string;
}
type Props = {
  data:Users;
  setModalVisible:React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ManageDetail({data,setModalVisible}:Props) {

  const auth =  useSelector(({auth} :RootState) => auth)

  useEffect(() => {
    console.log(data)
 }, []);
  return (
    <ScrollView>
      <LinearGradient style={styles.top} 
        colors={['#ffffff','#ffffff', colors.primary]}
        start={{x: 1, y: 1}} end={{x: 1, y: 0}}
        locations={[0,0.5,0.5]}
      >
        <View style={styles.topIcon}>
          <Icon
            name={'person-outline'}
            size={35}
            color="black"
            style={styles.icon}
          />
        </View>
      </LinearGradient>
      <View style={[styles.box, styles.box1]}>
        <Text style={styles.input1}>{data.name} 학부모님</Text>
      </View>
      {auth.authority=='DIRECTOR' && (
        <View style={[styles.box]}>
          <Text style={styles.input2}>소속 반 : {data.className} 반</Text>
        </View>
      )}
      
      <View style={[styles.box]}>
        <Text style={styles.input2}>연락처 : {data.connectionNumber}</Text>
      </View>
      <View style={[styles.box]}>
        <Text style={styles.input2}>아이 이름 : {data.childName}</Text>
      </View>
      <View style={[styles.box]}>
        <Text style={styles.input2}>아이 생일 : {data.childBirthday}</Text>
      </View>

      <View style={styles.btnContainer}>
      <Button 
        title='확인'
        color='primary'
        paddingHorizontal={48}
        onPress={() => setModalVisible(false)}
      />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  top:{
    alignItems:'center',
    justifyContent: 'center',
    height:150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  topIcon:{
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:50,
    borderWidth:2,
    borderColor: colors.primary,
    width:80,
    height:80,
    backgroundColor:'#ffffff'
  },
  box: {
    paddingTop:10,
    paddingBottom:10,
    width: Dimensions.get('window').width-30,
    borderBottomWidth:1,
    borderBottomColor: colors.secondary,
    paddingLeft:15,
    paddingRight:15,
  },
  box1:{
    alignItems:'center',
    justifyContent: 'center',
  },
  input1:{
    padding:5,
    fontSize:30,
    textAlign:'center',
    marginBottom: 64
  },
  input1_2:{
    position:'absolute',
    right:15,
    top:15,
  },
  input2:{
    textAlignVertical:'top',
    padding:5,
  },
  btnContainer:{
    height:200,
    alignItems:'center',
    justifyContent: 'flex-end', 
  },
  btn:{
    width:100,
    height:50,
    alignItems:'center',
    justifyContent: 'center', 
    borderRadius:30,
    borderWidth:1   
  },
  icon:{}
});