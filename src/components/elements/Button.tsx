import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

type Props = {
  title: string; // 버튼 내용
  color?: string; // 버튼 색 (primary, secondary, clear)
  wide?: boolean; // wide 사이즈
  margin?: boolean; // true면 wide일 시 top, 아닐 시 left 마진 생성
  onPress: () => void;
}

const colors = {
  primary: '#ffd257',
  secondary: '#fee9b0',
  black: '#212121',
  background: '#fdfcf8',
  error: '#f82d48',
  clear: 'transparent'
}

const StyledButton = ({
  title,
  color,
  wide,
  margin,
  onPress,
}: Props) => {

  const styles = StyleSheet.create({
    button: {
      backgroundColor: color ? colors[color] : colors.secondary,
      borderRadius: 16,
      width: wide ? '100%' : '30%',
      paddingVertical: 12,
      marginTop: (margin && wide) ? 16 : 0,
      marginLeft: (margin && !wide) ? 16 : 0
    },
    title: {
      color: color === 'clear' ? colors.black : colors.background,
      fontSize: 18
    }
  });

  return (
    <Button
      title={title}
      buttonStyle={styles.button}
      titleStyle={styles.title}
      onPress={onPress}
    />
  )

  
}


export default StyledButton