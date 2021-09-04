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
import {
   areaInfoType,
   childInfoType,
   errType,
   kinderListType,
   kinderType,
   signInInfoType,
} from "../types";
import InputChild from "../view/InputChild";
import { useCallback } from "react";
import FindKindergarden from "../view/FindKindergarden";
import axios from "axios";
import { apiXmlToObject } from "../../../lib/utils/xmlParser";

type Props = StackScreenProps<AuthStackScreenParamList, "Signin">;

const labels: string[][] = [
   ["선택", "아이등록", "기본정보"],
   ["선택", "기본정보"],
   ["선택", "유치원 선택", "기본정보"],
   ["선택"],
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
      name: "",
      sex: -1,
   });
   const [errMsg, setErrMsg] = useState<signInInfoType>({
      id: "",
      password: "",
      passwordCheck: "",
      name: "",
      sex: -1,
   });
   const [userType, setUserType] = useState<number>(3);
   const [childInfo, setChildInfo] = useState<childInfoType>({
      name: "",
      sex: "",
      birth: "",
   });
   const [position, setPosition] = useState<number>(0);
   const [areaInfo, setAreaInfo] = useState<areaInfoType>({
      state: 0,
      area: 0,
   });
   const [kinderList, setKinderList] = useState<kinderListType | null>(null);
   const [selectedKinder, setSelectedKinder] = useState<kinderType | null>(
      null
   );
   const [birthErr, setBirthErr] = useState<string | undefined>();

   const dispatch = useDispatch();
   const pagerRef: any = useRef<typeof PagerView>(null);

   const onChange = (name: string, value: string): void => {
      setErrMsg((prev) => ({ ...prev, [name]: "" }));
      setUserInfo((prev) => ({ ...prev, [name]: value }));
   };
   const onChangeChild = (name: string, value: string): void => {
      if (name === "birth") {
         if (value.length > 8) {
            return;
         }
         if (birthErr) {
            setBirthErr("");
         }
         if (value.length === 8) {
            if (parseInt(value.slice(6, 8)) > 31) {
               setBirthErr("20180406 형식으로 입력해주세요.");
               return;
            }
         } else if (value.length === 6) {
            if (parseInt(value.slice(4, 6)) > 13) {
               setBirthErr("20180406 형식으로 입력해주세요.");
               return;
            }
         }

         setChildInfo((prev) => ({ ...prev, [name]: value }));
      } else {
         setChildInfo((prev) => ({ ...prev, [name]: value }));
      }
   };
   const selectGender = (v: number) => {
      setUserInfo((prev) => ({ ...prev, sex: v }));
   };

   const onPressLogin = async () => {
      if (!checkLoginInfo<signInInfoType>(userInfo, setErrMsg, false)) return;
      dispatch(loading());

      try {
         // const res = await SignUp(userInfo.id, userInfo.password);
         // dispatch(signin(res));
      } catch (err: any) {
         // 중복 아이디 처리
         if (err?.message === "ID가 중복된 회원입니다.") {
            handleError<signInInfoType>("auth/id-already-in-use", setErrMsg);
         } else {
            dispatch(setSnackbar({ visible: true, snackbar: SERVER_ERROR }));
         }
         return;
      }
      dispatch(unloading());
   };
   const goNext = useCallback((): void => {
      pagerRef.current?.setPage(position + 1);
      setPosition((prev) => prev + 1);
   }, [pagerRef, position]);
   const goPrev = useCallback((): void => {
      pagerRef.current?.setPage(position - 1);
      setPosition((prev) => prev - 1);
   }, [pagerRef, position]);
   const onSelectType = useCallback((num: number): void => {
      setUserType(num);
   }, []);

   const onSearchKinder = useCallback(async () => {
      const key = "	f4c1bb8d56fb4d07923725f4458c8d09";
      const res = await axios.get(
         `http://api.childcare.go.kr/mediate/rest/cpmsapi021/cpmsapi021/request?key=${key}&arcode=${areaInfo.area}`
      );
      const ans = apiXmlToObject(res.data);
      setKinderList(ans);
   }, [areaInfo]);

   const onPressKinder = useCallback((kinder) => {
      setSelectedKinder(kinder);
   }, []);
   return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
         <View style={{ height: 100, paddingTop: 30, paddingBottom: 10 }}>
            <StepIndicator
               customStyles={customStyles}
               currentPosition={position}
               labels={labels[userType]}
               stepCount={labels[userType].length}
            />
         </View>
         <PagerView
            ref={pagerRef}
            style={{ flex: 1, justifyContent: "center" }}
            initialPage={0}
            scrollEnabled={false}>
            <View key="1" style={{ flex: 1 }}>
               <SelectType onSelectType={onSelectType} userType={userType} />
            </View>
            {userType !== 1 ? (
               userType !== 0 ? (
                  <View key="2" style={{ flex: 1 }}>
                     <FindKindergarden
                        areaInfo={areaInfo}
                        setAreaInfo={setAreaInfo}
                        onSearchKinder={onSearchKinder}
                        kinderList={kinderList}
                        onPressKinder={onPressKinder}
                        selectedKinder={selectedKinder}
                     />
                  </View>
               ) : (
                  <View key="2" style={{ flex: 1 }}>
                     <InputChild
                        childInfo={childInfo}
                        onChangeChild={onChangeChild}
                        birthErr={birthErr}
                     />
                  </View>
               )
            ) : (
               <></>
            )}
            {userType !== 3 ? (
               <View key={`${labels[userType].length}`} style={{ flex: 1 }}>
                  <Signin
                     userInfo={userInfo}
                     errMsg={errMsg}
                     onChange={onChange}
                     selectGender={selectGender}
                  />
               </View>
            ) : (
               <></>
            )}
         </PagerView>
         <View style={{ height: 50 }}>
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
