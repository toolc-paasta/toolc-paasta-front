import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import MenuWithBtns from '../elements/MenuWithBtns.js';
import MenuWithList from '../elements/MenuWithList.js';
import { temp_data } from '../elements/data';
import Icon from 'react-native-vector-icons/Ionicons';

const AUTH = temp_data.auth

export default function Home() {
  
  const [isAuth,setIsAuth] = useState(true);

  return (
    <View style={styles.container}>
    {isAuth ? (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>{temp_data.kg_name}</Text>
          <View style={styles.headerIcon}>
            <Icon
               name={'person-outline'}
               size={35}
               color="black"
               style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.articleTop}>
          <Text style={styles.articleTopText}>{temp_data.user_name} {AUTH=='pr' ? '학부모님' : (AUTH=='tc' ? '교사님' : '원장님' ) }, 안녕하세요</Text>          
        </View>
        <View style={styles.articleMain}>
          <MenuWithBtns/>
        </View>
        <View style={styles.articleMain}>
          <MenuWithList/>
        </View>

      </ScrollView>
    ) : (
      <View style={styles.blankContainer}>
        <Text style={styles.blankText}>등록된 유치원이 없습니다. </Text>
        <Text style={styles.blankText}>먼저 등록을 해야 서비스를 </Text>
        <Text style={styles.blankText}>이용할 수 있습니다. </Text>
      </View>
    )}
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
  blankContainer:{
    justifyContent: 'center',
    alignItems:'center'
  },
  blankText:{
    fontSize:25,
    paddingBottom:10
  },
  header:{
    height:50,
    alignItems:'center',
    flexDirection: 'row',
    borderBottomWidth:1,
  },
  headerText:{
    fontSize:17,
    fontFamily:'Font'
  },
  headerIcon:{
    position:'absolute',
    right:10
  },
  icon:{
   fontSize:25
  },
  articleTop:{
    height:100,
    justifyContent: 'center',
  },
  articleTopText:{
    fontSize:20,
    width:230,
    fontFamily:'Font',
  },
  articleMain:{
  },

});
