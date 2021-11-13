import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import { list_parent } from '../../elements/data';
import { list_notice } from '../../elements/data';
import Header from '../../elements/Header'
import ListDetail from './ListDetail'
import { BottomTabNavigation } from "../../../screens/NoticeBoardScreen";

type Props = {
  headerTitle:string;
  navigation:BottomTabNavigation;
  auth:any;
};

export default function List({navigation, headerTitle,auth}:Props) {

  const [date,setDate] = useState<any>(new Date());
  const [data,setData] = useState<any>();
  const [isSubmit,setIsSubmit] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const DATA  = headerTitle==='공지 모아보기' ? list_notice : list_parent

  const makeTime = (t: Date) => {
    const sec = Math.floor((date.getTime()-t.getTime())/1000)
    let temp = sec
    let count = 0
    const unit = ['초','분','시간','일']
    while(temp>24){
      if(count<2 && temp>60)
        temp = Math.floor(temp/60)
      else if(count>=2)
        temp = Math.floor(temp/24)
      else
        return(temp+unit[count]+' 전')
      count++
    }
    return(temp+unit[count]+' 전')
    
  }

  return (
    <View style={styles.container}>
      <Header header_title={headerTitle} navigation={navigation} IsInsert={auth.authority == 'PARENT' ? null : true} setIsSubmit={null} setModalVisible={false}/>
      <ScrollView style={styles.listContainer}>
        {DATA.map((item, i) => (
          <TouchableOpacity style={styles.list} key={i} onPress={() => [setModalVisible(true),setData(item)]}>
            <View>
              <Text style={styles.mainText}>{item.title}</Text>
              <Text style={styles.subText} numberOfLines={1}>{item.content}</Text>
            </View>
            <Text style={styles.numText}>{makeTime(item.time)}</Text>
          </TouchableOpacity>  
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
      }}>
        <View style={styles.modalView}>
          <View>
            <ListDetail data={data} date={date} setModalVisible={setModalVisible} navigation={navigation} header_title={headerTitle}/>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  articleMainText:{
    fontSize:20,
    paddingBottom:5,
    fontFamily:'Font'
  },
  modalView: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:'#ffffff'
  },
});