import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { AuthStackScreenParamList } from "../../../screens/AuthScreen";
import Signin from "../view/Signin";
import PagerView from "react-native-pager-view";
import handleError, { checkLoginInfo } from "../../../lib/utils/authFunctions";
import { useDispatch } from "react-redux";
import { loading, unloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import { SERVER_ERROR } from "../../../lib/utils/strings";
import StepIndicator from "react-native-step-indicator";
import { useRef } from "react";
import SelectType from "../view/SelectType";
import NaviButtons from "../elements/naviButtons";

type Props = StackScreenProps<AuthStackScreenParamList, "Signin">;

export type signInInfoType = {
   id: string;
   password: string;
   passwordCheck: string;
};

const labels: string[][] = [
   ["기본정보", "선택", "아이등록", "완료"],
   ["기본정보", "선택", "완료"],
   ["기본정보", "선택", "인증", "완료"],
   ["기본정보", "선택"],
];
const customStyles = {
   stepStrokeFinishedColor: "#2196f3",
   stepIndicatorLabelFinishedColor: "#ffffff",
   separatorFinishedColor: "#2196f3",
   stepIndicatorFinishedColor: "#2196f3",

   stepStrokeWidth: 3,
   stepStrokeCurrentColor: "#2196f3",
   stepIndicatorCurrentColor: "#ffffff",
   stepIndicatorLabelCurrentColor: "#2196f3",
   currentStepLabelColor: "#2196f3",

   stepStrokeUnFinishedColor: "#aaaaaa",
   separatorUnFinishedColor: "#aaaaaa",
   stepIndicatorUnFinishedColor: "#ffffff",
   stepIndicatorLabelUnFinishedColor: "#aaaaaa",
   labelColor: "#999999",
};

function SigninContainer({ navigation }: Props) {
   const [userInfo, setUserInfo] = useState<signInInfoType>({
      password: "",
      passwordCheck: "",
      id: "",
   });
   const [errMsg, setErrMsg] = useState<signInInfoType>({
      id: "",
      password: "",
      passwordCheck: "",
   });
   const [userType, setUserType] = useState<number>(3);
   const [position, setPosition] = useState<number>(0);
   const dispatch = useDispatch();
   const pagerRef: any = useRef<typeof PagerView>(null);

   const onChange = (name: string, value: string): void => {
      setErrMsg((prev) => ({ ...prev, [name]: "" }));
      setUserInfo((prev) => ({ ...prev, [name]: value }));
   };

   const onPressLogin = async () => {
      if (!checkLoginInfo<signInInfoType>(userInfo, setErrMsg, false)) return;
      dispatch(loading());

      try {
         // const res = await SignUp(userInfo.id, userInfo.password);
         // dispatch(signin(res));
      } catch (err) {
         // 중복 아이디 처리
         if (err.message === "ID가 중복된 회원입니다.") {
            handleError<signInInfoType>("auth/id-already-in-use", setErrMsg);
         } else {
            dispatch(setSnackbar({ visible: true, snackbar: SERVER_ERROR }));
         }
         return;
      }
      dispatch(unloading());
   };
   const goNext = (): void => {
      pagerRef.current?.setPage(position + 1);
      setPosition((prev) => prev + 1);
   };
   const goPrev = (): void => {
      pagerRef.current?.setPage(position - 1);
      setPosition((prev) => prev - 1);
   };
   const onSelectType = (num: number): void => {
      setUserType(num);
   };

   return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
         <View style={{ flex: 1, paddingTop: 30, paddingBottom: 10 }}>
            <StepIndicator
               customStyles={customStyles}
               currentPosition={position}
               labels={labels[userType]}
               stepCount={labels[userType].length}
            />
         </View>
         <PagerView
            ref={pagerRef}
            style={{ flex: 5, justifyContent: "center" }}
            initialPage={0}
            scrollEnabled={false}>
            <View key="1" style={{ flex: 1 }}>
               <Signin
                  userInfo={userInfo}
                  errMsg={errMsg}
                  onChange={onChange}
               />
            </View>
            <View key="2" style={{ flex: 1 }}>
               <SelectType onSelectType={onSelectType} userType={userType} />
            </View>
            {userType !== 1 ? (
               userType !== 0 ? (
                  <View key="3">
                     <Text>원장</Text>
                  </View>
               ) : (
                  <View key="3">
                     <Text>학부모</Text>
                  </View>
               )
            ) : (
               <></>
            )}
            {userType !== 3 ? (
               <View key={`${labels[userType].length}`}>
                  <Text>완료</Text>
               </View>
            ) : (
               <></>
            )}
         </PagerView>
         <View style={{ flex: 1 }}>
            <NaviButtons
               position={position}
               goNext={goNext}
               goPrev={goPrev}
               last={position === labels[userType].length - 1}
            />
         </View>
      </View>
   );
}

export default SigninContainer;
