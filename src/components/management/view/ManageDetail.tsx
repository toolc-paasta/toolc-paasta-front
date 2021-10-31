import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import Header from '../../elements/Header'
import { comment } from '../../elements/data';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
type Users = {
  id: number; 
  name: string; 
  contact:string;
}
type Props = {
  data:Users;
  setModalVisible:React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ManageDetail({data,setModalVisible}:Props) {

  return (
    <ScrollView>
      <LinearGradient style={styles.top} 
        colors={['#ffffff','#ffffff', '#e3e3e3']}
        start={{x: 1, y: 1}} end={{x: 1, y: 0}}
        locations={[0,0.5,0.5]}
      >
        <View style={styles.topIcon}>
          <Icon
            name={'person-outline'}
            size={25}
            color="black"
            style={styles.icon}
          />
        </View>
      </LinearGradient>
      <Icon
          name={'pencil-outline'}
          size={25}
          color="black"
          style={styles.input1_2}
      />
      <View style={[styles.box, styles.box1]}>
        <Text style={styles.input1}>{data.name}</Text>
      </View>
      <View style={[styles.box]}>
        <Text style={styles.input2}>{data.contact}</Text>
      </View>
      <View style={[styles.box]}>
        <Text style={styles.input2}>{data.contact}</Text>
      </View>
      <View style={[styles.box]}>
        <Text style={styles.input2}>{data.contact}</Text>
      </View>
      <View style={[styles.box]}>
        <Text style={styles.input2}>{data.contact}</Text>
      </View>
      <View style={[styles.box]}>
        <Text style={styles.input2}>{data.contact}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={()=>setModalVisible(false)}>
          <Text>확인</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  top:{
    alignItems:'center',
    justifyContent: 'center',
    height:150,
  },
  topIcon:{
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:50,
    borderWidth:1,
    width:80,
    height:80,
    backgroundColor:'#ffffff'
  },
  box: {
    paddingTop:10,
    paddingBottom:10,
    width: Dimensions.get('window').width-30,
    borderBottomWidth:1,
    borderBottomColor:'#bdbdbd',
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
    textAlign:'center'
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
    height:100,
    alignItems:'center',
    justifyContent: 'center', 
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