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
import { BottomTabNavigation } from "../../../screens/ContactScreen";

type Props = {
  navigation:BottomTabNavigation;
};


export default function Shuttle({navigation}:Props) {


 
  return (
    <View style={styles.container}>
        <Header header_title={'빵셔틀'} navigation={navigation} setIsSubmit={null} IsInsert={null} setModalVisible={false}/>
      <Text>asdf</Text>
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
});

