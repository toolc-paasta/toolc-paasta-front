import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { loading, unloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import { Input, ListItem, Button, Icon } from 'react-native-elements';
import { BottomTabNavigation } from "../../../screens/SearchScreen";

type Props = {
  navigation: BottomTabNavigation;
}

type Kin = {
  name: string;
  address: string;
}

// REST 적용 전 실험용 유치원 목록
const dummy: Array<Kin> = [
  {
    name: '떡잎유치원',
    address: '서울시 노원구 떡잎마을'
  },
  {
    name: '떡잎유치원2',
    address: '서울시 노원구 떡잎마을'
  },
  {
    name: '떡잎유치원3',
    address: '서울시 노원구 떡잎마을'
  },
  {
    name: '떡잎유치원4',
    address: '서울시 노원구 떡잎마을'
  },
  {
    name: '떡잎유치원5',
    address: '서울시 노원구 떡잎마을'
  },
  {
    name: '떡잎유치원6',
    address: '서울시 노원구 떡잎마을'
  },
  {
    name: '떡잎유치원7',
    address: '서울시 노원구 떡잎마을'
  },
  {
    name: '떡잎유치원8',
    address: '서울시 노원구 떡잎마을'
  },
  {
    name: '떡잎유치원9',
    address: '서울시 노원구 떡잎마을'
  },
  {
    name: '떡잎유치원10',
    address: '서울시 노원구 떡잎마을'
  },
  
]

// REST 적용 전 실험용 비동기함수 (3초 후 로딩 완료)
const asyncFunc = () => {
  return new Promise(function(res, rej){
    setTimeout(() => {
        res(0)
    }, 3000)
  });
}

function Search({ navigation }: Props) {
  const dispatch = useDispatch();

  const [searchWord, setSearchWord] = useState('')
  const [searchedKins, setSearchedKins] = useState<Array<Kin>>([])
  const [errorMessage, setErrorMessage] = useState('')

  //loading
  const loadKin = async () => {
    dispatch(loading())
    const res = await asyncFunc()
    dispatch(unloading())
  }

  const search = async () => {
    if (searchWord.length < 2) {
      setErrorMessage('검색어를 2자 이상 입력하세요.')
      return
    }
    dispatch(loading())
    const res = await asyncFunc()
    dispatch(unloading())

    setSearchedKins(dummy)

    if (dummy.length === 0) {
      setErrorMessage('검색 결과가 없습니다.')
    } else {
      setErrorMessage('')
    }
  }

  const select = async () => {
    dispatch(setSnackbar({ visible: true, snackbar: '인증 요청을 보냈습니다.' }))
      
  }

  useEffect(() => {
    loadKin()
    return (() => {
      dispatch(setSnackbar({ visible: true, snackbar: '을 보냈습니다.' }))
     
      setSearchWord('')
      setSearchedKins([])
    })
  }, [])

   return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Button
            buttonStyle={styles.backButton}
            icon={<Icon name="arrow-back"/>}
            onPress={() => navigation.navigate("Home")}
          />
          <Input
            placeholder='유치원(어린이집)명을 입력하세요.'
            value={searchWord}
            onChangeText={value => setSearchWord(value)}
            onSubmitEditing={search}
            errorStyle={{color: 'red'}}
            errorMessage={errorMessage}
          />
        </View>
        <ScrollView style={styles.listContainer}>
          {
            searchedKins.length !== 0 && (
              searchedKins.map((kin, i) => (
                <ListItem key={i} bottomDivider onPress={select}>
                  <ListItem.Content>
                    <ListItem.Title>{kin.name}</ListItem.Title>
                    <ListItem.Subtitle>{kin.address}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))
            )
          }
        </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 8
  },
  searchBarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 'auto',
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderRadius: 100
  }
})

export default Search;
