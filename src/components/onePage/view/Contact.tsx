import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import Header from '../../elements/Header'
import { users } from '../../elements/data';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabNavigation } from "../../../screens/ContactScreen";

type Props = {
  navigation:BottomTabNavigation;
};

type Item = {
  name:string;
  contact:number;
}

export default function Contact({navigation}:Props) {
  const [search, setSearch] = useState<any>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  useEffect(() => {
    
    setFilteredDataSource(users);
    setMasterDataSource(users);
      
  }, []);

  const searchFilterFunction = (text:string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item:Item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name : ''
        const textData = text
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }:any) => {
    return (
      <TouchableOpacity style={styles.list} onPress={() => getItem(item)}>
        <View style={[styles.itemStyle,styles.iconBox]}>
          <Icon
            name={'person-circle-outline'}
            size={35}
            color="black"
            style={styles.icon}
          />
        </View>
        <Text style={[styles.itemStyle,styles.itemStyle1]}>
          {item.name}
        </Text>
        <Text style={[styles.itemStyle,styles.itemStyle2]}>
          {item.contact.substring(0,3)+'-'+item.contact.substring(3,7)+'-'+item.contact.substring(7,11)}
        </Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item:Item) => {
    
    alert('name : ' + item.name + ' / phone : ' + item.contact);
  };

  return (
    <View style={styles.container}>
      <Header header_title={'전화번호부'} navigation={navigation} setIsSubmit={null} IsInsert={null} setModalVisible={false}/>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <View style={styles.searchBox}>
            <Icon
              name={'search-outline'}
              size={35}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
              placeholder="이름으로 검색"
            />
          </View>
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
          
        </View>
      </SafeAreaView>
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
  searchBox:{
    flexDirection: 'row',
    alignItems:'center',
    borderRadius:10,
    height:50,
    borderWidth: 1,
    borderColor:'#c8c8c8',
    marginTop:15,
    marginBottom:15,
    padding:10,
  },
  list:{
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  itemStyle: {
    padding: 10,
    height:70,
    textAlignVertical:'center',
    justifyContent: 'center',
    fontSize:15,
  },
  itemStyle1: {
    paddingLeft:5
  },
  itemStyle2: {
    position:'absolute',
    right:20,
  },
  iconBox:{
  },
  icon:{
  },
  textInputStyle: {
    paddingLeft:10,
  },
});

