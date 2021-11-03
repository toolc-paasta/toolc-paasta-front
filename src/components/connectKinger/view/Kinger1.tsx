import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import { area0,area1 } from '../../elements/data';
import RNPickerSelect from 'react-native-picker-select';
import { colors } from "../../elements/theme";

type Props = {
  setArea1:React.Dispatch<React.SetStateAction<any>>;
  setArea2:React.Dispatch<React.SetStateAction<any>>;
};

export default function Kinger1({setArea1,setArea2} :Props) {
  const [area_big,setArea_big] = useState<any>('');  
  const [area_small,setArea_small] = useState<any>('');  

  const placeholder1 = {
    label: '시/도 선택',
  };
  const placeholder2 = {
    label: '시/군/구 선택',
  };
  const disabled = {
    label: '시/도부터 선택하세요',
  };
  
  const setData1 = (v:string,i:number) => {
    setArea_big([v,i])
    setArea1(v)
  }

  useEffect(() => {
  }, []);

  return (
    
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={
          (value,key) => setData1(value,key)
        }
        placeholder={placeholder1}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
        items={[...area0]}
      />
      
      <RNPickerSelect
        onValueChange={
          (value) => setArea2(value)
        }
        placeholder={placeholder2}
        useNativeAndroidPickerStyle={false}
        style={area_big != '' ? pickerSelectStyles : pickerSelectStyles2}
        items={[...area1.filter(area1 => area1.key==area_big[1])]} 
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 15,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor:'#ffffff',
    padding:10,
    borderRadius: 8,
    color: '#000000',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop:40,
    marginBottom:40,
  },
  inputAndroid: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor:'#ffffff',
    padding:10,
    borderRadius: 8,
    color: '#000000',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop:40,
    marginBottom:40,
  },
});
const pickerSelectStyles2 = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#bdbdbd',
    backgroundColor:'#ffffff',
    padding:10,
    borderRadius: 8,
    color: '#000000',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop:40,
    marginBottom:40,
  },
  inputAndroid: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#bdbdbd',
    backgroundColor:'#ffffff',
    padding:10,
    borderRadius: 8,
    color: '#000000',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop:40,
    marginBottom:40,
  },
});