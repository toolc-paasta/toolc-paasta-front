import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { AuthStackScreenParamList } from "../../../screens/AuthScreen";
import Signin from "../view/Signin";
import PagerView from "react-native-pager-view";
import handleError, { checkLoginInfo } from "../../../lib/utils/authFunctions";
import { useDispatch, useSelector } from "react-redux";
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
   sexType,
   signInInfoType,
} from "../types";
import InputChild from "../view/InputChild";
import { useCallback } from "react";
import FindKindergarden from "../view/FindKindergarden";
import axios from "axios";
import { apiXmlToObject } from "../../../lib/utils/xmlParser";
import { colors } from "../../elements/theme";
import {
   directorSignUp,
   parentSignUp,
   registerCenter,
   teacherSignUp,
} from "../../../lib/api/auth";
import parseToBirth from "../../../lib/utils/parseToBirth";
import { RootState } from "../../../modules";
import parseToPhoneNumer from "../../../lib/utils/parseToPhoneNumer";
import { signin } from "../../../modules/auth";
import { navigationRef } from "../../../../RootNavigation";
import { usePubNub } from "pubnub-react";
import Header from "../../elements/Header";

type Props = StackScreenProps<AuthStackScreenParamList, "Signin">;

const labels: string[][] = [
   ["선택", "아이등록", "기본정보"],
   ["선택", "기본정보"],
   ["선택", "유치원 선택", "기본정보"],
   ["선택"],
];
const customStyles = {
   stepStrokeFinishedColor: colors.primary,
   stepIndicatorLabelFinishedColor: colors.background,
   separatorFinishedColor: colors.primary,
   stepIndicatorFinishedColor: colors.primary,

   stepStrokeWidth: 3,
   stepStrokeCurrentColor: colors.primary,
   stepIndicatorCurrentColor: colors.background,
   stepIndicatorLabelCurrentColor: colors.primary,
   currentStepLabelColor: colors.black,

   stepStrokeUnFinishedColor: colors.secondary,
   separatorUnFinishedColor: colors.secondary,
   stepIndicatorUnFinishedColor: colors.background,
   stepIndicatorLabelUnFinishedColor: colors.secondary,
   labelColor: colors.black,
   labelFontFamily: "Font",
};

function SigninContainer({ navigation }: Props) {
   const [userInfo, setUserInfo] = useState<signInInfoType>({
      password: "",
      passwordCheck: "",
      loginId: "",
      name: "",
      sex: "남성",
      connectionNumber: "",
   });
   const [errMsg, setErrMsg] = useState<signInInfoType>({
      loginId: "",
      password: "",
      passwordCheck: "",
      name: "",
      sex: "남성",
      connectionNumber: "",
   });
   const [userType, setUserType] = useState<number>(3);
   const [childInfo, setChildInfo] = useState<childInfoType>({
      childName: "",
      childSex: "남성",
      childBirthday: "",
      wifeId: "",
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
   const [foundationDateErr, setFoundationDateErr] = useState<string>("");
   const [isCheckedSameChild, setIsCheckedSameChild] = useState(false);

   const pushToken = useSelector(({ pushToken }: RootState) => pushToken);
   const dispatch = useDispatch();
   const pagerRef: any = useRef<typeof PagerView>(null);

   const pubnubState = usePubNub();

   const onChange = (name: string, value: string): void => {
      setErrMsg((prev) => ({ ...prev, [name]: "" }));
      setUserInfo((prev) => ({ ...prev, [name]: value }));
   };
   const onChangeKinderFoundationDate = (value: string) => {
      if (value.length > 8) {
         return;
      }
      if (foundationDateErr) {
         setFoundationDateErr("");
      }
      if (value.length === 8) {
         if (parseInt(value.slice(6, 8)) > 31) {
            setFoundationDateErr("일은 1~31일까지 있습니다.");
            return;
         }
      } else if (value.length === 6) {
         if (parseInt(value.slice(4, 6)) > 13) {
            setFoundationDateErr("월은 1~12월까지 있습니다.");
            return;
         }
      }
      setSelectedKinder((prev) => ({ ...prev, foundationDate: value }));
   };
   const onChangeChild = (name: string, value: string): void => {
      if (name === "childBirthday") {
         if (value.length > 8) {
            return;
         }
         if (birthErr) {
            setBirthErr("");
         }
         if (value.length === 8) {
            if (parseInt(value.slice(6, 8)) > 31) {
               setBirthErr("일은 1~31일까지 있습니다.");
               return;
            }
         } else if (value.length === 6) {
            if (parseInt(value.slice(4, 6)) > 13) {
               setBirthErr("월은 1~12월까지 있습니다.");
               return;
            }
         }
         setChildInfo((prev) => ({ ...prev, [name]: value }));
      } else {
         setChildInfo((prev) => ({ ...prev, [name]: value }));
      }
   };
   const selectGender = (v: sexType) => {
      setUserInfo((prev) => ({ ...prev, sex: v }));
   };

   const onPressLogin = async () => {
      if (
         !checkLoginInfo<signInInfoType>(
            userInfo,
            setErrMsg,
            false,
            userType === 2
         )
      ) {
         return;
      }
      dispatch(loading());
      try {
         let res;
         switch (userType) {
            case 0:
               res = await parentSignUp(
                  {
                     ...userInfo,
                     ...childInfo,
                     spouseLoginId: isCheckedSameChild
                        ? childInfo.wifeId
                        : null,
                     childBirthday: parseToBirth(childInfo.childBirthday),
                     connectionNumber: parseToPhoneNumer(
                        userInfo.connectionNumber
                     ),
                  },
                  pushToken.token
               );
               break;
            case 1:
               res = await teacherSignUp(userInfo, pushToken.token);
               break;
            default:
               if (selectedKinder) {
                  res = await directorSignUp(
                     {
                        ...userInfo,
                        connectionNumber: parseToPhoneNumer(
                           userInfo.connectionNumber
                        ),
                     },
                     pushToken.token
                  );
                  await registerCenter({
                     ...selectedKinder,
                     foundationDate: parseToBirth(
                        selectedKinder?.foundationDate
                     ),
                  });
               }
               break;
         }
         dispatch(signin(res));
         navigationRef.current?.navigate("Home");
         pubnubState.setUUID(res.loginId);
      } catch (err: any) {
         console.log(err.response.data);
         // 중복 아이디 처리
         if (err?.response.data.message === "ID가 중복된 회원입니다.") {
            console.log("asdasd");
            handleError<signInInfoType>("auth/id-already-in-use", setErrMsg);
         } else if (
            userType === 0 &&
            err?.response.data.message === "없는 사용자 입니다."
         ) {
            dispatch(
               setSnackbar({
                  visible: true,
                  snackbar: "배우자분의 아이디를 제대로 입력해주세요.",
               })
            );
         } else {
            dispatch(setSnackbar({ visible: true, snackbar: SERVER_ERROR }));
         }
      }
      dispatch(unloading());
   };

   const checkSecondPage = () => {
      if (
         position === 1 &&
         userType === 0 &&
         !(
            childInfo.childBirthday !== "" &&
            childInfo.childName !== "" &&
            ((isCheckedSameChild && childInfo.wifeId) || !isCheckedSameChild)
         )
      ) {
         Alert.alert("안내", "정보를 전부 입력해주세요.", [
            { text: "확인", onPress: () => {}, style: "default" },
         ]);
         return false;
      } else if (
         position === 1 &&
         userType === 2 &&
         !(
            selectedKinder?.address &&
            selectedKinder.centerName &&
            selectedKinder.foundationDate
         )
      ) {
         Alert.alert("안내", "유치원 정보를 전부 입력해주세요.", [
            { text: "확인", onPress: () => {}, style: "default" },
         ]);
         return false;
      }
      return true;
   };
   const goNext = useCallback((): void => {
      if (checkSecondPage()) {
         pagerRef.current?.setPage(position + 1);
         setPosition((prev) => prev + 1);
      }
   }, [
      pagerRef,
      position,
      userType,
      childInfo,
      selectedKinder,
      isCheckedSameChild,
   ]);
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
      setSelectedKinder((prev) => ({ ...prev, ...kinder }));
   }, []);
   const toggleIsCheckedSameChild = useCallback(() => {
      setIsCheckedSameChild((prev) => !prev);
   }, []);

   return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
         <Header
            header_title={"회원가입"}
            navigation={navigation}
            setIsSubmit={null}
            IsInsert={null}
            setModalVisible={false}
         />
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
                        foundationDateErr={foundationDateErr}
                        onChangeFoundationDate={onChangeKinderFoundationDate}
                     />
                  </View>
               ) : (
                  <View key="2" style={{ flex: 1 }}>
                     <InputChild
                        childInfo={childInfo}
                        onChangeChild={onChangeChild}
                        birthErr={birthErr}
                        isCheckedSameChild={isCheckedSameChild}
                        toggleIsCheckedSameChild={toggleIsCheckedSameChild}
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
                     onPressLogin={onPressLogin}
                     isDirector={userType === 2}
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
