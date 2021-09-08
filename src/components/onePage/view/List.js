import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import { list1 } from '../../elements/data';
import Header from '../../elements/Header'
import ListDetail from './ListDetail'
export default function List({navigation}) {

  const [date,setDate] = useState(new Date());
  const [data,setData] = useState();
  const [isSubmit,setIsSubmit] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  const makeTime = (t) => {
    const sec = Math.floor((date.getTime()-t.getTime())/1000)
    let temp = sec
    let count = 0
    const unit = ['초','분','시간','일']
    while(temp>24){
      if(count<2 && temp>60)
        temp = parseInt(temp/60)
      else if(count>=2)
        temp = parseInt(temp/24)
      else
        return(temp+unit[count]+' 전')
      count++
    }
    return(temp+unit[count]+' 전')
    
  }

  return (
    <View style={styles.container}>
      <Header header_title={'학부모 게시판'} navigation={navigation}/>
      <ScrollView style={styles.listContainer}>
        {list1.map((item, i) => (
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
            <ListDetail data={data} date={date} setModalVisible={setModalVisible} navigation={navigation}/>
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