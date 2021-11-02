import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ShuttleScreen";
import Kinger1 from "../view/Kinger1";
import Kinger2 from "../view/Kinger2";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { RootState } from "../../../modules";
import  {useSelector } from "react-redux";
import { colors } from "../../elements/theme";
import Header from '../../elements/Header'

const progressStepsStyle = {
   labelColor:colors.black,
   activeLabelColor:colors.black,
   completedLabelColor:colors.black,
   activeStepIconBorderColor:colors.primary,
   completedProgressBarColor:colors.primary,
   completedStepIconColor:colors.primary,
   activeStepNumColor:colors.primary,
   completedStepNumColor:colors.primary,
   disabledStepIconColor:colors.primary,
   progressBarColor:colors.primary,
   topOffset:30,
 };

type Props = {
   navigation: BottomTabNavigation;
};

function KingerContainer({ navigation }: Props) {   

   const auth =  useSelector(({auth} :RootState) => auth)

   useEffect(() => {
   }, []);

   return (
      <View style={{flex: 1,backgroundColor:'#ffffff'}}>
         <Header header_title={'내 유치원 등록'} navigation={navigation} setIsSubmit={null} IsInsert={null} setModalVisible={false}/>
         <ProgressSteps {...progressStepsStyle} >
            <ProgressStep label="유치원 찾기 1" nextBtnTextStyle={{color: colors.black}} nextBtnText='다음'>
               <View style={styles.box}>
                  <Kinger1/>
               </View>
            </ProgressStep>
            <ProgressStep scrollable={false} label="유치원 찾기 2" previousBtnTextStyle={{color: colors.black}} nextBtnTextStyle={{color: colors.black}} previousBtnText='이전' nextBtnText='다음'>
               <View style={styles.box}>
                  <Kinger2/>
               </View>
            </ProgressStep>
            {auth.authority=='PARENT' ? (
               <ProgressStep label="내 아이 찾기" previousBtnTextStyle={{color: colors.black}} nextBtnTextStyle={{color: colors.black}}  nextBtnText='다음' previousBtnText='이전'>
                  <View style={{ alignItems: 'center' }}>
                     <Text>2222222!</Text>
                  </View>
               </ProgressStep>
            ):(
               <ProgressStep label="확인" previousBtnTextStyle={{color: colors.black}} nextBtnTextStyle={{color: colors.black}}  nextBtnText='다음' previousBtnText='이전'>
                  <View style={{ alignItems: 'center' }}>
                     <Text>2222222!</Text>
                  </View>
               </ProgressStep>
            )}
            <ProgressStep label="가입하기" previousBtnTextStyle={{color: colors.black}} nextBtnTextStyle={{color: colors.black}}  previousBtnText='이전' finishBtnText='확인'>
               <View style={{ alignItems: 'center' }}>
                  <Text>1!</Text>
                  
                  
               </View>
            </ProgressStep>
         </ProgressSteps>
      </View>
   );
}

const styles = StyleSheet.create({
   box:{
      height:'90%',
      position:'relative',
   },
 });

export default KingerContainer;
