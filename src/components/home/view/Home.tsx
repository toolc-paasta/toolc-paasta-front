import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import MenuWithBtns from '../elements/MenuWithBtns';
import MenuWithList from '../elements/MenuWithList';
import { temp_data } from '../../elements/data';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabNavigation } from "../../../screens/SearchScreen";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAccessToken,
  directorLogin,
  getDirectorInfo,
  getParentInfo,
  getTeacherInfo,
  parentLogin,
  teacherLogin,
} from "../../../lib/api/auth";
const TYPE = temp_data.type

type Props = {
  navigation: BottomTabNavigation;
}

function Home({ navigation }: Props) {
  let res;
  const [isAuth,setIsAuth] = useState(temp_data.auth);

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
               onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>
        <View style={styles.articleTop}>
          <Text style={styles.articleTopText}>{temp_data.user_name} {TYPE=='pr' ? '학부모님' : (TYPE=='tc' ? '교사님' : '원장님' ) }, 안녕하세요</Text>          
        </View>
        <View style={styles.articleMain}>
          <MenuWithBtns user_type={TYPE} navigation={navigation}/>
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
        <TouchableOpacity style={styles.blackBtn} onPress={()=>console.log('click!')}>
          <Text style={[styles.blankText,styles.blankBtnText]}>유치원 인증하기</Text>
        </TouchableOpacity>
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
  blackBtn:{
    marginTop:10,
    borderRadius:10,
    backgroundColor:'#FFA500',
    width:150,
    height:60,
    justifyContent: 'center',
    
  },
  blankBtnText:{
    fontSize:18,
    textAlign:'center',
    color:'#fff',
    fontWeight:'bold'
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
    width:250,
    fontFamily:'Font',
  },
  articleMain:{
  },

});

export default Home;