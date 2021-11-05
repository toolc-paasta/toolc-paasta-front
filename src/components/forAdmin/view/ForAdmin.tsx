import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import Header from '../../elements/Header'
import { BottomTabNavigation } from "../../../screens/ForAdminScreen";
import { classList,childList } from '../../elements/data';
import { FAB } from "react-native-elements";
import ModalView from '../elements/Modal'
type Props = {
  navigation:BottomTabNavigation;
  auth:any;
};


export default function ForAdmin({navigation,auth}:Props) {

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const DATA = auth.authority == 'TEACHER' ? childList : classList

  return (
    <View style={[styles.container,modalVisible==true?{backgroundColor:'#bdbdbd'}:{backgroundColor:'#fff'}]}>
        <Header header_title={'반/학생 추가'} navigation={navigation} setIsSubmit={null} IsInsert={null} setModalVisible={false}/>
        <ScrollView style={styles.listContainer}>
        {DATA.map((item, i) => (
          <TouchableOpacity style={styles.list} key={i} onPress={() => []}>
            <View>
              <Text style={styles.subText} numberOfLines={1}>{item}</Text>
            </View>
          </TouchableOpacity>  
        ))}
      </ScrollView>
      <FAB
        visible={true}
        raised
        icon={{
            name: "plus",
            type: "font-awesome",
        }}
        buttonStyle={styles.fabButton}
        onPress={() => setModalVisible(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
      }}>
        <View style={styles.modalView}>
            <ModalView setModalVisible={setModalVisible}/>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: 15,
  },
  listContainer:{
    
  },
  list:{
    alignItems: 'center',
    height:70,
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor:'#bdbdbd'
  },
  mainText:{
    fontWeight:'bold',
    fontSize:15,
    paddingBottom:10,
    textAlign:'left',
  },
  subText:{
    width:250,
    fontSize:13,
  },
  numText:{
    position:'absolute',
    right:5,
    fontSize:12,
    textAlign:'right',
    paddingTop:1,
    width:50,
    height:20
  },
  fabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
 },
 modalView: {
  height: Dimensions.get('window').height/10*5,
  width: Dimensions.get('window').width/10*8,
  position:'relative',
  left:Dimensions.get('window').width/2-Dimensions.get('window').width/10*4,
  top:Dimensions.get('window').height/2-Dimensions.get('window').height/10*2.5,
  paddingLeft:15,
  paddingRight:15,
  backgroundColor:'#ffffff',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
});

