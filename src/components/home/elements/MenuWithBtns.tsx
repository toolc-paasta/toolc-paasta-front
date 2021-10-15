import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet,TouchableOpacity,Dimensions } from 'react-native';
import { btns_for_pr } from '../../elements/data';
import { btns_for_ad } from '../../elements/data';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabNavigation } from "../../../screens/SearchScreen";

type Btn = {
  id:number;
  title:string;
  img:string;
  onclick:string;
}

type Props = {
  user_type:string;
  navigation:BottomTabNavigation;

};

const btnPr:Btn[] = btns_for_pr;
const btnAd:Btn[] = btns_for_ad;

export default function MenuWithBtns({user_type,navigation}:Props) {

  const [authType,setAuthType] = useState<any>()
  
  useEffect(() => {
    user_type==='pr' ? setAuthType(btnPr) : setAuthType(btnAd)
  }, []);

  return (
    <>
      <Text style={styles.articleMainText}>바로가기 메뉴</Text>
      <View style={styles.row}>
        {authType?.map((item :any, i :any) => (
          <View style={styles.btnContainer} key={i}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(item.onclick)}>
                <Icon
                  name={item.img}
                  size={35}
                  color="black"
                  style={styles.icon}
                />
            </TouchableOpacity>
            <View style={styles.textView}>
              <Text style={styles.text}>{item.title.length>6 ? (item.title.split(' ')[0]+'\n'+item.title.split(' ')[1]) : (item.title)}</Text>
            </View>
          </View>  
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer:{
    width:Dimensions.get('window').width/3-10,    
    alignItems: 'center',
  },
  btn:{
    width:60,
    height:60,
    borderRadius:10,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    marginBottom:0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  icon:{
    fontSize:25
  },
  textView:{
    paddingTop:15,
    marginBottom:10,
    height:60
  },
  text:{
      textAlign:'center'
  },
  articleMainText:{
    fontSize:20,
    paddingBottom:5,
    fontFamily:'Font'
  },
});