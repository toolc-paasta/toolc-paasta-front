import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View } from "react-native";
import { BottomTabNavigation } from "../../../screens/ShuttleScreen";
import Kinger1 from "../view/Kinger1";
import Kinger2 from "../view/Kinger2";
import Kinger3 from "../view/Kinger3";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { RootState } from "../../../modules";
import  {useSelector } from "react-redux";
import { colors } from "../../elements/theme";
import Header from '../../elements/Header'
import { setSnackbar } from '../../../modules/snackbar';

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
   labelFontFamily: 'Font'
 };

const progressStepStyle = {
   previousBtnTextStyle:{color: colors.black},
   nextBtnTextStyle:{color: colors.black},
   previousBtnText:'이전',
   nextBtnText:'다음',
   scrollable:false,
   nextBtnStyle:{
      position:'absolute',
      bottom:30,
      right:0,

   },
   previousBtnStyle:{
      position:'absolute',
      bottom:30,
      left:0,
   },
};


type Props = {
   navigation: BottomTabNavigation;
};

function KingerContainer({ navigation }: Props) {   
   const dispatch = useDispatch()
   const auth =  useSelector(({auth} :RootState) => auth)

   const [kingerName,setKingerName] = useState<any>('');
   const [kingerClasses, setKingerClasses] = useState<any>([])
   const [kingerClass, setKingerClass] = useState<any>('')

   return (
      <View style={{flex: 1,backgroundColor:'#ffffff'}}>
         <Header header_title={'유치원/어린이집 등록'} navigation={navigation} setIsSubmit={null} IsInsert={null} setModalVisible={false}/>
         <ProgressSteps {...progressStepsStyle}>
            <ProgressStep label="유치원/어린이집 선택" {...progressStepStyle} nextBtnDisabled={!kingerName.length}>
               <View style={styles.box} >
                  <Kinger1 kingerName={kingerName} setKingerName={setKingerName} kingerClasses={kingerClasses} setKingerClasses={setKingerClasses}/>
               </View>
            </ProgressStep>
            <ProgressStep label="반 등록" {...progressStepStyle} nextBtnDisabled={!kingerClass.length}>
               <View style={styles.box} >
                  <Kinger2 kingerClasses={kingerClasses} kingerClass={kingerClass} setKingerClass={setKingerClass} />
               </View>
            </ProgressStep>
            <ProgressStep label="가입하기"{...progressStepStyle} nextBtnStyle={{display:'none'}}>
               <View style={styles.box}>
                  <Kinger3 kingerName={kingerName} kingerClass={kingerClass} auth={auth} navigation={navigation} />
               </View>
            </ProgressStep>
         </ProgressSteps>
      </View>
   );
}

const styles = StyleSheet.create({
   box:{
      height:'95%',
      position:'relative',
      justifyContent: 'center',
      
   },
 });

export default KingerContainer;
