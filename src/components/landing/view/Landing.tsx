import React, { useState, useEffect, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import { AuthStackScreenParamList } from "../../../screens/AuthScreen";
import StyledButton from "../../elements/Button";
import PagerView from "react-native-pager-view";
import LottieView from "lottie-react-native";
import Indicator from "../elements/Indicator";

type Props = {
   goTo: (v: keyof AuthStackScreenParamList) => void;
};

function Landing({ goTo }: Props) {
   const [lottie, setLottie] = useState(new Array(3).fill(""));

   const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
   const positionAnimatedValue = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      const urls = [
         "https://assets5.lottiefiles.com/packages/lf20_uwh9uhdt.json",
         "https://assets4.lottiefiles.com/private_files/lf30_u4rzoljr.json",
         "https://assets7.lottiefiles.com/datafiles/MaKSoctsyXXTCDOpDktJYEcS3ws5SI6CLDo7iyMc/ex-splash.json",
      ];

      let arr = new Array(urls.length);
      Promise.all(
         urls.map(async (url, idx) => {
            await fetch(url)
               .then((response) => response.json())
               .then((data) => (arr[idx] = data));
         })
      ).then(() => {
         setLottie(arr);
      });
   }, []);

   const renderItem = (source: string, idx: number) => {
      return (
         <View key={idx} style={styles.pageView} collapsable={false}>
            {source ? (
               <View style={styles.lottieContainer}>
                  <LottieView source={source} autoPlay loop />
               </View>
            ) : (
               <></>
            )}
         </View>
      );
   };

   return (
      <View style={styles.container}>
         <View style={styles.imageListConatiner}>
            <PagerView
               style={{ flex: 1 }}
               initialPage={0}
               onPageScroll={(e) => {
                  scrollOffsetAnimatedValue.setValue(e.nativeEvent.offset);
                  positionAnimatedValue.setValue(e.nativeEvent.position);
               }}>
               {useMemo(
                  () => lottie.map((item, idx) => renderItem(item, idx)),
                  [lottie]
               )}
            </PagerView>
            <Indicator
               scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
               positionAnimatedValue={positionAnimatedValue}
               length={lottie.length}
            />
         </View>
         <View style={styles.buttonContainer}>
            <StyledButton
               title="로그인"
               color="primary"
               wide
               onPress={() => goTo("Login")}
            />
            <StyledButton
               title="회원가입"
               color="secondary"
               wide
               margin
               onPress={() => goTo("Signin")}
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   pageView: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
   },
   lottieContainer: {
      width: "80%",
      height: "80%",
   },
   imageListConatiner: {
      flex: 7,
   },
   buttonContainer: {
      flex: 3,
      paddingLeft: "10%",
      paddingRight: "10%",
   },
});

export default Landing;
