import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet} from 'react-native';
import { list_current } from '../../elements/data';

export default function MenuWithList() {

  const [date,SetDate] = useState(new Date());

  const makeTime = (t) => {
    const sec = Math.floor((date.getTime()-t.getTime())/1000)
    let temp = sec
    let count = 0
    const unit=['초','분','시간','일']
    while(temp>24){
      if(count<2 && temp>60)
        temp = parseInt(temp/60)
      else if(count>=2)
        temp = parseInt(temp/24)
      else
        return (temp+unit[count])
      count++
      
    }
    return (temp+unit[count])
    
  }

  return (
    <>
      <Text style={styles.articleMainText}>즐겨찾기 메뉴</Text>
      <View style={styles.listContainer}>
        {list_current.map((item, i) => (
          <View style={styles.list} key={i}>
            <Text style={styles.mainText}>{item.title}</Text>
            <Text style={styles.subText} numberOfLines={1}>{item.content}</Text>
            <Text style={styles.timeText}>{makeTime(item.time)} 전</Text>
          </View>  
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    listContainer:{
    justifyContent: 'center',
    padding:10
  },
  list:{
    alignItems: 'center',
    height:40,
    flexDirection: 'row',
    
  },
  mainText:{
    fontWeight:'bold',
    fontSize:13,
    paddingRight:10,
    textAlign:'left'
  },
  subText:{
      width:150,
  },
  timeText:{
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
});