import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ShuttleScreen";
import Kinger from "../view/Kinger";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
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
 };

type Props = {
   navigation: BottomTabNavigation;
};

function KingerContainer({ navigation }: Props) {   

   const auth =  useSelector(({auth} :RootState) => auth)

   useEffect(() => {
   }, []);

   return (
      <View style={{flex: 1}}>
         <Header header_title={'내 유치원 등록'} navigation={navigation} setIsSubmit={null} IsInsert={null} setModalVisible={false}/>
         <ProgressSteps {...progressStepsStyle}>
            <ProgressStep label="유치원 찾기" nextBtnTextStyle={{color: colors.black}} nextBtnText='다음'>
               <View style={{ alignItems: 'center' }}>
                  <Text>11111111!</Text>
               </View>
            </ProgressStep>
            {auth.authority=='PARENT' && (
               <ProgressStep label="내 아이 찾기" nextBtnTextStyle={{color: colors.black}} previousBtnTextStyle={{color: colors.black}} nextBtnText='다음' previousBtnText='이전'>
                  <View style={{ alignItems: 'center' }}>
                     <Text>2222222!</Text>
                  </View>
               </ProgressStep>
            )}
            <ProgressStep label="가입하기" nextBtnTextStyle={{color: colors.black}} previousBtnTextStyle={{color: colors.black}} previousBtnText='이전' finishBtnText>
               <View style={{ alignItems: 'center' }}>
                  <Text>333333!</Text>
               </View>
            </ProgressStep>
         </ProgressSteps>
      </View>
   );
}

const styles = StyleSheet.create({
   
 });

export default KingerContainer;
