import React from 'react'
import { StyleSheet } from 'react-native'
import { Input, Icon } from 'react-native-elements'

type Props = {
  placeholder?: string;
  icon?: any; //leftIcon name만 받음
  secureTextEntry?: boolean;
  value?: any;
  onChangeText?: any;
  errorMessage?: string;
}

const colors = {
  primary: '#ffd257',
  secondary: '#fee9b0',
  black: '#2c2c2c',
  background: '#fdfcf8',
  error: '#f82d48',
  clear: 'transparent'
}

const StyledButton = ({
  placeholder,
  icon,
  secureTextEntry,
  value,
  onChangeText,
  errorMessage,
}: Props) => {

  const styles = StyleSheet.create({
    inputStyle: {
      fontFamily: 'Font'
    }
  });

  return (
    <Input
      placeholder={placeholder}
      leftIcon={<Icon name={icon} size={28} color='#ffd257' />}
      secureTextEntry={secureTextEntry}
      value={value}
      inputStyle={styles.inputStyle}
      onChangeText={onChangeText}
      errorMessage={errorMessage}
    />
  )
}


export default StyledButton