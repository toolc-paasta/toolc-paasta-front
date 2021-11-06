import React, { useState, useEffect } from "react";
import {
   Text,
   View,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
} from "react-native";

import Constants from "expo-constants";
import MenuWithBtns from "../elements/MenuWithBtns";
import MenuWithList from "../elements/MenuWithList";
import { temp_data } from "../../elements/data";
import Icon from "react-native-vector-icons/Ionicons";
import { BottomTabNavigation } from "../../../screens/SearchScreen";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import {
   logout
} from "../../../lib/api/auth";

const articleTopStyleConst = {
   parent: {
      height: 206,
      marginBottom: 100,
   },
   teacher: {
      height: 256,
      marginBottom: 150,
   },
};

type Props = {
   navigation: BottomTabNavigation;
   auth: any;
};

function Home({ navigation, auth }: Props) {
   let res;
   const [isAuth, setIsAuth] = useState(true);
   /*
   어드민 admin 1234
   선생 qwer1106 qwer1234$
   학부모 shkim1106 qwer1234%
   원장 asdf1106 qwer1106^
   원장이 회원가입(센터 자동등록) -> 관리자가 수락 -> 원장 반생성 -> 유치원/반 리스트 필요 -> 선생들 가입 -> 학부모들 가입

 */
   return (
      <View style={styles.container}>
         {isAuth ? (
            <ScrollView>
               <View
                  style={[
                     styles.articleTop,
                     {
                        height:
                           auth.authority === "PARENT"
                              ? articleTopStyleConst.parent.height
                              : articleTopStyleConst.teacher.height,
                        marginBottom:
                           auth.authority === "PARENT"
                              ? articleTopStyleConst.parent.marginBottom
                              : articleTopStyleConst.teacher.marginBottom,
                     },
                  ]}>
                  <View style={styles.header}>
                     <Text style={styles.headerText}>{temp_data.kg_name}</Text>
                     <View style={styles.headerIcon}>
                        <Icon
                           name={"notifications-outline"}
                           size={35}
                           color="white"
                           style={styles.icon}
                           onPress={() => console.log('hello')}
                        />
                        <Icon
                           name={"log-out-outline"}
                           size={35}
                           color="white"
                           style={styles.icon}
                           onPress={() => [logout(),navigation.navigate("Auth")]}
                        />
                     </View>
                  </View>
                  <Text style={styles.articleTopText}>
                     {auth.name}{" "}
                     {auth.authority == "TEACHER"
                        ? "선생님"
                        : auth.authority == "DIRECTOR"
                        ? "원장님"
                        : "학부모님"}{" "}
                     환영합니다.
                  </Text>
               </View>

               <View style={styles.menuWithBtns}>
                  <MenuWithBtns
                     user_type={auth.authority}
                     navigation={navigation}
                  />
               </View>
               <View style={styles.menuWithList}>
                  <MenuWithList />
               </View>
            </ScrollView>
         ) : (
            <View style={styles.blankContainer}>
               <Text style={styles.blankText}>등록된 유치원이 없습니다. </Text>
               <Text style={styles.blankText}>먼저 등록을 해야 서비스를 </Text>
               <Text style={styles.blankText}>이용할 수 있습니다. </Text>
               <TouchableOpacity
                  style={styles.blackBtn}
                  onPress={() => navigation.navigate("Kinger")}>
                  <Text style={[styles.blankText, styles.blankBtnText]}>
                     유치원 인증하기
                  </Text>
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
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    width: '100%'
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
    backgroundColor:'#ffd257',
    width:150,
    paddingTop:5,
    height:50,
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
    marginBottom: 24,
  },
  headerText:{
    fontSize:28,
    fontFamily:'Font',
    color: 'white'
  },
  headerIcon:{
    position:'absolute',
    right:10,
    flexDirection:'row'
  },
  headerIconText:{
    color:'red',
    
  },
  icon:{
   fontSize:30,
   paddingLeft:10,
  },
  articleTop:{
    backgroundColor: '#FFD257',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  articleTopText:{
    fontSize:20,
    width:250,
    fontFamily:'Font',
    color: 'white',
  },
  menuWithBtns:{
    width: '80%',
    position: 'absolute',
    top: 144,
    marginHorizontal: '10%',
    paddingTop: 8,
    backgroundColor: '#FDFCF8',
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,

  },
  menuWithList:{
    paddingHorizontal: 24
  },
  

});

export default Home;
