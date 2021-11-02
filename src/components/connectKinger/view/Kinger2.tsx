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
import { users } from '../../elements/data';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  
};

type Item = {
  name:string;
  contact:number;
}

export default function Kinger2() {
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
        <Text style={[styles.itemStyle,styles.itemStyle1]}>
          {item.name}
        </Text>
        <Text style={[styles.itemStyle,styles.itemStyle2]}>
          {item.adrr}
        </Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.6,
          width: '100%',
          backgroundColor: '#ffd257',
        }}
      />
    );
  };

  const getItem = (item:Item) => {
    
    alert('name : ' + item.name + ' / phone : ' + item.contact);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <View style={styles.searchBox}>
            <Icon
              name={'search-outline'}
              size={30}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
              placeholder="유치원 명으로 검색"
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
    padding: 5,
  },
  searchBox:{
    flexDirection: 'row',
    alignItems:'center',
    borderRadius:10,
    height:50,
    borderWidth: 1,
    borderColor:'#ffd257',
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
    padding: 5,
    height:60,
    textAlignVertical:'center',
    justifyContent: 'center',
    fontSize:15,
  },
  itemStyle1: {
    position:'relative',
    left:5,
  },
  itemStyle2: {
    position:'absolute',
    right:5,
  },
  iconBox:{
  },
  icon:{
  },
  textInputStyle: {
    paddingLeft:10,
  },
});