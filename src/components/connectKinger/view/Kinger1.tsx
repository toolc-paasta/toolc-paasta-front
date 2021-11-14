import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { loading, unloading } from "../../../modules/loading";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert 
} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from "../../elements/theme";
import { getCenter } from '../../../lib/api/connectKinger'

type Item = {
  name:string;
  contact:number;
}

type Props = {
  kingerName: string;
  setKingerName: React.Dispatch<React.SetStateAction<any>>;
  kingerClasses: any;
  setKingerClasses: React.Dispatch<React.SetStateAction<any>>;
};

export default function Kinger1({ kingerName, setKingerName, kingerClasses, setKingerClasses }:Props) {
  const [search, setSearch] = useState<any>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      dispatch(loading())
      try {
        const data = await getCenter()
        console.log(data)
        setMasterDataSource(data)
        setFilteredDataSource(data)
      } catch (e) {
        console.log(e.response.data);
      }
      dispatch(unloading())
    }
    getData()
  }, [])

  const searchFilterFunction = (text:string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item:Item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name : ''
        const textData = text
        return itemData.indexOf(textData) > -1
      });
      setFilteredDataSource(newData)
      setSearch(text)
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource)
      setSearch(text)
    }
  };

  const ItemView = ({ item }:any) => {
    return (
      <TouchableOpacity style={[
        styles.list, 
        kingerName === item.name ? styles.selectedList : styles.defaultList
      ]} onPress={() => setKinger(item)}>
        <Text style={[styles.itemStyle,styles.itemStyle1]}>
          {item.name}
        </Text>
        <Text style={[styles.itemStyle,styles.itemStyle2]}>
          {item.address}
        </Text>
      </TouchableOpacity>
    )
  }

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

  const setKinger = (item: any) => {
    setKingerName(item.name)
    setKingerClasses(item.classVOList)
  }

  return (
    <View style={styles.container}>
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
          placeholder="유치원/어린이집 명으로 검색"
          // placeholder={kingerClasses.toString()}
        />
      </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: 5,
    overflow:'hidden',
    height:'90%'
  },
  searchBox:{
    flexDirection: 'row',
    alignItems:'center',
    borderRadius:10,
    height:50,
    borderWidth: 1,
    borderColor:colors.primary,
    marginBottom:15,
    padding:10,
  },
  list:{
    flexDirection: 'row',
    alignItems:'center',
  },
  selectedList: {
    backgroundColor: '#fee9b0'
  },
  defaultList: {
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
    fontSize: 11,
  },
  iconBox:{
  },
  icon:{
  },
  textInputStyle: {
    paddingLeft:10,
  },
});