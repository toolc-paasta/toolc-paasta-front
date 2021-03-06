import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import Header from '../../elements/Header'
import { users } from '../../elements/data';
import ManageDetail from './ManageDetail'
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabNavigation } from "../../../screens/ManagementScreen";
import { colors } from '../../elements/theme'
import { color } from 'react-native-elements/dist/helpers';

type Props = {
  navigation:BottomTabNavigation;
  setFilteredDataSource:React.Dispatch<React.SetStateAction<any>>;
  filteredDataSource:any;
  masterDataSource:any;
};

type Item = {
  name:string;
  contact:number;
}

export default function Manage({navigation,setFilteredDataSource,filteredDataSource,masterDataSource}:Props) {
  const [search, setSearch] = useState('');
  
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [data,setData] = useState<any>();

  useEffect(() => {
    
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

  const ItemView = ({item}:any) => {
    return (
      <TouchableOpacity style={styles.list} onPress={() => getItem(item)}>
        <View style={[styles.itemStyle,styles.iconBox]}>
          <Icon
            name={'person-outline'}
            size={30}
            color="black"
            style={styles.icon}
          />
        </View>
        <Text style={[styles.itemStyle,styles.itemStyle1]}>
          {item.name} ????????????
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
          backgroundColor: colors.secondary,
        }}
      />
    );
  };

  const getItem = (item:Item) => {
    setData(item)
    setModalVisible(true)
  };


  return (
    <View style={styles.container}>
      <Header header_title={'????????????'} navigation={navigation} setIsSubmit={null} IsInsert={null} setModalVisible={false}/>
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
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
              placeholder="???????????? ??????"
            />
          </View>
          <FlatList
            data={filteredDataSource}
            keyExtractor={(list, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <View>
              <ManageDetail data={data}  setModalVisible={setModalVisible}/>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  searchBox:{
    flexDirection: 'row',
    alignItems:'center',
    borderRadius:10,
    height:50,
    borderWidth: 1,
    borderColor: colors.secondary,
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
  textInputStyle: {
    paddingLeft:10,
    fontFamily: 'Font'
  },
  iconBox:{
  },
  icon:{
  },
  modalView: {
    height: Dimensions.get('window').height/10*9,
    width: Dimensions.get('window').width/10*9,
    borderRadius: 16,
    backgroundColor:'#ffffff',
    zIndex:2,
    marginLeft:Dimensions.get('window').width/20,
    marginTop:Dimensions.get('window').width/20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
