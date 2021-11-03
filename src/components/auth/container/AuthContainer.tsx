import { StackScreenProps } from "@react-navigation/stack";
import { usePubNub } from "pubnub-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigationRef } from "../../../../RootNavigation";
import {
   adminLogin,
   clearAccessToken,
   directorLogin,
   getAdminInfo,
   getDirectorInfo,
   getParentInfo,
   getTeacherInfo,
   parentLogin,
   teacherLogin,
} from "../../../lib/api/auth";
import handleError, { checkLoginInfo } from "../../../lib/utils/authFunctions";
import { SERVER_ERROR } from "../../../lib/utils/strings";
import { RootState } from "../../../modules";
import { signin } from "../../../modules/auth";
import { loading, unloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import { AuthStackScreenParamList } from "../../../screens/AuthScreen";
import { userInfoType } from "../types";
import Auth from "../view/Auth";

type Props = StackScreenProps<AuthStackScreenParamList, "Login">;

function AuthContainer({ navigation }: Props) {
   const [userType, setUserType] = useState<number>(0);
   const [userInfo, setUserInfo] = useState<userInfoType>({
      password: "",
      loginId: "",
   });
   const [errMsg, setErrMsg] = useState<userInfoType>({
      loginId: "",
      password: "",
   });
   const [wrongPW, setWrongPW] = useState(false);
   const pushToken = useSelector(({ pushToken }: RootState) => pushToken);
   const dispatch = useDispatch();
   const pubnubState = usePubNub();

   const onChange = (name: string, value: string): void => {
      setErrMsg((prev) => ({ ...prev, [name]: "" }));
      setUserInfo((prev) => ({ ...prev, [name]: value }));
   };

   const onPressLogin = async () => {
      if (
         userType !== 3 &&
         !checkLoginInfo<userInfoType>(userInfo, setErrMsg, true)
      )
         return;
      dispatch(loading());
      try {
         let res;
         switch (userType) {
            case 0:
               await parentLogin({
                  ...userInfo,
                  expoToken: pushToken.token,
               });
               res = await getParentInfo();
               break;
            case 1:
               await teacherLogin({
                  ...userInfo,
                  expoToken: pushToken.token,
               });
               res = await getTeacherInfo();
               break;
            case 2:
               await directorLogin({
                  ...userInfo,
                  expoToken: pushToken.token,
               });
               res = await getDirectorInfo();
               break;
            default:
               await adminLogin({
                  ...userInfo,
                  expoToken: pushToken.token,
               });
               res = await getAdminInfo();
         }

         dispatch(signin(res));
         navigationRef.current?.navigate("Home");
      } catch (err: any) {
         // 비밀번호, 아이디 처리
         if (err.response.data?.message === "비밀번호가 일치하지 않습니다.") {
            handleError<userInfoType>("auth/wrong-password", setErrMsg);
            setWrongPW(true);
         } else if (err.response.data?.message === "없는 사용자 입니다.") {
            handleError<userInfoType>("auth/user-not-found", setErrMsg);
            dispatch(
               setSnackbar({ visible: true, snackbar: "없는 사용자입니다." })
            );
         } else {
            dispatch(setSnackbar({ visible: true, snackbar: SERVER_ERROR }));
         }
      }
      dispatch(unloading());
   };

   const settingUserType = (type: number) => {
      setUserType(type);
   };

   const goToSignin = (): void => {
      navigation.navigate("Signin");
   };

   return (
      <Auth
         userInfo={userInfo}
         errMsg={errMsg}
         onChange={onChange}
         onPressLogin={onPressLogin}
         goToSignin={goToSignin}
         userType={userType}
         settingUserType={settingUserType}
      />
   );
}

export default AuthContainer;
